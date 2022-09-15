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


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public currentCity: CityModel = undefined;
  public currentLocation: CityModel = undefined;

  public weather: WeatherModel = undefined;
  public forecast: ForecastModel = undefined;

  constructor(
    private translateService: TranslateService,
    private networkService: NetworkService,
    private stateService: StateService,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.currentCity = this.stateService.getCurrentCity();
    this.getData();
  }

  public async getData() {
    let loading = this.loadingCtrl.create({spinner: 'crescent'});
    (await loading).present();

    await this.getCurrentLocation();

    this.currentCity =
      this.currentCity !== undefined ? this.currentCity : this.currentLocation;
    this.stateService.setCurrentCity(this.currentCity);

    const query: QueryModel = new QueryModel();
    query.lat = this.currentCity.lat;
    query.lon = this.currentCity.lon;

    this.weather = await this.networkService.getCurrentWeather(query).toPromise();
    this.weather.weather[0].ionic = Utils.getIonicIcon(this.weather.weather[0].icon);
    this.weather.datetime = Utils.toDatetimeString(this.weather.dt);

    this.forecast = await this.networkService.getForecast(query).toPromise();
    this.forecast.list.forEach(element => {
      element.weather[0].ionic = Utils.getIonicIcon(element.weather[0].icon);
      element.datetime = Utils.toDatetimeString(element.dt);
    });

    (await loading).dismiss();
  }

  public async getCurrentLocation() {
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
  }
}
