import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CityModel } from './models/city.model';
import { StateService } from './services/state.service';
import { Constants } from './global/constants';
import { PageModel } from './models/page.model';
import { EventService } from './services/event.service';
import { Router } from '@angular/router';
import { SettingsModel } from './models/settings.model';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  //Global static object
  public appPages: PageModel[] = Constants.appPages;

  //Global dynamic objects
  public favorites: CityModel[] = [];
  public currentCity: CityModel;
  public settings: SettingsModel;

  constructor(
    private translateService: TranslateService,
    private stateService: StateService,
    private eventService: EventService,
    private router: Router,
    private menu: MenuController
  ) {}

  /**
   * Loads language from settings or set it to english in case no language is preferred
   * Loads all dynamic objects
   * Subscribes for changes of global objects
   * Translates change of language in case of such an event
   */
  ngOnInit() {
    this.translateService.setDefaultLang('en');

    this.currentCity = this.stateService.getCurrentCity();
    this.favorites = this.stateService.getFavorites();
    this.settings = this.stateService.getSettings();

    if(this.settings === null || this.settings === undefined) {
      this.settings = Constants.defaultSettings;
      this.stateService.setSettings(this.settings);
    }

    this.eventService.getCityObservable().subscribe({
      next: (data) => {
        this.currentCity = data;
      },
    });

    this.eventService.getFavoritesObservable().subscribe({
      next: (data) => {
        this.favorites = data;
      },
    });

    this.eventService.getSettingObservable().subscribe({
      next: (data) => {
        this.translateService.use(data.lang);
      },
    });
  }

  /**
   * On clicked favorite city, current city changes and user is redirected to home page
   * @param city
   */
  public onFavClick(city: CityModel) {
    this.menu.close('main-menu');
    this.stateService.setCurrentCity(city);
    this.router.navigate(['/home']);
  }
}
