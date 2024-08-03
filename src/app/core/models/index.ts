export interface List2Res<T> {
  page: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
  dates?: DateRange;
}

export interface DateRange {
  maximum: string;
  minimum: string;
}
