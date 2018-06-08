import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CityProvider } from '../../providers/city/city';    
import { DetailPage } from '../detail/detail'; 

@Component({
  templateUrl: 'search.html'
})

export class SearchPage {
  
  cities: any[];

  constructor(public navCtrl: NavController, private cityProvider: CityProvider) {

  }

  showDetail(event, city) {
      this.cityProvider.getCoordinates(city.description).subscribe(
          data => {
              this.navCtrl.push(DetailPage, 
                  { location :  
                      { lat: data.results[0].geometry.location.lat, 
                          lon: data.results[0].geometry.location.lng, 
                          name: city.description 
                      }
                  });
          });
      
  }

  searchCities(event, key) {
        if(event.target.value.length > 2) {
            this.cityProvider.getCities(event.target.value).subscribe(
                data => {
                    this.cities = data.predictions; 
                });
        }
    } 
}
