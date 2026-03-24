const TOKEN_KEY = 'frontend-pc-token'

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getItem<T>(key: string, defaultValue?: T): T | null {
  const item = localStorage.getItem(key)
  if (item) {
    try {
      return JSON.parse(item) as T
    } catch {
      return defaultValue as T
    }
  }
  return defaultValue || null
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem(key: string): void {
  localStorage.removeItem(key)
}
