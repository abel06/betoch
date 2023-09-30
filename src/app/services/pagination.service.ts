import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PageDetail, PaginationAndSort, SortSetting } from '../utils/pagination';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  paginationSort: PaginationAndSort = new PaginationAndSort(new SortSetting([{ field: 'start', order: -1 }]), new PageDetail(0, 20));
  handlePageEvent(pageEvent: PageEvent, paginationSort?: PaginationAndSort): void {
    this.paginationSort.pageDetail.perPage = pageEvent.pageSize
    this.paginationSort.pageDetail.page = pageEvent.pageIndex
  }

  constructor() { }
}