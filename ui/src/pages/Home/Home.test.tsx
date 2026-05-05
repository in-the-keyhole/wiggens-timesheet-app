import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Home from './index'
import React from 'react'

vi.mock('../../codex-example/api', () => ({
  api: { metrics: async () => ({ employeeCount: 2, timesheetCount: 0 }) }
}))

describe('Home', () => {
  it('shows metrics', async () => {
    render(<Home />)
    await waitFor(() => screen.getByText('Employees'))
    expect(screen.getByText('Employees')).toBeTruthy()
    expect(screen.getByText('Timesheets')).toBeTruthy()
  })
})
