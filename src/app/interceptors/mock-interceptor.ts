import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { endpoints } from './mock-urls';

@Injectable()
export class MockDataInterceptor implements HttpInterceptor {
  private mockDataPath = "./assets/data/mock/";
  private endpoints = endpoints;

  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.toLowerCase();
    const isPaginated = req.params.has('page');
    const paramsObj = Object.fromEntries(req.params.keys().map(key => [key, req.params.get(key)]));
    const activeUrl = this.endpoints.find(item => url.includes(item.url));

    if (!activeUrl) {
      return next.handle(req);
    }

    const mockDataUrl = this.mockDataPath + activeUrl.filePath;
    return this.http.get<any>(mockDataUrl).pipe(
      delay(1000),
      mergeMap((mockData) => {
        const uniqueFieldValue = paramsObj[activeUrl.uniqueField] as string;
        const data = uniqueFieldValue ? this.getSingleItem(activeUrl.uniqueField, uniqueFieldValue, mockData) : isPaginated ? this.getPaginatedData(req, mockData) : mockData;
        return of(new HttpResponse({ status: 200, body: data }));
      }),
      catchError((error) => {
        console.error('Failed to read mock data file', error);
        return next.handle(req);
      })
    );
  }

  private getPaginatedData(req: HttpRequest<any>, data: any[]): any {
    const page = {
      number: Number(req.params.get('page') || 0),
      perPage: Number(req.params.get('perPage') || 10),
    };
 
    const start = page.number * page.perPage;
    const end = start + page.perPage;
    const pageData = data.slice(start, end);
    console.log(start,end)
    return {
      _embedded: {
        elements: pageData,
      },
      _links: {
        self: {
          href: '',
        },
      },
      page: {
        totalElements: data.length,
        totalPages: Math.ceil(data.length / page.perPage),
      },
    };
  }

  private getSingleItem(searchKey: string, value: string, data: any[]) {
    return data.find(item => item[searchKey] === value);
  }
}
