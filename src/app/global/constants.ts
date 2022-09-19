import { PageModel } from '../models/page.model';
import { LanguageModel } from '../models/language.model';
import { CityModel } from '../models/city.model';
import { SettingsModel } from '../models/settings.model';

/**
 * All global constants used in code
 * Only variables that are static and don't change like pages, units and languages
 */
export class Constants {
  public static appPages: PageModel[] = [
    { title: 'home', url: 'home', icon: 'home' },
    { title: 'search', url: 'search', icon: 'search' },
    { title: 'maps', url: 'maps', icon: 'map' },
    { title: 'settings', url: 'settings', icon: 'settings' },
  ];

  public static units = ['standard', 'metric', 'imperial'];

  public static langs: LanguageModel[] = [
    { code: 'en', label: 'English' },
    { code: 'sl', label: 'Slovenščina' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutch' },
  ];

  public static defaultLocation: CityModel = {
    name: 'Maribor',
    country: 'SI',
    lat: 46.5547222,
    lon: 15.6466667
  }

  public static defaultSettings: SettingsModel = {
    lang: 'en',
    unit: 'standard'
  }
}
