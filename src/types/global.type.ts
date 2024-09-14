export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
};
export type TMeta = {
  page: number;
  limit: number;
  totalDocuments: number;
  totalPage: number;
};
export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};
export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
