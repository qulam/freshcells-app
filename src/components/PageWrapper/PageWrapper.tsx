import { ReactNode } from 'react';
import { Box, LoadingOverlay, Text } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Error } from '@app/components';

interface PageWrapperProps {
  isLoading?: boolean;
  isError?: boolean;
  children: ReactNode;
  heading: string;
}

const PageWrapper = ({
  children,
  heading,
  isLoading = false,
  isError = false,
}: PageWrapperProps) => {
  if (isError) return <Error />;

  return (
    <ErrorBoundary fallback={<Error />}>
      <Box pos="relative" h="100%">
        <LoadingOverlay
          aria-label="loading-overlay"
          visible={isLoading}
          zIndex={1000}
        />
        <Box w={500}>
          <Text mb={12}>{heading}</Text>
          {children}
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default PageWrapper;
