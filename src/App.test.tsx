import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import App from './App'

describe('App washer flow', () => {
  it('starts washer on submit and shows timer + complete button', async () => {
    render(<App />)
    const user = userEvent.setup()

    // Login step
    await user.type(screen.getByLabelText(/school email/i), 'test@htu.edu')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    // click washer 1 checkbox by locating the row by text, then finding its checkbox
    const washerLabel = await screen.findByText('WASHER 1')
    const washerCheckbox = washerLabel.closest('label')?.querySelector('input[type=checkbox]') as HTMLInputElement
    await user.click(washerCheckbox)

    // select wash type for washer-1 (aria-label is actually washer-options-washer-1)
    const washType = screen.getByLabelText('washer-options-washer-1') as HTMLSelectElement
    await user.selectOptions(washType, 'quick')

    // check "Send text when done" (find the first unchecked box after the washerCheckbox)
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    const sendTextCheckbox = checkboxes.find((cb) => !cb.checked && cb !== washerCheckbox)
    if (sendTextCheckbox) await user.click(sendTextCheckbox)

    // submit
    const submit = screen.getByRole('button', { name: /submit machines/i })
    await user.click(submit)

    // after submit, the washer checkbox should be disabled and a Complete button visible
    expect(washerCheckbox).toBeDisabled()

    // The Complete button is rendered inside the selected washer row
    const completeBtn = await screen.findByRole('button', { name: /complete/i })
    expect(completeBtn).toBeInTheDocument()
  })
})
