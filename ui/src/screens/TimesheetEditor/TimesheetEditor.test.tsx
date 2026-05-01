import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TimesheetEditor from './index'
import * as employeesHook from '../../hooks/useEmployees'
import * as tsHook from '../../hooks/useTimesheet'

vi.mock('../../hooks/useEmployees')
vi.mock('../../hooks/useTimesheet')

it('allows selecting employee and saving hours', async () => {
  vi.spyOn(employeesHook, 'useEmployees').mockReturnValue({
    employees: [{ id: 1, firstName: 'Ada', lastName: 'Lovelace' }],
    loading: false
  } as any)
  const save = vi.fn().mockResolvedValue({})
  vi.spyOn(tsHook, 'useTimesheet').mockReturnValue({
    timesheet: { employeeId: 1, weekStart: '2024-04-29', entries: [] },
    setTimesheet: vi.fn(),
    loading: false,
    save,
    reload: vi.fn()
  } as any)

  render(<TimesheetEditor />)
  fireEvent.mouseDown(screen.getByLabelText(/Employee/i))
  fireEvent.click(screen.getByText('Ada Lovelace'))
  const mon = screen.getByLabelText(/Mon Hours/i)
  fireEvent.change(mon, { target: { value: '8' } })
  fireEvent.click(screen.getByRole('button', { name: /save/i }))
  await waitFor(() => expect(save).toHaveBeenCalled())
})

