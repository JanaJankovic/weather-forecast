import { PageModel } from '../models/page.model';
import { LanguageModel } from '../models/language.model';

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
}
