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
  // optional set of ids that should be disabled (e.g. already in use)
  disabledIds?: string[]
}

export default function MachineSelector({ title, machines, maxSelectable, selected, onToggle, renderSelected, disabledIds }: MachineSelectorProps) {
  const selectedCount = selected.length
  // QR code scan logic removed for now
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div className="note">Select up to {maxSelectable}. Selected: <span className="selected-count">{selectedCount}</span></div>
      <div className="list" style={{ marginTop: 8 }}>
        {machines.map((m) => {
          const isSelected = selected.includes(m.id)
          const disabledByLimit = !isSelected && selectedCount >= maxSelectable
          const disabledByState = Array.isArray(disabledIds) && disabledIds.includes(m.id)
          const disabled = disabledByLimit || disabledByState
          return (
            <label key={m.id} className="machine" style={{ opacity: disabled ? 0.55 : 1 }}>
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
              {/* QR code scan button removed */}
              {/* render extra UI inside the machine row if selected */}
              {isSelected && renderSelected ? <div style={{ marginLeft: 8 }}>{renderSelected(m)}</div> : null}
            </label>
          )
        })}
      </div>
    </div>
  )
}
