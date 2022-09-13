/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public currentCity: CityModel;

  private favoriteCities: CityModel[] = [];

  constructor() {}

  public getFavorites(): CityModel[] {
    return this.favoriteCities;
  }

  public getFavorite(lt: number, ln: number): CityModel {
    const fav = this.favoriteCities.filter((x) => x.lat === lt && x.lon === ln);
    return fav.length > 0 ? fav.length[0] : undefined;
  }

  public cityExistsInFavorites(city: CityModel): boolean {
    if (city !== undefined && city !== null) {
      return (
        this.favoriteCities.filter(
          (x) => x.lat === city.lat && x.lon === city.lon
        ).length > 0
      );
    }
    return false;
  }

  public addFavorite(city: CityModel) {
    if (!this.cityExistsInFavorites(city)) this.favoriteCities.push(city);
  }

  public removeFavorite(city: CityModel) {
    if (this.cityExistsInFavorites(city))
      this.favoriteCities = this.favoriteCities.filter(
        (x) => x.lat !== city.lat && x.lon !== city.lon
      );
  }
}
