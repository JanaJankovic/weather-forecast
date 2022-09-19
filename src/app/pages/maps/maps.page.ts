import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import { Constants } from 'src/app/global/constants';
import { CityModel } from 'src/app/models/city.model';
import { QueryModel } from 'src/app/models/query.model';
import { EventService } from 'src/app/services/event.service';
import { NetworkService } from 'src/app/services/network.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  //Data for loading coordinates
  public currentCity: CityModel;

  //Data for loading map
  public map: L.Map;
  public icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
  });
  public marker: L.Marker = undefined;

  //Publicly scoped cooridnates for current city update
  public latlng;

  constructor(
    private stateService: StateService,
    private router: Router,
    private translateService: TranslateService,
    private networkService: NetworkService,
    private eventService: EventService,
    public loadingCtrl: LoadingController
  ) {}

  /**
   * Function listens for the event where click occured inside
   * Of marker popup content which allows for redirtection to
   * Home page and updating of the current city
   * @param event click event
   */
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (event.target.classList.contains('originalClass')) {
      this.onPopupClick();
    }
  }

  /**
   * Gets current city or redirects to home page where if city is undefined
   * Function that gets current location will be triggered
   * Subscribes for city update so that map will be refreshed
   * Ceneters map by coordinates of the current city
   * Adds tiled layers
   * Because of wrong loading on bigger screens, timeout makes sure map laods correctly
   * Adds marker to map
   * Listents to mouse click events for changing position of the marker
   */
  ngOnInit() {
    this.currentCity = this.stateService.getCurrentCity();
    if (this.currentCity === undefined) {
      this.router.navigate(['/home']);
    }

    this.eventService.getCityObservable().subscribe({
      next: (data) => {
        this.currentCity = data;
      },
    });

    this.map = L.map('map', {
      center: [this.currentCity.lat, this.currentCity.lon],
      zoom: 15,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 1000);

    this.marker = L.marker([this.currentCity.lat, this.currentCity.lon], {
      icon: this.icon,
    });
    this.marker.addTo(this.map);

    this.map.on('click', (e) => this.onMapClick(e));
  }

  /**
   * Removes old marker and adds new marker
   * Shows popup for redicretion to home page
   * @param e coordinates of clicked point on map
   */
  public onMapClick(e) {
    this.latlng = e.latlng;

    if (this.marker) {
      this.marker.remove();
    }

    this.marker = new L.Marker(e.latlng, { icon: this.icon }).addTo(this.map);
    this.marker.addTo(this.map);

    L.popup({ offset: new L.Point(0, -41), closeButton: false })
      .setLatLng(e.latlng)
      .setContent(
        `<p class="originalClass"
        style="padding: 20px 0px 20px 0px; cursor: pointer">` +
          this.translateService.instant('clickForecast') +
          `</p>`
      )
      .openOn(this.map);
  }

  /**
   * On popup clicked changes city and navigates to home
   */
  public async onPopupClick() {
    await this.changeCurrentCity();
    this.router.navigate(['/home']);
  }

  /**
   * Updates current cities coordinates
   * By reverse geocoding gets name and country of the city
   * Saves city to local storage
   */
  public async changeCurrentCity() {
    const loading = this.loadingCtrl.create({ spinner: 'crescent' });
    (await loading).present();
    const query: QueryModel = new QueryModel();
    query.lat = this.latlng.lat;
    query.lon = this.latlng.lng;

    const res = await this.networkService.getReverseGeoCity(query).toPromise();

    if (res === undefined) {
      return Constants.defaultLocation;
    }

    const n = res.features[0].properties.city;
    const c = res.features[0].properties.country_code.toUpperCase();

    this.stateService.setCurrentCity({
      lat: this.latlng.lat,
      lon: this.latlng.lng,
      name: n,
      country: c,
    });
    (await loading).dismiss();
  }
}
