class LocalStorage {
  private static prefix = 'app_';
  private static keys = {
    ACCESS_TOKEN: 'accessToken',
  };

  static setItem(key: string, value: string): void {
    localStorage.setItem(`${this.prefix}${key}`, value);
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(`${this.prefix}${key}`);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(`${this.prefix}${key}`);
  }

  static clear(): void {
    localStorage.clear();
  }

  static setAuthToken(token: string): void {
    this.setItem(this.keys.ACCESS_TOKEN, token);
  }

  static getAuthToken() {
    return this.getItem(this.keys.ACCESS_TOKEN);
  }
}

export default LocalStorage;
