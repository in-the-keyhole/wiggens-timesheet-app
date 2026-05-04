import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from './App'

vi.mock('./codex-example/api/client', () => ({
  api: {
    get: vi.fn((path: string) => {
      if (path === '/metrics') return Promise.resolve({ data: { employeeCount: 2, timesheetCount: 0 } })
      if (path === '/employees') return Promise.resolve({ data: [{ id:1, firstName:'Jane', lastName:'Doe'}] })
      return Promise.resolve({ data: {} })
    }),
    post: vi.fn(() => Promise.resolve({ data: {} }))
  }
}))

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

test('renders app title', () => {
  render(<App />)
  expect(screen.getByText(/Wiggens Timesheet/i)).toBeTruthy()
})
