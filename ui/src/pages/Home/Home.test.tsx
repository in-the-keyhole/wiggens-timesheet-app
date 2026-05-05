import { render, screen } from '@testing-library/react'
import { vi, it, expect } from 'vitest'
import Home from './index'

vi.mock('../../codex-example/api/client', () => ({
  api: { get: () => Promise.resolve({ data: { employees: 2, timesheets: 0 } }) }
}))

it('renders metrics cards', async () => {
  render(<Home />)
  expect(await screen.findByText('Employees')).toBeInTheDocument()
  expect(await screen.findByText('Timesheets')).toBeInTheDocument()
})
