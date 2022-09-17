import { TempEnv } from 'temp.env';

export class QueryModel {
  lat: number;
  lon: number;
  units?: string;
  lang?: string;
  cnt?: number;

  public getQueryUrl() {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('appid', TempEnv.apiKey);
    urlSearchParams.append('lat', this.lat.toString());
    urlSearchParams.append('lon', this.lon.toString());
    urlSearchParams.append('units', this.units !== undefined ? this.units : '');
    urlSearchParams.append('lang', this.lang !== undefined ? this.lang : '');
    urlSearchParams.append(
      'cnt',
      this.cnt !== undefined ? this.cnt.toString() : ''
    );

    return urlSearchParams.toString();
  }
}
