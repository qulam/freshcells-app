import { fireEvent, screen } from '@testing-library/react';
import { Error } from './Error';
import { renderWithProvider } from '../../../jest.setup';

const mockReload = jest.fn();

describe('Error Component', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete window.location;
    window.location = { reload: mockReload } as never;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render component', () => {
    renderWithProvider(<Error />);

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(
      screen.getByText('Something bad just happened...')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Our servers could not handle your request. Don&apos;t worry, our development team was already notified. Try refreshing the page.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'Refresh the page',
      })
    ).toBeInTheDocument();
  });

  it('calls refreshPage function when the refresh button is clicked', () => {
    renderWithProvider(<Error />);

    const refreshButton = screen.getByRole('button', {
      name: 'Refresh the page',
    });

    fireEvent.click(refreshButton);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
