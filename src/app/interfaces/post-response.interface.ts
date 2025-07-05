export interface PostResponse {
  status: boolean;
}
export interface PostResponseData<T> extends PostResponse {
  result: T;
}
