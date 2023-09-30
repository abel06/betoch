import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DateFormat } from '../enums/dateformat.enum';
import { PaginationAndSort } from '../utils/pagination';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() { }
  getParamsV2(paginationSort: PaginationAndSort | null, formValue?: any): HttpParams {
    let params = new HttpParams();
    if (formValue) {
      Object.keys(formValue).forEach((key: any) => {
        if (formValue[key]) {
          if (this.isDate(formValue[key])) {
            params = params.append(key, moment(formValue[key]).format(DateFormat.YYYY_MM_DD_DASH))
          } else {

            if (typeof formValue[key] === 'string') {
              params = params.append(key, formValue[key].trim());
            }

            else if (typeof formValue[key] !== 'object') {
              params = params.append(key, formValue[key])
            }
            else if (typeof formValue[key] === 'object' && (formValue[key].hasOwnProperty('min') || formValue[key].hasOwnProperty('max'))) {
              const rangeStartKey = key + 'From';
              const rangeEndKey = key + 'To';
              params = formValue[key]?.min ? params.append(rangeStartKey, formValue[key].min) : params;
              params = formValue[key]?.max ? params.append(rangeEndKey, formValue[key].max) : params;
            } else if (typeof formValue[key] === 'object' && formValue[key].hasOwnProperty('value') && formValue[key].hasOwnProperty('name')) {
              params = params.append(key, formValue[key].value);
            } else if (typeof formValue[key] === 'object' && formValue[key].hasOwnProperty('value') && formValue[key].hasOwnProperty('icon') && formValue[key].hasOwnProperty('description')) {
              const triSelectValue = formValue[key].value;
              params = params.append(key, triSelectValue);
            }
            else {
              params = params.append(key, formValue[key]?.value)
            }
          }
        }
      });
    }
    if (paginationSort) {
      // adding sort params
      paginationSort.sort?.getSortParams().forEach(s => {
        params = params.append('sort', s);
      })
      // adding pagination params
      console.log( paginationSort.pageDetail)
      params = params.append('page', paginationSort.pageDetail?.page);
      params = params.append('perPage', paginationSort.pageDetail?.perPage);
      
    }

    //params = formValue?.status ? params.append('status',formValue.status.value) : params;
    return params;
  }
  isDate(value: any): boolean {
    const digitRegex = /^\d+$/;
    return digitRegex.test(value) ? false : moment.isDate(value)
  }

}