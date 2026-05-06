import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Home from './index'

describe('Home', () => {
  it('renders metric cards', () => {
    const { getByText } = render(<Home />)
    expect(getByText('Employees')).toBeTruthy()
    expect(getByText('Timesheets')).toBeTruthy()
  })
})

