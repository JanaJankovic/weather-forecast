import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NetworkService } from 'src/app/services/network.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public cities = [];
  public input = '';

  constructor(
    private networkService: NetworkService,
    private translateService: TranslateService,
    private stateService: StateService,
    private router: Router
  ) {}

  ngOnInit() {}

  public async getData() {
    this.cities = await this.networkService
      .getGeoCities(this.input)
      .toPromise();
  }

  public itemClicked(obj) {
    this.input = '';
    this.cities = [];

    this.stateService.currentCity.lat = obj.lat;
    this.stateService.currentCity.lon = obj.lon;
    this.stateService.currentCity.name = obj.name;

    this.router.navigate(['/home']);
  }
}