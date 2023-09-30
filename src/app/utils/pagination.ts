export class PaginationAndSort {
  sort: SortSetting;
  pageDetail: PageDetail;

  constructor(sort?: SortSetting, pageDetail?: PageDetail) {
    this.sort = sort || new SortSetting();
    this.pageDetail = pageDetail || new PageDetail();
  }
}

export class SortSetting {
  defaultSortArray: Sort[];
  sortArray: Sort[];

  constructor(defaultSortArray?: Sort[]) {
    this.defaultSortArray = defaultSortArray || [];
    this.sortArray = [];
  }

  hasSortParams(): boolean {
    return this.sortArray.length > 0;
  }

  addSort(newSort: Sort): void {
    this.sortArray.push(newSort);
  }

  removeSort(fieldName: string): void {
    this.sortArray = this.sortArray.filter((sort) => sort.field !== fieldName);
  }

  getSortParams(): string[] {
    return this.sortArray.map((sort) => `${sort.field}:${sort.order}`);
  }
}

export class PageDetail {
  totalElements: number;
  totalPages: number;
  perPage: number;
  page: number;

  constructor(page?: number, perPage?: number, totalElements?: number, totalPages?: number) {
    this.page = page || 0;
    this.perPage = perPage || 10;
    this.totalElements = totalElements || 0;
    this.totalPages = totalPages || 0;
  }

  getPage(): number {
    return this.page;
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  getTotalElements() {
    this.totalElements
  }

  getPerPage(): number {
    return this.perPage;
  }
}

export interface Sort {
  field: string;
  order: -1 | 0 | 1;
  priority?: number;
}
