import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private citySubject = new Subject<CityModel>();

  constructor() { }

  public publishCity(data: CityModel) {
      this.citySubject.next(data);
  }

  public getCityObservable(): Subject<CityModel> {
      return this.citySubject;
  }
}
