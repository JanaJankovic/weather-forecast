import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CityModel } from './models/city.model';
import { StateService } from './services/state.service';
import { Constants } from './global/constants';
import { PageModel } from './models/page.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: PageModel[] = Constants.appPages;
  public favorites: CityModel[] = [];
  public currentCity: CityModel;

  constructor(
    private translateService: TranslateService,
    private stateService: StateService
  ) {
    translateService.setDefaultLang('en');
    this.currentCity = stateService.currentCity;
    this.favorites = this.stateService.getFavorites();
  }
}
