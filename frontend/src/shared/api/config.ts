function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '')
}

export function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  if (!baseUrl) {
    throw new Error(
      'VITE_API_BASE_URL не задан. Создай frontend/.env на основе .env.example',
    )
  }

  return normalizeBaseUrl(baseUrl)
}

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${getApiBaseUrl()}${normalizedPath}`
}
