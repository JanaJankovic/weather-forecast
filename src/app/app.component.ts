import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CityModel } from './models/city.model';
import { StateService } from './services/state.service';
import { Constants } from './global/constants';
import { PageModel } from './models/page.model';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages: PageModel[] = Constants.appPages;
  public favorites: CityModel[] = [];
  public currentCity: CityModel;

  constructor(
    private translateService: TranslateService,
    private stateService: StateService,
    private eventService: EventService
  ) {}


  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.currentCity = this.stateService.getCurrentCity();
    this.favorites = this.stateService.getFavorites();

    this.eventService.getCityObservable().subscribe({
      next: (data) => { this.currentCity = data; },
    });
  }
}
