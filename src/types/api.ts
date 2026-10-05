export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId?: string;
  };
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
