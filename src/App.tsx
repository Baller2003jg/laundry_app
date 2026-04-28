import React, { useEffect, useRef, useState } from 'react';
import Login from './Login';
import MachineSelector from './components/MachineSelector';
import { db } from './firebase';
import { ref, set, onValue, remove } from 'firebase/database';

type WashType = 'quick' | 'bedding' | 'rinse' | 'regular';
type DryerType = 'quick' | 'wrinkle' | 'regular';

type BaseMachineState = {
  sendText: boolean;
  phone: string;
  running: boolean;
  remaining: number;
  intervalId?: number | null;
  currentUser: string | null;
  reservedBy: string | null;
};

type WasherState = BaseMachineState & {
  type: WashType;
};

type DryerState = BaseMachineState & {
  type: DryerType;
};

const DEFAULT_WASHER_SECONDS = 30 * 60;
const DEFAULT_DRYER_SECONDS = 40 * 60;

function getWasherDuration(type: WashType) {
  if (type === 'rinse') return 10 * 60;
  if (type === 'quick') return 15 * 60;
  if (type === 'bedding') return 40 * 60;
  return DEFAULT_WASHER_SECONDS;
}

function getDryerDuration(type: DryerType) {
  if (type === 'quick') return 15 * 60;
  if (type === 'wrinkle') return 20 * 60;
  return DEFAULT_DRYER_SECONDS;
}

function createWasherState(): WasherState {
  return {
    type: 'regular',
    sendText: false,
    phone: '',
    running: false,
    remaining: DEFAULT_WASHER_SECONDS,
    intervalId: null,
    currentUser: null,
    reservedBy: null
  };
}

function createDryerState(): DryerState {
  return {
    type: 'regular',
    sendText: false,
    phone: '',
    running: false,
    remaining: DEFAULT_DRYER_SECONDS,
    intervalId: null,
    currentUser: null,
    reservedBy: null
  };
}

function clearIntervals<T extends { intervalId?: number | null }>(settings: Record<string, T>) {
  Object.values(settings).forEach((machine) => {
    if (machine.intervalId) window.clearInterval(machine.intervalId);
  });
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'machines' | 'qr'>('machines');
  const [showContact, setShowContact] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [startedPopup, setStartedPopup] = useState<{ washers: string[], dryers: string[] } | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Auto-login if user is saved in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('laundryAppUser');
    if (savedUser) {
      setLoggedIn(true);
      setUserEmail(savedUser);
    }
  }, []);

  // Machine data
  const makeMachines = (prefix: string, count: number) =>
    Array.from({ length: count }, (_, i) => ({ id: `${prefix}-${i + 1}`, name: `${prefix.toUpperCase()} ${i + 1}` }));
  const washers = makeMachines('washer', 8);
  const dryers = makeMachines('dryer', 8);

  const [washerSettings, setWasherSettings] = useState<Record<string, WasherState>>({});
  const [selectedWashers, setSelectedWashers] = useState<string[]>([]);

  const [dryerSettings, setDryerSettings] = useState<Record<string, DryerState>>({});
  const [selectedDryers, setSelectedDryers] = useState<string[]>([]);
  const washerSettingsRef = useRef(washerSettings);
  const dryerSettingsRef = useRef(dryerSettings);
  const userEmailRef = useRef(userEmail);

  useEffect(() => { userEmailRef.current = userEmail; }, [userEmail]);

  const maxPerGroup = 2;

  // ── Firebase helpers ─────────────────────────────────────────────
  function writeMachine(kind: 'washers' | 'dryers', id: string, state: BaseMachineState & { type: string }) {
    if (!db) return;
    try {
      set(ref(db, `laundry/${kind}/${id}`), {
        currentUser: state.currentUser ?? null,
        reservedBy: state.reservedBy ?? null,
        running: state.running,
        remaining: state.remaining,
        type: state.type,
      });
    } catch { /* offline / not configured */ }
  }

  function removeMachine(kind: 'washers' | 'dryers', id: string) {
    if (!db) return;
    try { remove(ref(db, `laundry/${kind}/${id}`)); } catch { /* offline */ }
  }

  // ── Real-time sync listener ──────────────────────────────────────
  useEffect(() => {
    if (!loggedIn || !db) return;

    const unsub1 = onValue(ref(db, 'laundry/washers'), (snap) => {
      const remote: Record<string, { currentUser: string | null; reservedBy: string | null; running: boolean; remaining: number; type: string }> = snap.val() ?? {};
      setWasherSettings((prev) => {
        const me = userEmailRef.current;
        const merged: Record<string, WasherState> = {};
        // Keep own running/in-use machines from local state
        Object.entries(prev).forEach(([id, s]) => {
          if (s.currentUser === me) merged[id] = s;
        });
        // Apply remote state for everyone else's machines
        Object.entries(remote).forEach(([id, r]) => {
          if (r.currentUser !== me) {
            merged[id] = {
              ...(prev[id] ?? createWasherState()),
              currentUser: r.currentUser,
              reservedBy: r.reservedBy,
              running: r.running,
              remaining: r.remaining,
              type: (r.type as WashType) ?? 'regular',
              intervalId: null,
            };
          }
        });
        return merged;
      });
    });

    const unsub2 = onValue(ref(db, 'laundry/dryers'), (snap) => {
      const remote: Record<string, { currentUser: string | null; reservedBy: string | null; running: boolean; remaining: number; type: string }> = snap.val() ?? {};
      setDryerSettings((prev) => {
        const me = userEmailRef.current;
        const merged: Record<string, DryerState> = {};
        Object.entries(prev).forEach(([id, s]) => {
          if (s.currentUser === me) merged[id] = s;
        });
        Object.entries(remote).forEach(([id, r]) => {
          if (r.currentUser !== me) {
            merged[id] = {
              ...(prev[id] ?? createDryerState()),
              currentUser: r.currentUser,
              reservedBy: r.reservedBy,
              running: r.running,
              remaining: r.remaining,
              type: (r.type as DryerType) ?? 'regular',
              intervalId: null,
            };
          }
        });
        return merged;
      });
    });

    // 3-second heartbeat refresh as fallback
    const heartbeat = setInterval(() => {
      if (!db) return;
      // Touching onValue is enough; this just forces React to re-render
      // so displayed timers stay accurate even if a tab was backgrounded.
      setWasherSettings((s) => ({ ...s }));
      setDryerSettings((s) => ({ ...s }));
    }, 3000);

    return () => { unsub1(); unsub2(); clearInterval(heartbeat); };
  }, [loggedIn]);

  useEffect(() => {
    washerSettingsRef.current = washerSettings;
  }, [washerSettings]);

  useEffect(() => {
    dryerSettingsRef.current = dryerSettings;
  }, [dryerSettings]);

  function toggleWasher(id: string) {
    if (selectedWashers.includes(id)) {
      if (washerSettings[id]?.running) return;
      setSelectedWashers((prev) => prev.filter((machineId) => machineId !== id));
      setWasherSettings((prev) => {
        const copy = { ...prev };
        const machine = copy[id];
        if (machine && !machine.running && !machine.currentUser && !machine.reservedBy) {
          delete copy[id];
        }
        return copy;
      });
    } else {
      setSelectedWashers((prev) => [...prev, id]);
      setWasherSettings((prev) => ({
        ...prev,
        [id]: prev[id] ?? createWasherState()
      }));
    }
  }

  function toggleDryer(id: string) {
    if (selectedDryers.includes(id)) {
      if (dryerSettings[id]?.running) return;
      setSelectedDryers((prev) => prev.filter((machineId) => machineId !== id));
      setDryerSettings((prev) => {
        const copy = { ...prev };
        const machine = copy[id];
        if (machine && !machine.running && !machine.currentUser && !machine.reservedBy) {
          delete copy[id];
        }
        return copy;
      });
    } else {
      setSelectedDryers((prev) => [...prev, id]);
      setDryerSettings((prev) => ({
        ...prev,
        [id]: prev[id] ?? createDryerState()
      }));
    }
  }

  function resetAll() {
    clearIntervals(washerSettingsRef.current);
    clearIntervals(dryerSettingsRef.current);
    // Remove own machines from Firebase
    Object.entries(washerSettingsRef.current).forEach(([id, s]) => {
      if (s.currentUser === userEmail || s.reservedBy === userEmail) removeMachine('washers', id);
    });
    Object.entries(dryerSettingsRef.current).forEach(([id, s]) => {
      if (s.currentUser === userEmail || s.reservedBy === userEmail) removeMachine('dryers', id);
    });
    setWasherSettings({});
    setDryerSettings({});
    setSelectedWashers([]);
    setSelectedDryers([]);
  }

  function logout() {
    localStorage.removeItem('laundryAppUser');
    setLoggedIn(false);
    setUserEmail('');
    setSelectedWashers([]);
    setSelectedDryers([]);
    setActiveTab('machines');
  }

  function formatTime(s: number) {
    const mm = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }

  function reserveWasher(id: string) {
    setWasherSettings((prev) => {
      const machine = prev[id] ?? createWasherState();
      const updated = { ...machine, reservedBy: userEmail };
      writeMachine('washers', id, updated);
      return { ...prev, [id]: updated };
    });
  }

  function cancelWasherReservation(id: string) {
    setWasherSettings((prev) => {
      const machine = prev[id];
      if (!machine) return prev;
      const updated = { ...machine, reservedBy: null };
      if (!updated.running && !updated.currentUser && !selectedWashers.includes(id)) {
        removeMachine('washers', id);
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      writeMachine('washers', id, updated);
      return { ...prev, [id]: updated };
    });
  }

  function reserveDryer(id: string) {
    setDryerSettings((prev) => {
      const machine = prev[id] ?? createDryerState();
      const updated = { ...machine, reservedBy: userEmail };
      writeMachine('dryers', id, updated);
      return { ...prev, [id]: updated };
    });
  }

  function cancelDryerReservation(id: string) {
    setDryerSettings((prev) => {
      const machine = prev[id];
      if (!machine) return prev;
      const updated = { ...machine, reservedBy: null };
      if (!updated.running && !updated.currentUser && !selectedDryers.includes(id)) {
        removeMachine('dryers', id);
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      writeMachine('dryers', id, updated);
      return { ...prev, [id]: updated };
    });
  }

  function completeWasher(id: string) {
    const s = washerSettings[id];
    if (!s) return;
    if (s.intervalId) window.clearInterval(s.intervalId);
    setWasherSettings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        running: false,
        remaining: getWasherDuration(prev[id].type),
        intervalId: null,
        currentUser: null
      }
    }));
    removeMachine('washers', id);
    setSelectedWashers((prev) => prev.filter((p) => p !== id));
  }

  function completeDryer(id: string) {
    const s = dryerSettings[id];
    if (!s) return;
    if (s.intervalId) window.clearInterval(s.intervalId);
    setDryerSettings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        running: false,
        remaining: getDryerDuration(prev[id].type),
        intervalId: null,
        currentUser: null
      }
    }));
    removeMachine('dryers', id);
    setSelectedDryers((prev) => prev.filter((p) => p !== id));
  }

  function sendTextNotification(phone: string, machineType: string) {
    if (phone && /^\d{10}$/.test(phone)) {
      // In a real app, this would call an SMS API (like Twilio)
      console.log(`Sending SMS to ${phone}: Your ${machineType} is done!`);
      alert(`Text sent to ${phone}: Laundry done`);
    }
  }

  function submit() {
    // Start all selected washers
    setWasherSettings((prev) => {
      const updated = { ...prev };
      for (const id of selectedWashers) {
        if (!updated[id]?.running) {
          const intervalId = window.setInterval(() => {
            setWasherSettings((current) => {
              const machine = current[id];
              if (!machine) return current;
              
              const newRemaining = machine.remaining - 1;
              
              if (newRemaining <= 0) {
                // Timer done - send notification
                if (machine.sendText && machine.phone) {
                  sendTextNotification(machine.phone, 'washer');
                }
                if (machine.intervalId) window.clearInterval(machine.intervalId);
                return {
                  ...current,
                  [id]: { ...machine, remaining: 0, intervalId: null }
                };
              }
              
              return {
                ...current,
                [id]: { ...machine, remaining: newRemaining }
              };
            });
          }, 1000);
          
          updated[id] = {
            ...updated[id],
            running: true,
            intervalId,
            currentUser: userEmail,
            reservedBy: updated[id].reservedBy === userEmail ? null : updated[id].reservedBy
          };
          writeMachine('washers', id, updated[id]);
        }
      }
      return updated;
    });
    setDryerSettings((prev) => {
      const updated = { ...prev };
      for (const id of selectedDryers) {
        if (!updated[id]?.running) {
          const intervalId = window.setInterval(() => {
            setDryerSettings((current) => {
              const machine = current[id];
              if (!machine) return current;
              
              const newRemaining = machine.remaining - 1;
              
              if (newRemaining <= 0) {
                // Timer done - send notification
                if (machine.sendText && machine.phone) {
                  sendTextNotification(machine.phone, 'dryer');
                }
                if (machine.intervalId) window.clearInterval(machine.intervalId);
                return {
                  ...current,
                  [id]: { ...machine, remaining: 0, intervalId: null }
                };
              }
              
              return {
                ...current,
                [id]: { ...machine, remaining: newRemaining }
              };
            });
          }, 1000);
          
          updated[id] = {
            ...updated[id],
            running: true,
            intervalId,
            currentUser: userEmail,
            reservedBy: updated[id].reservedBy === userEmail ? null : updated[id].reservedBy
          };
          writeMachine('dryers', id, updated[id]);
        }
      }
      return updated;
    });

    const startedWashers = [...selectedWashers];
    const startedDryers = [...selectedDryers];
    setSelectedWashers([]);
    setSelectedDryers([]);
    if (startedWashers.length > 0 || startedDryers.length > 0) {
      setStartedPopup({ washers: startedWashers, dryers: startedDryers });
    }
  }

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      clearIntervals(washerSettingsRef.current);
      clearIntervals(dryerSettingsRef.current);
    };
  }, []);

  function buildMachineStatus(currentUserName: string | null, reservedBy: string | null, running: boolean, remaining: number) {
    if (currentUserName && running) {
      return remaining > 0
        ? `In use by ${currentUserName} - ${formatTime(remaining)}`
        : `In use by ${currentUserName} - ready to complete`;
    }
    if (reservedBy) {
      return `Reserved next by ${reservedBy}`;
    }
    return undefined;
  }

  function renderReservationDetails(machineId: string, currentUserName: string | null, reservedBy: string | null, onReserve: (id: string) => void, onCancel: (id: string) => void, onComplete?: (id: string) => void, running?: boolean) {
    const canReserve = Boolean(currentUserName) && currentUserName !== userEmail && !reservedBy;
    const canCancel = reservedBy === userEmail;
    const canComplete = Boolean(onComplete && running && currentUserName === userEmail);

    return (
      <div className="reservation-panel">
        <div className="reservation-line">
          <span className="reservation-label">Using now</span>
          <span className="reservation-value">{currentUserName ?? 'Available'}</span>
        </div>
        <div className="reservation-line">
          <span className="reservation-label">Next in line</span>
          <span className="reservation-value">{reservedBy ?? 'Open spot'}</span>
        </div>
        <div className="reservation-actions">
          {canReserve ? <button className="btn ghost reservation-btn" onClick={() => onReserve(machineId)}>Reserve next</button> : null}
          {canCancel ? <button className="btn ghost reservation-btn" onClick={() => onCancel(machineId)}>Cancel reservation</button> : null}
          {canComplete ? <button className="btn complete-btn" onClick={() => onComplete?.(machineId)}>Complete</button> : null}
        </div>
      </div>
    );
  }

  const washerDisabledIds = Object.entries(washerSettings)
    .filter(([, machine]) => machine.running || (!machine.currentUser && !!machine.reservedBy && machine.reservedBy !== userEmail))
    .map(([id]) => id);

  const dryerDisabledIds = Object.entries(dryerSettings)
    .filter(([, machine]) => machine.running || (!machine.currentUser && !!machine.reservedBy && machine.reservedBy !== userEmail))
    .map(([id]) => id);

  const washerAvailableCount = washers.filter((m) => {
    const s = washerSettings[m.id];
    return !s || (!s.running && !s.currentUser && !s.reservedBy);
  }).length;

  const washerOpenSpotCount = washers.filter((m) => {
    const s = washerSettings[m.id];
    return s?.running && !s.reservedBy;
  }).length;

  const dryerAvailableCount = dryers.filter((m) => {
    const s = dryerSettings[m.id];
    return !s || (!s.running && !s.currentUser && !s.reservedBy);
  }).length;

  const dryerOpenSpotCount = dryers.filter((m) => {
    const s = dryerSettings[m.id];
    return s?.running && !s.reservedBy;
  }).length;

  if (!loggedIn) {
    return <Login onLogin={(email) => { setLoggedIn(true); setUserEmail(email); }} />;
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-title">HT Laundry app</div>
        <div className="nav-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setShowLocations(true); }}>Locations</a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setShowContact(true); }}>Contact Us</a>
          <button className="btn secondary" onClick={logout} style={{ marginLeft: '16px' }}>
            Logout
          </button>
        </div>
      </nav>
      {showLocations && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowLocations(false)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '32px 40px', minWidth: 320, boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0, marginBottom: 24 }}>Locations</h2>
            <div style={{ marginBottom: 16 }}>
              <strong>Beard-Burrows</strong><br />
              <span style={{ color: '#555' }}>Men's Dorm</span>
            </div>
            <div style={{ marginBottom: 24 }}>
              <strong>Allen-Frazier</strong><br />
              <span style={{ color: '#555' }}>Women's Dorm</span>
            </div>
            <button className="btn secondary" onClick={() => setShowLocations(false)}>Close</button>
          </div>
        </div>
      )}
      {startedPopup && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setStartedPopup(null)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '32px 40px', minWidth: 300, boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0, marginBottom: 16, color: '#3a0a10' }}>Machines Started!</h2>
            {startedPopup.washers.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: '#3a0a10' }}>Washers started:</strong>
                <ul style={{ margin: '6px 0 0 0', paddingLeft: 20, color: '#333' }}>
                  {startedPopup.washers.map(id => <li key={id}>Washer {id.split('-')[1]}</li>)}
                </ul>
              </div>
            )}
            {startedPopup.dryers.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <strong style={{ color: '#3a0a10' }}>Dryers started:</strong>
                <ul style={{ margin: '6px 0 0 0', paddingLeft: 20, color: '#333' }}>
                  {startedPopup.dryers.map(id => <li key={id}>Dryer {id.split('-')[1]}</li>)}
                </ul>
              </div>
            )}
            <button className="btn secondary" onClick={() => setStartedPopup(null)}>OK</button>
          </div>
        </div>
      )}
      {showContact && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowContact(false)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '32px 40px', minWidth: 320, boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0, marginBottom: 24 }}>Contact Us</h2>
            <div style={{ marginBottom: 16 }}>
              <strong>Student Support</strong><br />
              <a href="tel:3182316925" style={{ color: '#1a73e8' }}>318-231-6925</a>
            </div>
            <div style={{ marginBottom: 24 }}>
              <strong>Huston-Tillotson University</strong><br />
              <a href="tel:5125053000" style={{ color: '#1a73e8' }}>512-505-3000</a>
            </div>
            <button className="btn secondary" onClick={() => setShowContact(false)}>Close</button>
          </div>
        </div>
      )}
      <div className="app">
        <div className="header">
          <div>
            <div className="title">Laundry room</div>
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'machines' ? 'active' : ''}`}
                onClick={() => setActiveTab('machines')}
              >
                Machine Selector
              </button>
              <button 
                className={`tab ${activeTab === 'qr' ? 'active' : ''}`}
                onClick={() => setActiveTab('qr')}
              >
                Scan QR Code
              </button>
            </div>
            {activeTab === 'machines' && (
              <div className="subtitle">Choose up to {maxPerGroup} washers and up to {maxPerGroup} dryers currently in use.</div>
            )}
          </div>
        </div>
        {activeTab === 'machines' && (
          <>
            <div className="panels">
              <MachineSelector
                title="Washers"
                machines={washers.map((m) => ({
                  ...m,
                  status: buildMachineStatus(
                    washerSettings[m.id]?.currentUser ?? null,
                    washerSettings[m.id]?.reservedBy ?? null,
                    washerSettings[m.id]?.running ?? false,
                    washerSettings[m.id]?.remaining ?? 0
                  )
                }))}
                maxSelectable={maxPerGroup}
                selected={selectedWashers}
                onToggle={toggleWasher}
                disabledIds={washerDisabledIds}
                availableCount={washerAvailableCount}
                openSpotCount={washerOpenSpotCount}
                renderDetails={(m) => renderReservationDetails(
                  m.id,
                  washerSettings[m.id]?.currentUser ?? null,
                  washerSettings[m.id]?.reservedBy ?? null,
                  reserveWasher,
                  cancelWasherReservation,
                  completeWasher,
                  washerSettings[m.id]?.running ?? false
                )}
                renderSelected={(m) => {
                  const s = washerSettings[m.id];
                  if (!s) return null;
                  const phoneValid = /^\d{10}$/.test(s.phone);
                  let phoneInputArea = null;
                  if (s.sendText) {
                    phoneInputArea = (
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={10}
                        placeholder="Phone (10 digits)"
                        value={s.phone}
                        style={{ minWidth: 120, fontSize: 13, border: phoneValid || !s.phone ? '1px solid #ccc' : '1px solid #e00' }}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d]/g, '');
                          setWasherSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], phone: val } }));
                        }}
                      />
                    );
                  }
                  return (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <select
                        aria-label={`washer-options-${m.id}`}
                        value={s.type}
                        onChange={(e) => setWasherSettings((prev) => ({
                          ...prev,
                          [m.id]: {
                            ...prev[m.id],
                            type: e.target.value as WashType,
                            remaining: getWasherDuration(e.target.value as WashType)
                          }
                        }))}
                      >
                        <option value="rinse">Rinse only (10 min)</option>
                        <option value="quick">Quick wash (15 min)</option>
                        <option value="bedding">Bedding (40 min)</option>
                        <option value="regular">Regular wash (30 min)</option>
                      </select>
                      <label style={{ fontSize: 13 }}>
                        <input
                          type="checkbox"
                          checked={s.sendText}
                          onChange={(e) => setWasherSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], sendText: e.target.checked } }))}
                        />
                        &nbsp;Send text when done
                      </label>
                      {phoneInputArea}
                    </div>
                  );
                }}
              />
              <MachineSelector
                title="Dryers"
                machines={dryers.map((m) => ({
                  ...m,
                  status: buildMachineStatus(
                    dryerSettings[m.id]?.currentUser ?? null,
                    dryerSettings[m.id]?.reservedBy ?? null,
                    dryerSettings[m.id]?.running ?? false,
                    dryerSettings[m.id]?.remaining ?? 0
                  )
                }))}
                maxSelectable={maxPerGroup}
                selected={selectedDryers}
                onToggle={toggleDryer}
                disabledIds={dryerDisabledIds}
                availableCount={dryerAvailableCount}
                openSpotCount={dryerOpenSpotCount}
                renderDetails={(m) => renderReservationDetails(
                  m.id,
                  dryerSettings[m.id]?.currentUser ?? null,
                  dryerSettings[m.id]?.reservedBy ?? null,
                  reserveDryer,
                  cancelDryerReservation,
                  completeDryer,
                  dryerSettings[m.id]?.running ?? false
                )}
                renderSelected={(m) => {
                  const s = dryerSettings[m.id];
                  if (!s) return null;
                  const phoneValid = /^\d{10}$/.test(s.phone);
                  let phoneInputArea = null;
                  if (s.sendText) {
                    phoneInputArea = (
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={10}
                        placeholder="Phone (10 digits)"
                        value={s.phone}
                        style={{ minWidth: 120, fontSize: 13, border: phoneValid || !s.phone ? '1px solid #ccc' : '1px solid #e00' }}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d]/g, '');
                          setDryerSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], phone: val } }));
                        }}
                      />
                    );
                  }
                  return (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <select
                        aria-label={`dryer-options-${m.id}`}
                        value={s.type}
                        onChange={(e) => {
                          const val = e.target.value as DryerType;
                          const remaining = getDryerDuration(val);
                          setDryerSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], type: val, remaining } }));
                        }}
                      >
                        <option value="quick">Quick dry (15 min)</option>
                        <option value="wrinkle">Wrinkle release (20 min)</option>
                        <option value="regular">Regular dry (40 min)</option>
                      </select>
                      <label style={{ fontSize: 13 }}>
                        <input
                          type="checkbox"
                          checked={s.sendText}
                          onChange={(e) => setDryerSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], sendText: e.target.checked } }))}
                        />
                        &nbsp;Send text when done
                      </label>
                      {phoneInputArea}
                    </div>
                  );
                }}
              />
            </div>
            <div className="footer">
              <button className="btn primary" onClick={submit}>Submit machines</button>
              <button className="btn secondary" onClick={resetAll}>Reset all</button>
            </div>
          </>
        )}
        {activeTab === 'qr' && (
        <div className="qr-content">
          <div className="qr-placeholder">
            <div className="qr-icon">📷</div>
            <h2>Scan QR Code</h2>
            <p>Point your camera at the QR code on the machine to quickly select it.</p>
            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={() => {}} />
            <button className="btn primary" style={{ marginTop: '16px' }} onClick={() => cameraInputRef.current?.click()}>Open Camera</button>
          </div>
        </div>
        )}
      </div>
    </>
  );
}
