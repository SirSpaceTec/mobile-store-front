import { render, screen } from './test-utils'
import ProductCard from '../components/ProductCard'
import { MemoryRouter } from 'react-router-dom'

// Producto mínimo de prueba
const mockProduct = {
  id: '123',
  marca: 'Samsung',
  modelo: 'Galaxy S21',
  precio: 899.99,
  cpu: '',
  ram: 0,
  sistemaOperativo: '',
  resolucionPantalla: '',
  bateria: 0,
  camaras: '',
  dimensiones: '',
  peso: 0,
}

describe('ProductCard', () => {
  it('muestra el nombre del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    )
    expect(screen.getByText('Galaxy S21')).toBeInTheDocument()
  })

  it('muestra el precio correctamente formateado', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    )
    expect(screen.getByText('899.99 €')).toBeInTheDocument()
  })

  it('enlaza correctamente al detalle del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/product/123')
  })
})
