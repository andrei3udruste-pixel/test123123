import {IBaseResponse} from './base-response';

export interface IPageResponse<T> extends IBaseResponse<Array<T>> {
  pageSize?: number;
  pageNumber?: number;
  totalElements?: number;
}
