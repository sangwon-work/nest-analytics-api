export interface ApiResponseType<T> {
  res_code: string;
  message: string;
  body: T;
}
