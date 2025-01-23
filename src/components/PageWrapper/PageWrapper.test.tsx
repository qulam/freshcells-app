import { MantineProvider } from '@mantine/core';
import { screen } from '@testing-library/react';
import PageWrapper from './PageWrapper';
import { renderWithProvider } from '../../../jest.setup';

describe('PageWrapper Component', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render children content when not loading and no error occurs', () => {
    renderWithProvider(
      <PageWrapper heading="Test Heading" isLoading={false} isError={false}>
        <div>Test Child Content</div>
      </PageWrapper>
    );

    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
    expect(screen.queryByLabelText('loading-overlay')).not.toBeInTheDocument();
    expect(screen.queryByText('500')).not.toBeInTheDocument();
  });

  it('should display the Error component when isError is true', () => {
    renderWithProvider(
      <PageWrapper heading="Test Heading" isLoading={false} isError={true}>
        <div>Test Child Content</div>
      </PageWrapper>
    );

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(
      screen.getByText('Something bad just happened...')
    ).toBeInTheDocument();
  });

  it('should show a loading overlay when isLoading is true and hide it when false', () => {
    const { rerender } = renderWithProvider(
      <PageWrapper heading="Test Heading" isLoading={true} isError={false}>
        <div>Test Child Content</div>
      </PageWrapper>
    );

    expect(screen.queryByLabelText('loading-overlay')).toBeVisible();

    rerender(
      <MantineProvider>
        <PageWrapper heading="Test Heading" isLoading={false} isError={false}>
          <div>Test Child Content</div>
        </PageWrapper>
      </MantineProvider>
    );

    expect(screen.queryByLabelText('loading-overlay')).not.toBeInTheDocument();
  });

  it('should render the Error component when an error is thrown within children', () => {
    const ThrowError = () => {
      throw new Error('Error');
    };

    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    renderWithProvider(
      <PageWrapper heading="Test Heading">
        <ThrowError />
      </PageWrapper>
    );

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(
      screen.getByText('Something bad just happened...')
    ).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });
});
