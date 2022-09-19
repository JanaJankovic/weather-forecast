/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';
import { ForecastModel } from '../models/forecast.model';
import { SettingsModel } from '../models/settings.model';
import { WeatherModel } from '../models/weather.model';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Service handles state of imporant globally accessed varibales
 */
export class StateService {
  //Globally accesible variables
  private currentCity: CityModel;
  private favoriteCities: CityModel[] = [];
  private settings: SettingsModel;

  //Weather data
  private lastWeather: WeatherModel;
  private lastForecast: ForecastModel;

  constructor(private eventService: EventService) {}

  /**
   * Method returns settings saved in local storage
   * @returns SettingsModel | undefined
   */
  public getSettings(): SettingsModel {
    this.settings = JSON.parse(localStorage.getItem('settings'));
    return this.settings;
  }

  /**
   * Method saves settings to local storage and publishes event that change has happened
   */
  public setSettings(settings: SettingsModel) {
    if (settings !== undefined && settings !== null) {
      this.settings = settings;
      localStorage.setItem('settings', JSON.stringify(settings));
      this.eventService.publishSetting(this.settings);
    }
  }

  /**
   * Method returns saved city from localstorage
   * @returns CityModel | undefined
   */
  public getCurrentCity(): CityModel {
    this.currentCity = JSON.parse(localStorage.getItem('currentCity'));
    this.currentCity = this.currentCity !== null ? this.currentCity : undefined;
    return this.currentCity;
  }

  /**
   * Method saves city to local storage and publishes event that change has happened
   */
  public setCurrentCity(city: CityModel) {
    if (city !== undefined && city !== null) {
      this.currentCity = city;
      this.eventService.publishCity(city);
      localStorage.setItem('currentCity', JSON.stringify(city));
    }
  }

  /**
   * Method returns list of cities from local storage
   * @returns list of favorite cities
   */
  public getFavorites(): CityModel[] {
    this.favoriteCities = JSON.parse(localStorage.getItem('favorites'));
    this.favoriteCities =
      this.favoriteCities !== null ? this.favoriteCities : [];
    return this.favoriteCities;
  }

  /**
   * Method returns city with specific coordinates
   * @param lt latitude
   * @param ln longitude
   * @returns city
   */
  public getFavorite(lt: number, ln: number): CityModel {
    const fav = this.favoriteCities.filter((x) => x.lat === lt && x.lon === ln);
    return fav.length > 0 ? fav.length[0] : undefined;
  }

  /**
   * Method checks if city is already in the list of favorite cities
   * @param city city of interest
   * @returns boolean if city exitis in list
   */
  public cityExistsInFavorites(city: CityModel): boolean {
    if (
      city !== undefined &&
      city !== null &&
      this.favoriteCities !== undefined
    ) {
      return (
        this.favoriteCities.filter(
          (x) =>
            x.lat === city.lat &&
            x.lon === city.lon &&
            x.name === city.name &&
            x.country === city.country
        ).length > 0
      );
    }
    return false;
  }

  /**
   * Method adds city to the list of favorite cities if its already not there
   * Publishes the change
   * @param city new city
   */
  public addFavorite(city: CityModel) {
    if (!this.cityExistsInFavorites(city)) this.favoriteCities.push(city);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteCities));
    this.eventService.publishFavorites(this.favoriteCities);
  }

  /**
   * Method removes city from list of favorite cities if it already exists
   * @param city
   */
  public removeFavorite(city: CityModel) {
    if (this.cityExistsInFavorites(city))
      this.favoriteCities = this.favoriteCities.filter(
        (x) => x.lat !== city.lat && x.lon !== city.lon
      );
    localStorage.setItem('favorites', JSON.stringify(this.favoriteCities));
    this.eventService.publishFavorites(this.favoriteCities);
  }

  /**
   * Method returns last weather data from local storage
   * @returns weather
   */
  public getLastWeather(): WeatherModel {
    this.lastWeather = JSON.parse(localStorage.getItem('lastWeather'));
    this.lastWeather = this.lastWeather !== null ? this.lastWeather : undefined;
    return this.lastWeather;
  }

  /**
   * Method saves to local storage newly fetched data
   * @param weather new weather
   */
  public setLastWeather(weather: WeatherModel) {
    if (weather !== undefined && weather !== null) {
      this.lastWeather = weather;
      localStorage.setItem('lastWeather', JSON.stringify(this.lastWeather));
    }
  }

  /**
   * Method returns saved forecast from local storage
   * @returns old forecast
   */
  public getLastForecast(): ForecastModel {
    this.lastForecast = JSON.parse(localStorage.getItem('lastForecast'));
    this.lastForecast =
      this.lastForecast !== null ? this.lastForecast : undefined;
    return this.lastForecast;
  }

  /**
   * Method saves newly fecthed forecast to local storage
   * @param forecast new forecast
   */
  public setLastForecast(forecast: ForecastModel) {
    if (forecast !== undefined && forecast !== null) {
      this.lastForecast = forecast;
      localStorage.setItem('lastForecast', JSON.stringify(this.lastForecast));
    }
  }
}
