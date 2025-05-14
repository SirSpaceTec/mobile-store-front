import { render, screen, fireEvent } from '@testing-library/react'
import ProductImage from '../components/ProductImage'

describe('ProductImage', () => {
  const productId = '123'

  it('renderiza con la imagen .jpg inicial', () => {
    render(<ProductImage productId={productId} />)

    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', `http://localhost:8080/phones/${productId}.jpg`)
    expect(img).toHaveAttribute('alt', `Imagen producto ${productId}`)
  })

  it('usa el sizeClass por defecto si no se especifica', () => {
    render(<ProductImage productId={productId} />)

    const img = screen.getByRole('img')
    expect(img.className).toContain('w-32 h-32')
  })

  it('usa el sizeClass personalizado si se proporciona', () => {
    render(<ProductImage productId={productId} sizeClass="w-64 h-64" />)

    const img = screen.getByRole('img')
    expect(img.className).toContain('w-64 h-64')
  })

  it('cambia a .png si .jpg falla', () => {
    render(<ProductImage productId={productId} />)

    const img = screen.getByRole('img')
    fireEvent.error(img) // Simula error de carga de .jpg

    expect(img).toHaveAttribute('src', `http://localhost:8080/phones/${productId}.png`)
  })

  it('cambia a fallback si .png también falla', () => {
    render(<ProductImage productId={productId} />)

    const img = screen.getByRole('img')

    // Primer fallo: .jpg
    fireEvent.error(img)
    // Segundo fallo: .png
    fireEvent.error(img)

    expect(img).toHaveAttribute('src', '/fallback.jpg')
  })
})
