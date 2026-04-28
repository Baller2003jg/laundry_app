import React from 'react'

export type Machine = {
  id: string
  name: string
  status?: string
}

export type MachineSelectorProps = {
  title: string
  machines: Machine[]
  maxSelectable: number
  selected: string[]
  onToggle: (id: string) => void
  // optional map of machine id -> additional UI to render when selected
  renderSelected?: (m: Machine) => React.ReactNode
  // optional machine-level details always shown below the main row content
  renderDetails?: (m: Machine) => React.ReactNode
  // optional set of ids that should be disabled (e.g. already in use)
  disabledIds?: string[]
  availableCount?: number
  openSpotCount?: number
}

export default function MachineSelector({ title, machines, maxSelectable, selected, onToggle, renderSelected, renderDetails, disabledIds, availableCount, openSpotCount }: MachineSelectorProps) {
  const selectedCount = selected.length
  // QR code scan logic removed for now
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div className="panel-stats">
        {availableCount !== undefined && (
          <span className="stat-badge stat-available">✅ {availableCount} Available</span>
        )}
        {openSpotCount !== undefined && openSpotCount > 0 && (
          <span className="stat-badge stat-open">🔖 {openSpotCount} Open reservation spot{openSpotCount !== 1 ? 's' : ''}</span>
        )}
      </div>
      <div className="note">Select up to {maxSelectable}. Selected: <span className="selected-count">{selectedCount}</span></div>
      <div className="list" style={{ marginTop: 8 }}>
        {machines.map((m) => {
          const isSelected = selected.includes(m.id)
          const disabledByLimit = !isSelected && selectedCount >= maxSelectable
          const disabledByState = Array.isArray(disabledIds) && disabledIds.includes(m.id)
          const disabled = disabledByLimit || disabledByState
          return (
            <div key={m.id} className="machine" style={{ opacity: disabled ? 0.55 : 1 }}>
              <label className="machine-main">
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => onToggle(m.id)}
                />
                <div className="meta">
                  <div className="name">{m.name}</div>
                  <div className="desc">{m.status ?? 'Available'}</div>
                </div>
              </label>
              <div className="machine-extra">
                {renderDetails ? <div className="machine-details">{renderDetails(m)}</div> : null}
                {isSelected && renderSelected ? <div className="machine-selected">{renderSelected(m)}</div> : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
