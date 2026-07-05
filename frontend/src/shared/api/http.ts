export class HttpError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(path, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })
  } catch {
    throw new HttpError(0, 'Не удалось подключиться к серверу')
  }

  if (!response.ok) {
    let message = `Ошибка ${response.status}`

    try {
      const body = await response.json() as { detail?: string }
      if (body.detail) {
        message = body.detail
      }
    } catch {
      // тело ответа не JSON
    }

    throw new HttpError(response.status, message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
