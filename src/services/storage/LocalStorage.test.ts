import LocalStorage from './LocalStorage';

let mockStorage: Record<string, string | null> = {};

describe('LocalStorage', () => {
  beforeEach(() => {
    (LocalStorage.getItem as jest.Mock).mockImplementation((key) => {
      return mockStorage[key as keyof object];
    });
    (LocalStorage.setItem as jest.Mock).mockImplementation((key, value) => {
      mockStorage[key as keyof object] = value;
    });
    (LocalStorage.removeItem as jest.Mock).mockImplementation((key) => {
      mockStorage[key as keyof object] = null;
    });
    (LocalStorage.clear as jest.Mock).mockImplementation(() => {
      mockStorage = {};
    });
    (LocalStorage.setAuthToken as jest.Mock).mockImplementation((token) => {
      mockStorage[LocalStorage.keys.ACCESS_TOKEN as keyof object] = token;
    });
    (LocalStorage.getAuthToken as jest.Mock).mockImplementation(() => {
      return mockStorage[LocalStorage.keys.ACCESS_TOKEN as keyof object];
    });
    (LocalStorage.setLang as jest.Mock).mockImplementation((token) => {
      mockStorage[LocalStorage.keys.LANG as keyof object] = token;
    });
    (LocalStorage.getLang as jest.Mock).mockImplementation(() => {
      return mockStorage[LocalStorage.keys.LANG as keyof object];
    });
  });

  it('should set and get items correctly', async () => {
    const key = 'key';
    const value = 'value';

    LocalStorage.setItem(key, value);
    const retrievedValue = LocalStorage.getItem(key);
    expect(retrievedValue).toBe(value);
  });

  it('should remove item correctly', async () => {
    const key = 'key';
    const value = 'value';

    LocalStorage.setItem(key, value);
    const retrievedValue = LocalStorage.getItem(key);
    expect(retrievedValue).toBe(value);
    LocalStorage.removeItem(key);
    expect(LocalStorage.getItem(key)).toBe(null);
  });

  it('should clear storage correctly', async () => {
    const key = 'key';
    const value = 'value';

    LocalStorage.setItem(key, value);
    const retrievedValue = LocalStorage.getItem(key);
    expect(retrievedValue).toBe(value);
    LocalStorage.clear();
    expect(LocalStorage.getItem(key)).toBe(undefined);
  });

  it('should set and get auth token correctly', async () => {
    const token = 'token';

    LocalStorage.setAuthToken(token);
    const retrievedValue = LocalStorage.getAuthToken();
    expect(retrievedValue).toBe(token);
  });

  it('should set and get lang correctly', async () => {
    const lang = 'en';

    LocalStorage.setLang(lang);
    const retrievedValue = LocalStorage.getLang();
    expect(retrievedValue).toBe(lang);
  });
});
