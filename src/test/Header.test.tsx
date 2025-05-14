import { renderWithProviders, screen } from './test-utils'
import Header from '../components/Header'

describe('Header', () => {
  it('renderiza el logo Mobile Store', () => {
    renderWithProviders(<Header />)

    const link = screen.getByRole('link', {
      name: (_, el) =>
        el?.textContent?.replace(/\s+/g, '').toLowerCase() === 'mobilestore',
    })

    expect(link).toBeInTheDocument()
  })

  it('renderiza el contador del carrito', () => {
    renderWithProviders(<Header />)
    expect(screen.getByText('🛒')).toBeInTheDocument()
  })
})
