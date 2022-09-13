import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QueryModel } from 'src/app/models/query.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public data: any = undefined;

  constructor(
    private translateService: TranslateService,
    private networkService: NetworkService
  ) {}

  ngOnInit() {
    this.getData();
  }

  public async getData() {
    const test: QueryModel = new QueryModel();
    test.lat = 46.557;
    test.lon = 15.646;

    let data = await this.networkService.getCurrentWeather(test).toPromise();
    console.log(data);

    let data2 = await this.networkService.getForecast(test).toPromise();
    console.log(data2);
  }
}
