import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiBetoch } from '../enums/api.enum';
import { PaginationAndSort } from '../utils/pagination';
import { UtilityService } from './utility.service';
import { PaginatedResult } from '../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private utilityService: UtilityService) { }

  getHouses(formValue: any, paginationAndSort: PaginationAndSort) {
    console.log(paginationAndSort)
    const params = this.utilityService.getParamsV2(paginationAndSort, formValue);
    console.log(params)
    return this.http.get<PaginatedResult<any>>(environment.url + ApiBetoch.AllHouses, { params: params })
  }
}
