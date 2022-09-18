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
  public langs: LanguageModel[] = Constants.langs;
  public units = Constants.units;
  public settings: SettingsModel;

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.settings = this.stateService.getSettings();
    this.settings = this.settings !== undefined
        ? this.settings
        : { lang: 'en', unit: 'standard'};
  }

  handleUpdate(e) {
    this.stateService.setSettings(this.settings);
  }
}
