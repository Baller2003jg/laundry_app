import React from 'react'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, it, expect, vi } from 'vitest'
import App from './App'

vi.mock('./firebase', () => ({ db: null, auth: null }))

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('App washer flow', () => {
  it('starts washer on submit and shows the active user', async () => {
    render(<App />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/school email/i), 'test@htu.edu')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    const [washerLabel] = await screen.findAllByText('WASHER 1')
    const washerCheckbox = washerLabel.closest('label')?.querySelector('input[type=checkbox]') as HTMLInputElement
    await user.click(washerCheckbox)

    const washType = screen.getByLabelText('washer-options-washer-1') as HTMLSelectElement
    await user.selectOptions(washType, 'quick')

    const submit = screen.getByRole('button', { name: /submit machines/i })
    await user.click(submit)

    expect(washerCheckbox.disabled).toBe(true)
    const completeBtn = await screen.findByRole('button', { name: /complete/i })
    expect(completeBtn).not.toBeNull()
    expect(await screen.findByText(/in use by test@htu\.edu/i)).not.toBeNull()
  })

  it('shows who is using a machine and who reserved it next', async () => {
    render(<App />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/school email/i), 'first@htu.edu')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    const [washerLabel] = await screen.findAllByText('WASHER 1')
    const washerCheckbox = washerLabel.closest('label')?.querySelector('input[type=checkbox]') as HTMLInputElement
    await user.click(washerCheckbox)
    await user.click(screen.getByRole('button', { name: /submit machines/i }))

    await user.click(screen.getByRole('button', { name: /logout/i }))

    await user.type(screen.getByLabelText(/school email/i), 'next@htu.edu')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    const [washerName] = screen.getAllByText('WASHER 1')
    const washerRow = washerName.closest('.machine') as HTMLElement
    expect(within(washerRow).getByText('first@htu.edu')).not.toBeNull()

    await user.click(within(washerRow).getByRole('button', { name: /reserve next/i }))

    expect(within(washerRow).getByText('next@htu.edu')).not.toBeNull()
    expect(within(washerRow).getByText(/next in line/i)).not.toBeNull()
  })

  it('allows a student to reserve Washer 1 while it is in use', async () => {
    render(<App />)
    const user = userEvent.setup()

    // First student starts Washer 1
    await user.type(screen.getByLabelText(/school email/i), 'student1@htu.edu')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    const [washerLabel] = await screen.findAllByText('WASHER 1')
    const washerCheckbox = washerLabel.closest('label')?.querySelector('input[type=checkbox]') as HTMLInputElement
    await user.click(washerCheckbox)
    await user.click(screen.getByRole('button', { name: /submit machines/i }))

    // Confirm Washer 1 is now in use
    expect(await screen.findByText(/in use by student1@htu\.edu/i)).not.toBeNull()

    // Log out and log in as a second student
    await user.click(screen.getByRole('button', { name: /logout/i }))
    await user.type(screen.getByLabelText(/school email/i), 'student2@htu.edu')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    // Second student reserves Washer 1
    const [washerName] = await screen.findAllByText('WASHER 1')
    const washerRow = washerName.closest('.machine') as HTMLElement
    await user.click(within(washerRow).getByRole('button', { name: /reserve next/i }))

    // Reservation is confirmed
    expect(within(washerRow).getByText('student2@htu.edu')).not.toBeNull()
    expect(within(washerRow).getByText(/next in line/i)).not.toBeNull()
  })
})
