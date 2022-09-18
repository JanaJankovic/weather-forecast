import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/global/constants';
import { LanguageModel } from 'src/app/models/language.model';
import { SettingsModel } from 'src/app/models/settings.model';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  //Data from constants
  public langs: LanguageModel[] = Constants.langs;
  public units = Constants.units;

  //Data for updating
  public settings: SettingsModel;

  constructor(private stateService: StateService) {}

  /**
   * Gets saved settigns
   * In case of undefined set defaults
   */
  ngOnInit() {
    this.settings = this.stateService.getSettings();
    this.settings = this.settings !== undefined
        ? this.settings
        : { lang: 'en', unit: 'standard'};
  }

  /**
   * Saves updated settings to local storage
   * @param e
   */
  handleUpdate(e) {
    this.stateService.setSettings(this.settings);
  }
}
