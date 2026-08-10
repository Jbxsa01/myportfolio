import React from 'react'
import { render, screen } from '@testing-library/react'
import DownloadCVButton from '@/components/ui/DownloadCVButton'

describe('DownloadCVButton', () => {
  it('renders and shows download text', () => {
    render(<DownloadCVButton />)
    expect(screen.getByText(/Télécharger CV/i)).toBeInTheDocument()
  })
})
