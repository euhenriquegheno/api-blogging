import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../app/config/app'

describe('App', () => {
  it('renderiza sem erros', () => {
    render(<App />)
    expect(screen.getByText(/API Blogging/i)).toBeInTheDocument()
  })
})
