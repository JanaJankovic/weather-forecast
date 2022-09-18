import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CityModel } from '../models/city.model';
import { SettingsModel } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})

/**
 * Service used to emit events of changed properties that affect correct display of data
 */
export class EventService {
  //Change of current city
  private citySubject = new Subject<CityModel>();
  //Change of favorite cities
  private favoritesSubject = new Subject<CityModel[]>();
  //Change of app settings
  private settingsSubject = new Subject<SettingsModel>();

  constructor() {}
  /**
   * Method emits change of current city
   * @param data new city
   */
  public publishCity(data: CityModel) {
    this.citySubject.next(data);
  }

  /**
   * Method used to subscribe for changes of current city
   * @returns object for subscrition
   */
  public getCityObservable(): Subject<CityModel> {
    return this.citySubject;
  }

  /**
   * Method emits change of favorite city list
   * @param data new city list
   */
  public publishFavorites(data: CityModel[]) {
    this.favoritesSubject.next(data);
  }

  /**
   * Method used to subscribe for changes of favorite cities list
   * @returns object for subscrition
   */
  public getFavoritesObservable(): Subject<CityModel[]> {
    return this.favoritesSubject;
  }

  /**
   * Method emits change of app settings
   * @param data new city list
   */
  public publishSetting(data: SettingsModel) {
    this.settingsSubject.next(data);
  }

  /**
   * Method used to subscribe for changes of apps settings
   * @returns object for subscrition
   */
  public getSettingObservable(): Subject<SettingsModel> {
    return this.settingsSubject;
  }
}
