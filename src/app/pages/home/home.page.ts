import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QueryModel } from 'src/app/models/query.model';
import { NetworkService } from 'src/app/services/network.service';
import { StateService } from 'src/app/services/state.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { CityModel } from 'src/app/models/city.model';
import { WeatherModel } from 'src/app/models/weather.model';
import { ForecastModel } from 'src/app/models/forecast.model';
import { Utils } from 'src/app/global/utils';
import { LoadingController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { SettingsModel } from 'src/app/models/settings.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public currentCity: CityModel = undefined;
  public currentLocation: CityModel = undefined;
  public isInFavorites = false;

  public weather: WeatherModel = undefined;
  public forecast: ForecastModel = undefined;

  public settings: SettingsModel;

  constructor(
    private translateService: TranslateService,
    private networkService: NetworkService,
    private stateService: StateService,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public eventService: EventService
  ) {}

  ngOnInit() {
    this.weather = this.stateService.getLastWeather();
    this.forecast = this.stateService.getLastForecast();

    this.settings = this.stateService.getSettings();
    this.settings = this.settings !== undefined
        ? this.settings
        : { lang: 'en', unit: 'standard', darkTheme: false };

    this.loadData();

    this.eventService.getCityObservable().subscribe({
      next: (data) => {
        this.currentCity = data;
        this.getData();
      },
    });
  }

  public async loadData(){
    await this.setCurrentCity();
    await this.getData();
  }

  public async setCurrentCity() {
    this.currentCity = this.stateService.getCurrentCity();
    await this.getCurrentLocation();

    this.currentCity =
      this.currentCity !== undefined ? this.currentCity : this.currentLocation;
    this.stateService.setCurrentCity(this.currentCity);

    this.isInFavorites = this.stateService.cityExistsInFavorites(this.currentCity);
  }

  public async getCurrentLocation() {
    const loading = this.loadingCtrl.create({spinner: 'crescent'});
    (await loading).present();

    this.currentLocation = await this.geolocation
      .getCurrentPosition()
      .then(async (resp): Promise<CityModel> => {
        const query: QueryModel = new QueryModel();
        query.lat = resp.coords.latitude;
        query.lon = resp.coords.longitude;

        const res = await this.networkService
          .getReverseGeoCity(query)
          .toPromise();

        return {
          lat: resp.coords.latitude,
          lon: resp.coords.longitude,
          name: res !== undefined && res.length > 0 ? res[0].name : undefined,
          country: res !== undefined && res.length > 0 ? res[0].country : undefined,
        };
      })
      .catch((error) => {
        console.log('Error getting location', error);
        return undefined;
      });

      (await loading).dismiss();
  }

  public async getData(){
    const loading = this.loadingCtrl.create({spinner: 'crescent'});
    (await loading).present();

    const query: QueryModel = new QueryModel();
    query.lat = this.currentCity.lat;
    query.lon = this.currentCity.lon;

    if(this.settings !== undefined){
      query.units = this.settings.unit;
      query.lang = this.settings.lang;
    }

    this.weather = await this.networkService.getCurrentWeather(query).toPromise();
    this.weather.weather[0].ionic = Utils.getIonicIcon(this.weather.weather[0].icon);
    this.weather.datetime = Utils.toDatetimeString(this.weather.dt);
    this.stateService.setLastWeather(this.weather);

    this.forecast = await this.networkService.getForecast(query).toPromise();
    this.forecast.list.forEach(element => {
      element.weather[0].ionic = Utils.getIonicIcon(element.weather[0].icon);
      element.datetime = Utils.toDatetimeString(element.dt);
    });
    this.stateService.setLastForecast(this.forecast);

    (await loading).dismiss();
  }

  public updateWeather(obj){
    this.weather = obj;
  }

  public updateFavorites(){
    this.isInFavorites = this.stateService.cityExistsInFavorites(this.currentCity);
    if(this.isInFavorites === false){
      this.stateService.addFavorite(this.currentCity);
    }
    else{
      this.stateService.removeFavorite(this.currentCity);
    }
    this.isInFavorites = !this.isInFavorites;
  }


}
