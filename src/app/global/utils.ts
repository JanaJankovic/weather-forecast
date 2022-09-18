const moment = require('moment');

/**
 * Utility functions to handle simple data manipulation
 */

export class Utils {
  /**
   * Function returns ionic icon based on suggestion icon recevied from API
   * @param id icon property of weather.main
   * @returns ionic icon
   */
  public static getIonicIcon(id: string): string {
    switch (id) {
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

  /**
   * Function gets unix timestamp and returns formated date in longer version
   * @param dt unix calculated time
   * @param lang desired locale
   * @returns formated date
   */
  public static toDatetimeString(dt: number, lang: string): string {
    moment.locale(lang);
    return moment(dt * 1000).format('dddd, DD.MM.YYYY HH:mm');
  }

  /**
   * Function gets unix timestamp and returns shorter formatted date
   * @param dt unix calculated time
   * @param lang desired locale
   * @returns formated date
   */
  public static toDatetimeShortString(dt: number, lang: string): string {
    moment.locale(lang);
    return moment(dt * 1000).format('dddd HH:mm');
  }
}
