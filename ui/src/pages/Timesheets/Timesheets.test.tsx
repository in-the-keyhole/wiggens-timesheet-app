import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import Timesheets from './index'

// Mock the API client to avoid real network calls
vi.mock('../../codex-example/api/client', () => {
  return {
    default: {
      get: vi.fn().mockResolvedValue({ data: [{ id: 1, firstName: 'Jane', lastName: 'Doe' }] }),
      post: vi.fn().mockResolvedValue({ data: {} })
    }
  }
})

describe('Timesheets', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders notes inputs for each day', async () => {
    const { getAllByLabelText } = render(<Timesheets />)
    await waitFor(() => {
      const notesFields = getAllByLabelText('Notes')
      expect(notesFields.length).toBe(5)
    })
  })
})

