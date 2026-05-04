import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import App from './App'

describe('App navigation', () => {
  it('renders nav links', () => {
    const router = createMemoryRouter([
      { path: '/', element: <App />, children: [{ index: true, element: <div>Home</div> }] }
    ])
    render(<RouterProvider router={router} />)
    expect(screen.getByText(/Employees/i)).toBeInTheDocument()
    expect(screen.getByText(/Timesheets/i)).toBeInTheDocument()
    expect(screen.getByText(/Reports/i)).toBeInTheDocument()
  })
})
