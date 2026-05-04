import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Employees from '.'
import * as api from '../../codex-example/api/employees'

vi.mock('../../codex-example/api/employees')

describe('Employees screen', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('lists, searches, adds and deletes employees', async () => {
    vi.mocked(api.listEmployees).mockResolvedValueOnce([])

    render(<Employees />)

    // initial load
    expect(await screen.findByRole('table', { name: /employees-table/i })).toBeInTheDocument()

    // add
    vi.mocked(api.createEmployee).mockResolvedValue({ id: 1, firstName: 'Ada', lastName: 'Lovelace' })
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Ada' } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Lovelace' } })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(await screen.findByText('Ada')).toBeInTheDocument()

    // search
    vi.mocked(api.listEmployees).mockResolvedValueOnce([{ id: 1, firstName: 'Ada', lastName: 'Lovelace' }])
    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: 'ada' } })
    await waitFor(() => expect(api.listEmployees).toHaveBeenCalledWith('ada'))

    // delete
    vi.mocked(api.deleteEmployee).mockResolvedValue()
    fireEvent.click(screen.getByLabelText('delete-1'))
    await waitFor(() => expect(screen.queryByText('Ada')).not.toBeInTheDocument())
  })
})

