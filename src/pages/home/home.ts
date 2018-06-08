import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentLocation: {
    lat: any, 
    lon: any,
  };

   currentWeather: object;  
   favoriteLocations: any[];

    constructor(public navCtrl: NavController,
        private weatherProvider: WeatherProvider,
        private storage: Storage) {
    
    }

  ionViewWillEnter(){
    window.navigator.geolocation.
          getCurrentPosition((position) => { 
              this.currentLocation = {
                  lat: position.coords.latitude, 
                  lon: position.coords.longitude  
              };
              
              this.getWeatherCurrentLocation();
          });

    this.getFavorites();  

  }
  
    getFavorites() {

      this.favoriteLocations = [];
      this.storage.forEach((value,key) => {
          if( (Date.now() - value.weather.dt * 1000) > 3600000 ){
             this.weatherProvider.getWeather(value.lat, value.lon)
                    .subscribe(newData => {
                        this.favoriteLocations.push({ name: key, weather: newData }); 
                        value.weather = newData;
                        this.storage.set(key, value);
                    });
              
          } else {
            this.favoriteLocations.push(value); 
          };
      });
  }

  getWeatherCurrentLocation() {

    this.weatherProvider.getWeather(this.currentLocation.lat, this.currentLocation.lon)
    .subscribe(responseData => {
        this.currentWeather = responseData;
    });
  }  

  showDetail(event, weather, location) {
      console.log(location);
      this.navCtrl.push(DetailPage, 
          { location : 
              { lat: weather.coord.lat, 
                lon: weather.coord.lon, 
                name: location,
                weather: weather
              }
          });
  }
}
