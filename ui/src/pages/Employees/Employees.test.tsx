import { render, screen } from '@testing-library/react'
import Employees from './index'

vi.mock('../../codex-example/api/client', () => ({
  listEmployees: async () => ([{ id: 1, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }])
}))

describe('Employees page', () => {
  it('shows employees table', async () => {
    render(<Employees />)
    expect(await screen.findByText(/Jane/)).toBeInTheDocument()
  })
})

