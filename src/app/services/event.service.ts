import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CityModel } from '../models/city.model';
import { SettingsModel } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private citySubject = new Subject<CityModel>();
  private favoritesSubject = new Subject<CityModel[]>();
  private settingsSubject = new Subject<SettingsModel>();

  constructor() {}

  public publishCity(data: CityModel) {
    this.citySubject.next(data);
  }

  public getCityObservable(): Subject<CityModel> {
    return this.citySubject;
  }

  public publishFavorites(data: CityModel[]) {
    this.favoritesSubject.next(data);
  }

  public getFavoritesObservable(): Subject<CityModel[]> {
    return this.favoritesSubject;
  }

  public publishSetting(data: SettingsModel){
    this.settingsSubject.next(data);
  }

  public getSettingObservable(): Subject<SettingsModel> {
    return this.settingsSubject;
  }
}
