import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})


export class DetailPage {

    location: {
        lat:any,
        lon:any,
        name: any,
        weather: any
    };
    forecastWeather: object;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private weatherProvider: WeatherProvider,
        private storage: Storage,
        public alertCtrl: AlertController) {

        this.location = navParams.get('location');
        console.log(this.location);
  }

  ionViewDidLoad() {
    if(this.navCtrl.getPrevious().component.name === 'SearchPage') {
          this.weatherProvider.getWeather(this.location.lat, this.location.lon)
              .subscribe(responseData => {
                  this.location.weather = responseData;  
              });
      }
          
      this.getWeatherCurrentLocation();
  }

  addToFavorites() {
        this.storage.set(this.location.name, this.location).then((val) => { 
        let alert = this.alertCtrl.create({
          title: 'New favorite!',
          message: 'You have added the city ' + val.name,
          buttons: ['Ok']
        });
          alert.present();
      });
  }

  getWeatherCurrentLocation() {
    this.weatherProvider.getWeather(this.location.lat, this.location.lon, true)
    .subscribe(responseData => {
        this.forecastWeather = responseData;
    });
  }  
}
