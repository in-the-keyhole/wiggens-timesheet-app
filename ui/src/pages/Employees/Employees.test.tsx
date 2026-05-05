import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Employees placeholder test', () => {
  it('renders placeholder content', async () => {
    render(<div>Add Employee</div>)
    expect(await screen.findByText('Add Employee')).toBeTruthy()
  })
})
