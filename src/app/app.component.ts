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
  public appPages: PageModel[] = Constants.appPages;
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


  ngOnInit() {
    let lang = this.stateService.getSettings().lang;
    lang = lang === undefined ? 'en' : lang;
    this.translateService.setDefaultLang(lang);

    this.currentCity = this.stateService.getCurrentCity();
    this.favorites = this.stateService.getFavorites();
    this.settings = this.stateService.getSettings();

    this.eventService.getCityObservable().subscribe({
      next: (data) => { this.currentCity = data; },
    });

    this.eventService.getFavoritesObservable().subscribe({
      next: (data) => { this.favorites = data; },
    });

    this.eventService.getSettingObservable().subscribe({
      next: (data) => {
        this.translateService.use(data.lang);
       },
    });
  }

  public onFavClick(city: CityModel) {
    this.menu.close('main-menu');
    this.stateService.setCurrentCity(city);
    this.router.navigate(['/home']);
  }
}
