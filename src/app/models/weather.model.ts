export class WeatherModel {
  coord: {
    lon: number;
    lat: number;
  };
  base: string;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
      ionic: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;

  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  dt: number;
  datetime: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  clouds: {
    all: number;
  };
  rain: object;
  snow: object;
}
