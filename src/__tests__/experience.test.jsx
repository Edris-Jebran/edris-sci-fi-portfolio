
import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'
import React from 'react'
import ExperienceTimeline from '../sections/ExperienceTimeline'

// Smoke test that Experience renders section heading
it('renders Experience heading', () => {
  render(<ExperienceTimeline />)
  expect(screen.getByText(/Experience/i)).toBeInTheDocument()
})

it('renders at least one experience card', () => {
  render(<ExperienceTimeline />)
  const items = screen.getAllByRole('heading', { level: 3 })
  expect(items.length).toBeGreaterThan(0)
})
