export interface IBaseResponse<T> {
  success?: boolean;
  error?: string;
  data?: T;
}
