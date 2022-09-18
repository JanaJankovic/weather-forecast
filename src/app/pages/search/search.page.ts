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
  //Input string
  public input = '';

  //Received cities
  public cities = [];

  constructor(
    private networkService: NetworkService,
    private translateService: TranslateService,
    private stateService: StateService,
    private router: Router
  ) {}

  ngOnInit() {}

  /**
   * Function requests list of cities based on input string
   */
  public async getData() {
    this.cities = await this.networkService
      .getGeoCities(this.input)
      .toPromise();
  }

  /**
   * Updates current city and redirects to home page
   * @param obj clicked city item
   */
  public itemClicked(obj) {
    this.input = '';
    this.cities = [];

    this.stateService.setCurrentCity({
      lat : obj.latitude,
      lon: obj.longitude,
      name: obj.name,
      country: obj.country
    });

    this.router.navigate(['/home']);
  }
}
