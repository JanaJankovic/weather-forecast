import { Component, HostListener, OnInit } from '@angular/core';
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
import { Constants } from 'src/app/global/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //Data for querying API
  public currentCity: CityModel = undefined;
  public currentLocation: CityModel = undefined;

  //State of button
  public isInFavorites = false;

  //Data for displaying
  public weather: WeatherModel = undefined;
  public forecast: ForecastModel = undefined;

  public settings: SettingsModel;

  //Alignment of data for forecast item
  public smallIconAlignment = window.innerWidth < 400 ? 'start' : 'end';

  constructor(
    private translateService: TranslateService,
    private networkService: NetworkService,
    private stateService: StateService,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public eventService: EventService
  ) {}

  /**
   * Changes alignment of data based on screen size
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.smallIconAlignment = event.target.innerWidth < 400 ? 'start' : 'end';
  }

  /**
   * Loads data from local storage and afterwards fetches fresh data
   * Subscribed for change of city for appropriate update of data
   */
  ngOnInit() {
    this.weather = this.stateService.getLastWeather();
    this.forecast = this.stateService.getLastForecast();

    this.settings = this.stateService.getSettings();
    this.settings =
      this.settings !== undefined
        ? this.settings
        : { lang: 'en', unit: 'standard' };

    this.loadData();

    this.eventService.getCityObservable().subscribe({
      next: (data) => {
        this.currentCity = data;
        this.isInFavorites = this.stateService.cityExistsInFavorites(
          this.currentCity
        );
        this.getData();
      },
    });
  }

  public async loadData() {
    await this.setCurrentCity();
    await this.getData();
  }

  /**
   * Function set current city based on data saved in local storage
   * Or current location
   */
  public async setCurrentCity() {
    this.currentCity = this.stateService.getCurrentCity();
    await this.getCurrentLocation();

    this.currentCity =
      this.currentCity !== undefined ? this.currentCity : this.currentLocation;
    this.stateService.setCurrentCity(this.currentCity);

    this.isInFavorites = this.stateService.cityExistsInFavorites(
      this.currentCity
    );
  }

  /**
   * Gets coordinates of current location
   * By reverse geocoding gets name of city and country
   */
  public async getCurrentLocation() {
    const loading = this.loadingCtrl.create({ spinner: 'crescent' });
    (await loading).present();

    this.currentLocation = await this.geolocation
      .getCurrentPosition()
      .then(async (resp): Promise<CityModel> => {
        const query: QueryModel = new QueryModel();
        query.lat = resp.coords.latitude;
        query.lon = resp.coords.longitude;

        const res = await this.networkService.getReverseGeoCity(query).toPromise();

        if (res === undefined) {
          return Constants.defaultLocation;
        }

        const n = res.features[0].properties.city;
        const c = res.features[0].properties.country.toUpperCase();

        return {
          lat: resp.coords.latitude,
          lon: resp.coords.longitude,
          name: n,
          country: c,
        };
      })
      .catch((error) => {
        console.log('Error getting location', error);
        return Constants.defaultLocation;
      });

    (await loading).dismiss();
  }

  /**
   * Based on geo coordinates makes request for weather and forecast
   * Uses Utility functions to modify data
   * Saves data to local storage
   */
  public async getData() {
    const loading = this.loadingCtrl.create({ spinner: 'crescent' });
    (await loading).present();

    const query: QueryModel = new QueryModel();
    query.lat = this.currentCity.lat;
    query.lon = this.currentCity.lon;

    if (this.settings !== undefined) {
      query.units = this.settings.unit;
      query.lang = this.settings.lang;
    }

    this.weather = await this.networkService
      .getCurrentWeather(query)
      .toPromise();
    this.weather.weather[0].ionic = Utils.getIonicIcon(
      this.weather.weather[0].icon
    );
    this.weather.datetime = Utils.toDatetimeString(
      this.weather.dt,
      this.settings.lang
    );
    this.stateService.setLastWeather(this.weather);

    this.forecast = await this.networkService.getForecast(query).toPromise();
    this.forecast.list.forEach((element) => {
      element.weather[0].ionic = Utils.getIonicIcon(element.weather[0].icon);
      element.datetime = Utils.toDatetimeShortString(
        element.dt,
        this.settings.lang
      );
    });
    this.stateService.setLastForecast(this.forecast);

    (await loading).dismiss();
  }

  /**
   * Updates Weather details based on selected date
   * @param obj weather data of selected date
   */
  public onItemListClick(obj) {
    this.weather = obj;
    if (window.innerWidth < 500) {
      document.querySelector('ion-content').scrollToPoint(0, 100);
    }
  }

  /**
   * Adds or removes current city for list of favorite cities
   * Updates state of button required for the right icon
   */
  public onFavoritesBtnClick() {
    this.isInFavorites = this.stateService.cityExistsInFavorites(
      this.currentCity
    );
    if (this.isInFavorites === false) {
      this.stateService.addFavorite(this.currentCity);
    } else {
      this.stateService.removeFavorite(this.currentCity);
    }
    this.isInFavorites = !this.isInFavorites;
  }
}
