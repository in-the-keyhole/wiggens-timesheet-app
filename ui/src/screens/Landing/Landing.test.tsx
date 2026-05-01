import { render, screen } from '@testing-library/react'
import Landing from './index'

it('renders welcome text', () => {
  render(<Landing />)
  expect(screen.getByText(/Welcome to Wiggens Timesheet/i)).toBeInTheDocument()
})

