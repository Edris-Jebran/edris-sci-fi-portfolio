import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'
import React from 'react'
import HeroSection from '../sections/HeroSection'

it('renders name and tagline', () => {
  render(<HeroSection />)
  expect(screen.getByText(/Edris Jebran/i)).toBeInTheDocument()
  expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument()
})


