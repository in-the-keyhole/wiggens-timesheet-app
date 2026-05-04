import { render, screen, waitFor } from '@testing-library/react'
import Landing from './index'
import * as dashboard from '../../codex-example/api/dashboard'

vi.mock('../../codex-example/api/dashboard')

it('renders dashboard counts', async () => {
  vi.mocked(dashboard.getSummary).mockResolvedValue({ employeeCount: 3, timesheetCount: 7 })
  render(<Landing />)
  expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument()
  await waitFor(() => expect(dashboard.getSummary).toHaveBeenCalled())
  expect(screen.getByTestId('employee-count')).toHaveTextContent('3')
  expect(screen.getByTestId('timesheet-count')).toHaveTextContent('7')
})
