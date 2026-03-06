import React, { useEffect, useState } from 'react';
import Login from './Login';
import MachineSelector from './components/MachineSelector';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'machines' | 'qr'>('machines');

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

  // Washer state
  type WashType = 'quick' | 'bedding' | 'rinse' | 'regular';
  type WasherState = {
    type: WashType;
    sendText: boolean;
    phone: string;
    running: boolean;
    remaining: number;
    intervalId?: number | null;
  };
  const [washerSettings, setWasherSettings] = useState<Record<string, WasherState>>({});
  const [selectedWashers, setSelectedWashers] = useState<string[]>([]);

  // Dryer state
  type DryerType = 'quick' | 'wrinkle' | 'regular';
  type DryerState = {
    type: DryerType;
    sendText: boolean;
    phone: string;
    running: boolean;
    remaining: number;
    intervalId?: number | null;
  };
  const [dryerSettings, setDryerSettings] = useState<Record<string, DryerState>>({});
  const [selectedDryers, setSelectedDryers] = useState<string[]>([]);

  const maxPerGroup = 2;
  const INITIAL_SECONDS = 30 * 60;

  function toggle(items: string[], setItems: (s: string[]) => void, id: string) {
    if (items.includes(id)) {
      if (washerSettings[id]?.running) return;
      setItems(items.filter((x) => x !== id));
      setWasherSettings((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } else {
      setItems([...items, id]);
      setWasherSettings((prev) => ({
        ...prev,
        [id]: prev[id] ?? { type: 'regular', sendText: false, phone: '', running: false, remaining: INITIAL_SECONDS, intervalId: null }
      }));
    }
  }

  function resetAll() {
    Object.values(washerSettings).forEach((s) => {
      if (s.intervalId) window.clearInterval(s.intervalId!);
    });
    Object.values(dryerSettings).forEach((s) => {
      if (s.intervalId) window.clearInterval(s.intervalId!);
    });
    setWasherSettings({});
    setDryerSettings({});
    setSelectedWashers([]);
    setSelectedDryers([]);
  }

  function formatTime(s: number) {
    const mm = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }

  function completeWasher(id: string) {
    const s = washerSettings[id];
    if (!s) return;
    if (s.intervalId) window.clearInterval(s.intervalId);
    setWasherSettings((prev) => ({ ...prev, [id]: { ...prev[id], running: false, remaining: prev[id].type === 'quick' ? 15 * 60 : INITIAL_SECONDS, intervalId: null } }));
    setSelectedWashers((prev) => prev.filter((p) => p !== id));
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
            intervalId
          };
        }
      }
      return updated;
    });
    
    // Start all selected dryers
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
            intervalId
          };
        }
      }
      return updated;
    });
  }

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(washerSettings).forEach((s) => {
        if (s.intervalId) window.clearInterval(s.intervalId!);
      });
      Object.values(dryerSettings).forEach((s) => {
        if (s.intervalId) window.clearInterval(s.intervalId!);
      });
    };
  }, [washerSettings, dryerSettings]);

  if (!loggedIn) {
    return <Login onLogin={(email) => { setLoggedIn(true); setUserEmail(email); }} />;
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-title">HT Laundry app</div>
        <div className="nav-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Locations</a>
          <a href="#" className="nav-link">Contact Us</a>
        </div>
      </nav>
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
                machines={washers.map((m) => ({ ...m, status: washerSettings[m.id]?.running ? (washerSettings[m.id]?.remaining > 0 ? `In use — ${formatTime(washerSettings[m.id].remaining)}` : 'In use — ready to complete') : undefined }))}
                maxSelectable={maxPerGroup}
                selected={selectedWashers}
                onToggle={(id) => toggle(selectedWashers, setSelectedWashers, id)}
                disabledIds={Object.entries(washerSettings).filter(([, v]) => v?.running).map(([k]) => k)}
                renderSelected={(m) => {
                  const s = washerSettings[m.id];
                  if (!s) return null;
                  if (s.running) {
                    return (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <div style={{ fontSize: 13 }}>{formatTime(s.remaining)}</div>
                        <button className="btn ghost" onClick={() => completeWasher(m.id)}>Complete</button>
                      </div>
                    );
                  }
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
                        style={{ width: 120, fontSize: 13, border: phoneValid || !s.phone ? '1px solid #ccc' : '1px solid #e00' }}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d]/g, '');
                          setWasherSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], phone: val } }));
                        }}
                      />
                    );
                  }
                  const disabled = s.running;
                  return (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <select
                        aria-label={`washer-options-${m.id}`}
                        value={s.type}
                        disabled={disabled}
                        className={disabled ? 'option-disabled' : ''}
                        onChange={(e) => setWasherSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], type: e.target.value as WashType, remaining: e.target.value === 'quick' ? 15 * 60 : INITIAL_SECONDS } }))}
                      >
                        <option value="rinse">Rinse only (10 min)</option>
                        <option value="quick">Quick wash (15 min)</option>
                        <option value="bedding">Bedding (40 min)</option>
                        <option value="regular">Regular wash (30 min)</option>
                      </select>
                      <label style={{ fontSize: 13, opacity: disabled ? 0.5 : 1 }}>
                        <input
                          type="checkbox"
                          checked={s.sendText}
                          disabled={disabled}
                          onChange={(e) => setWasherSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], sendText: e.target.checked } }))}
                        />
                        &nbsp;Send text when done
                      </label>
                      {!disabled && phoneInputArea}
                    </div>
                  );
                }}
              />
              <MachineSelector
                title="Dryers"
                machines={dryers.map((m) => ({ ...m, status: dryerSettings[m.id]?.running ? (dryerSettings[m.id]?.remaining > 0 ? `In use — ${formatTime(dryerSettings[m.id].remaining)}` : 'In use — ready to complete') : undefined }))}
                maxSelectable={maxPerGroup}
                selected={selectedDryers}
                onToggle={(id) => {
                  if (selectedDryers.includes(id)) {
                    if (dryerSettings[id]?.running) return;
                    setSelectedDryers(selectedDryers.filter((x) => x !== id));
                    setDryerSettings((prev) => {
                      const copy = { ...prev };
                      delete copy[id];
                      return copy;
                    });
                  } else {
                    setSelectedDryers([...selectedDryers, id]);
                    setDryerSettings((prev) => ({
                      ...prev,
                      [id]: prev[id] ?? { type: 'regular', sendText: false, phone: '', running: false, remaining: 40 * 60, intervalId: null }
                    }));
                  }
                }}
                disabledIds={Object.entries(dryerSettings).filter(([, v]) => v?.running).map(([k]) => k)}
                renderSelected={(m) => {
                  const s = dryerSettings[m.id];
                  if (!s) return null;
                  if (s.running) {
                    return (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <div style={{ fontSize: 13 }}>{formatTime(s.remaining)}</div>
                        <button className="btn ghost" onClick={() => {
                          if (s.intervalId) window.clearInterval(s.intervalId!);
                          const newRemaining = s.type === 'quick' ? 15 * 60 : s.type === 'wrinkle' ? 20 * 60 : 40 * 60;
                          setDryerSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], running: false, remaining: newRemaining, intervalId: null } }));
                          setSelectedDryers((prev) => prev.filter((p) => p !== m.id));
                        }}>Complete</button>
                      </div>
                    );
                  }
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
                        style={{ width: 120, fontSize: 13, border: phoneValid || !s.phone ? '1px solid #ccc' : '1px solid #e00' }}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d]/g, '');
                          setDryerSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], phone: val } }));
                        }}
                      />
                    );
                  }
                  const disabled = s.running;
                  return (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <select
                        aria-label={`dryer-options-${m.id}`}
                        value={s.type}
                        disabled={disabled}
                        className={disabled ? 'option-disabled' : ''}
                        onChange={(e) => {
                          const val = e.target.value as DryerType;
                          const remaining = val === 'quick' ? 15 * 60 : val === 'wrinkle' ? 20 * 60 : 40 * 60;
                          setDryerSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], type: val, remaining } }));
                        }}
                      >
                        <option value="quick">Quick dry (15 min)</option>
                        <option value="wrinkle">Wrinkle release (20 min)</option>
                        <option value="regular">Regular dry (40 min)</option>
                      </select>
                      <label style={{ fontSize: 13, opacity: disabled ? 0.5 : 1 }}>
                        <input
                          type="checkbox"
                          checked={s.sendText}
                          disabled={disabled}
                          onChange={(e) => setDryerSettings((prev) => ({ ...prev, [m.id]: { ...prev[m.id], sendText: e.target.checked } }))}
                        />
                        &nbsp;Send text when done
                      </label>
                      {!disabled && phoneInputArea}
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
            <button className="btn primary" style={{ marginTop: '16px' }}>Open Camera</button>
          </div>
        </div>
        )}
      </div>
    </>
  );
}
