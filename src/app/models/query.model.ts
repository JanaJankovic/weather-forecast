import { TempEnv } from 'temp.env';

/**
 * class used to create queries for all API calls
 */
export class QueryModel {
  lat: number;
  lon: number;
  units?: string;
  lang?: string;
  cnt?: number;

  /**
   * Method joins all propertieds into query for url
   * @returns query paramters for url
   */
  public getQueryUrl(apiType: string) {
    const urlSearchParams = new URLSearchParams();
    switch(apiType) {
      case 'weather':
      case 'forecast' :
        urlSearchParams.append('appid', TempEnv.apiKey);
        urlSearchParams.append('units', this.units !== undefined ? this.units : '');
        urlSearchParams.append('lang', this.lang !== undefined ? this.lang : '');
        break;
      case 'reverse':
        urlSearchParams.append('apiKey', TempEnv.reverseGeoApiKey);
        break;
    }

    urlSearchParams.append('lat', this.lat.toString());
    urlSearchParams.append('lon', this.lon.toString());

    return urlSearchParams.toString();
  }
}
