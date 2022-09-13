import { PageModel } from '../models/page.model';
import { TempEnv } from 'temp.env';

export class Constants {
  public static appPages: PageModel[] = [
    { title: 'home', url: 'home', icon: 'home' },
    { title: 'search', url: 'search', icon: 'search' },
    { title: 'maps', url: 'maps', icon: 'location' },
    { title: 'favorites', url: 'favorites', icon: 'heart' },
    { title: 'settings', url: 'settings', icon: 'settings' },
  ];
}
