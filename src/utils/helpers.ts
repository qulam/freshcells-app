export const parseJwtPayload = (token: string): { id: string } => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format.');
  }

  const payload = parts[1];
  const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decodedPayload);
};

export const mayBeNull = (value?: string | null, symbol = '---') =>
  value ?? symbol;
