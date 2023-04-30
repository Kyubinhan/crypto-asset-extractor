interface CMCResponse<T> {
  status: {
    timestamp: string;
    error_code: number;
    error_message: null;
    elapsed: number;
    notice: null;
  };
  data: T;
}
