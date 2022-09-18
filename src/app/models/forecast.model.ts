/**
 * Model made after API response for easier coding
 */
export class ForecastModel{
  cod: string;
  message: string;
  cnt: number;
  list: [
    {
      dt: number;
      datetime: string;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
          ionic: string;
        }
      ];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      pop: number;
      rain: object;
      sys: {
        pod: string;
      };
      dt_txt: string;
    }
  ];
}
