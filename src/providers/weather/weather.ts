import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  APIKey = '575cf8ebf4a29917e426e3fd238f715d';
  url = 'http://api.openweathermap.org/data/2.5/';

  constructor(public http: HttpClient) {}

  getWeather(lat: string, log: string, forecast: boolean = false): Observable<any> {
    let requestUrl = (forecast) ? this.url + 'forecast' : this.url + 'weather';

    let params = new HttpParams();
    params = params.set('APPID', this.APIKey);
    params = params.set('units', 'metric');
    params = params.set('lat', lat);
    params = params.set('lon', log);
    
    return this.http.get(requestUrl, {params});
  }
}
