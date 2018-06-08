import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the CityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CityProvider {
    
  APIKey = 'AIzaSyAifzE8QLAIXg1PIsAJretRCDPOShvg4fw'; 
  url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  coordinatesUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

  constructor(public http: HttpClient) {
  }

    getCities(cityName: string): Observable<any> {
      let params = new HttpParams();
      params = params.set('key', this.APIKey);
      params = params.set('input', cityName);
      params = params.set('types', 'geocode');

      return this.http.get(this.url, {params});
    }

    getCoordinates(cityName: string): Observable<any> {
      let params = new HttpParams();
      params = params.set('key', this.APIKey);
      params = params.set('query', cityName);

      return this.http.get(this.coordinatesUrl, {params});

    }

}
