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
export class StateService {
  private currentCity: CityModel;
  private favoriteCities: CityModel[] = [];

  private settings: SettingsModel;

  private lastWeather: WeatherModel;
  private lastForecast: ForecastModel;

  constructor(private eventService: EventService) {}

  public getSettings(): SettingsModel{
    this.settings = JSON.parse(localStorage.getItem('settings'));
    this.settings = this.settings !== null ? this.settings : undefined;
    return this.settings;
  }

  public setSettings(settings: SettingsModel) {
    if(settings !== undefined && settings !== null) {
      this.settings = settings;
      localStorage.setItem('settings', JSON.stringify(settings));
      this.eventService.publishSetting(this.settings);
    }
  }

  public getCurrentCity(): CityModel {
    this.currentCity = JSON.parse(localStorage.getItem('currentCity'));
    this.currentCity = this.currentCity !== null ? this.currentCity : undefined;
    return this.currentCity;
  }

  public setCurrentCity(city: CityModel) {
    if(city !== undefined && city !== null) {
      this.currentCity = city;
      this.eventService.publishCity(city);
      localStorage.setItem('currentCity', JSON.stringify(city));
    }
  }

  public getFavorites(): CityModel[] {
    this.favoriteCities = JSON.parse(localStorage.getItem('favorites'));
    this.favoriteCities = this.favoriteCities !== null ? this.favoriteCities : [];
    return this.favoriteCities;
  }

  public getFavorite(lt: number, ln: number): CityModel {
    const fav = this.favoriteCities.filter((x) => x.lat === lt && x.lon === ln);
    return fav.length > 0 ? fav.length[0] : undefined;
  }

  public cityExistsInFavorites(city: CityModel): boolean {
    if (city !== undefined && city !== null && this.favoriteCities !== undefined) {
      return (
        this.favoriteCities.filter(
          (x) => x.lat === city.lat && x.lon === city.lon && x.name === city.name && x.country === city.country
        ).length > 0
      );
    }
    return false;
  }

  public addFavorite(city: CityModel) {
    if (!this.cityExistsInFavorites(city)) this.favoriteCities.push(city);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteCities));
    this.eventService.publishFavorites(this.favoriteCities);
  }

  public removeFavorite(city: CityModel) {
    if (this.cityExistsInFavorites(city))
      this.favoriteCities = this.favoriteCities.filter(
        (x) => x.lat !== city.lat && x.lon !== city.lon
      );
    localStorage.setItem('favorites', JSON.stringify(this.favoriteCities));
    this.eventService.publishFavorites(this.favoriteCities);
  }

  public getLastWeather(): WeatherModel {
    this.lastWeather = JSON.parse(localStorage.getItem('lastWeather'));
    this.lastWeather = this.lastWeather !== null ? this.lastWeather : undefined;
    return this.lastWeather;
  }

  public setLastWeather(weather: WeatherModel) {
    if(weather !== undefined && weather !== null) {
      this.lastWeather = weather;
      localStorage.setItem('lastWeather', JSON.stringify(this.lastWeather));
    }
  }

  public getLastForecast(): ForecastModel {
    this.lastForecast = JSON.parse(localStorage.getItem('lastForecast'));
    this.lastForecast = this.lastForecast !== null ? this.lastForecast : undefined;
    return this.lastForecast;
  }

  public setLastForecast(forecast: ForecastModel) {
    if(forecast !== undefined && forecast !== null) {
      this.lastForecast = forecast;
      localStorage.setItem('lastForecast', JSON.stringify(this.lastForecast));
    }
  }

}
