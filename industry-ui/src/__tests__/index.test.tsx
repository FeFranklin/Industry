import { render, screen, act } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    act(() => {
      /* fire events that update state */
      render(<Home />)
    });

    const mainContent = screen.getByTestId('main-content')

    expect(mainContent).toBeInTheDocument()
  })
})