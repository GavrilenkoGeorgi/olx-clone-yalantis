import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders correctly', () => {
	render(<App />)
	const linkElement = screen.getByText(/This is the main page/i)
	expect(linkElement).toBeInTheDocument()
})
