import { fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router';
import NotFound from './NotFound';
import { renderWithProvider } from '../../../jest.setup';

describe('NotFound component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should render component', () => {
    renderWithProvider(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('You have found a secret place.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.'
      )
    ).toBeInTheDocument();
    const goBackBtn = screen.getByRole('button', {
      name: 'Take me back to home page',
    });
    fireEvent.click(goBackBtn);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
