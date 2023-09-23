import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiBetoch } from '../enums/api.enum';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private http: HttpClient) { }

  getHouses(){
    return this.http.get<any>(environment.url + ApiBetoch.AllHouses)
  }
}
