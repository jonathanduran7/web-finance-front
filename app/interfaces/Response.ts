export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
  previousPage: number | null;
  nextPage: number | null;
}
