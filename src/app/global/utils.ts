const moment = require('moment');

export class Utils {
  public static getIonicIcon(id: string): string {
    switch(id){
      case '01d':
        return 'sunny-outline';
      case '01n':
        return 'moon-outline';
      case '02d':
        return 'partly-sunny-outline';
      case '02n':
        return 'cloudy-night-outline';
      case '03d':
        return 'cloud-outline';
      case '03n':
        return 'cloud-outline';
      case '04d':
        return 'cloud-outline';
      case '04n':
        return 'cloud-outline';
      case '09d':
        return 'umbrella-outline';
      case '09n':
        return 'umbrella-outline';
      case '10d':
        return 'rainy-outline';
      case '10n':
        return 'rainy-outline';
      case '11d':
        return 'thunderstorm-outline';
      case '11n':
        return 'thunderstorm-outline';
      case '13d':
        return 'snow-outline';
      case '13n':
        return 'snow-outline';
      case '50d':
        return 'filter-outline';
      case '50n':
        return 'filter-outline';

    }
    return 'help-circle-outline';
  }

  public static toDatetimeString(dt: number, lang: string): string{
    moment.locale(lang);
    return moment(dt * 1000).format('dddd, DD.MM.YYYY HH:mm');
  }

  public static toDatetimeShortString(dt: number, lang: string): string{
    moment.locale(lang);
    return moment(dt * 1000).format('dddd HH:mm');
  }
}
