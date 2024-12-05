import { logError } from "./logger";

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export function handleAuthError(error: Error) {
  if (error instanceof AuthError) {
    logError(error, { code: error.code });
    return {
      error: error.message,
      code: error.code,
      status: error.statusCode,
    };
  }

  logError(error);
  return {
    error: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
    status: 500,
  };
} 