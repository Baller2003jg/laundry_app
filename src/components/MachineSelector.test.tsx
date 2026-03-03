import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import MachineSelector from './MachineSelector'

describe('MachineSelector', () => {
  it('allows selecting up to maxSelectable and disables the rest', async () => {
    const machines = Array.from({ length: 6 }, (_, i) => ({ id: `m${i}`, name: `Machine ${i}` }))
    const TestHarness = () => {
      const [selected, setSelected] = React.useState<string[]>([])
      return (
        <MachineSelector
          title="test"
          machines={machines}
          maxSelectable={3}
          selected={selected}
          onToggle={(id) => {
            setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
          }}
        />
      )
    }

    render(<TestHarness />)

    // check there are 6 checkboxes
    const boxes = screen.getAllByRole('checkbox')
    expect(boxes.length).toBe(6)

    // simulate toggling first three
    const user = userEvent.setup()
    await user.click(boxes[0])
    await user.click(boxes[1])
    await user.click(boxes[2])

    // After 3 selections, remaining checkboxes are disabled
    // remaining boxes should be disabled when three selected
    const disabled = boxes.slice(3).filter((b) => b.disabled)
    expect(disabled.length).toBe(3)
  })
})
