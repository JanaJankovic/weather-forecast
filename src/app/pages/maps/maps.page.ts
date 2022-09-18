import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
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
  public currentCity: CityModel;
  public map: L.Map;
  public icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
  });
  public marker: L.Marker = undefined;
  public latlng;

  constructor(
    private stateService: StateService,
    private router: Router,
    private translateService: TranslateService,
    private networkService: NetworkService,
    private eventService: EventService,
    public loadingCtrl: LoadingController
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (event.target.classList.contains('originalClass')) {
      this.onPopupClick();
    }
  }

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

  public async onPopupClick() {
    await this.changeCurrentCity();
    this.router.navigate(['/home']);
  }

  public async changeCurrentCity(){
    const loading = this.loadingCtrl.create({spinner: 'crescent'});
    (await loading).present();
    const query: QueryModel = new QueryModel();
    query.lat = this.latlng.lat;
    query.lon = this.latlng.lng;

    const res = await this.networkService.getReverseGeoCity(query).toPromise();

    this.stateService.setCurrentCity({
      lat: this.latlng.lat,
      lon: this.latlng.lng,
      name: res !== undefined && res.length > 0 ? res[0].name : undefined,
      country: res !== undefined && res.length > 0 ? res[0].country : undefined,
    });
    (await loading).dismiss();
  }
}
