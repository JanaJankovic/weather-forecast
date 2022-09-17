import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import { relativeTimeThreshold } from 'moment';
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

  constructor(
    private stateService: StateService,
    private router: Router,
    private translateService: TranslateService,
    private networkService: NetworkService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.currentCity = this.stateService.getCurrentCity();
    if (this.currentCity === undefined) {this.router.navigate(['/home']);}

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
    this.marker.on('click', (e) => this.onMarkerClick(e));
  }

  public onMapClick(e) {
    console.log(e.latlng);

    if (this.marker) {
      this.marker.remove();
    }

    this.marker = new L.Marker(e.latlng, { icon: this.icon }).addTo(this.map);
    this.marker.addTo(this.map);

    L.popup({ offset: new L.Point(0, -41), closeButton: false })
      .setLatLng(e.latlng)
      .setContent('<p>Click for forecast</p>')
      .openOn(this.map)
      .on('click', async () => {
        const query: QueryModel = new QueryModel();
        query.lat = e.latlng.lat;
        query.lon = e.latlng.lng;

        const res = await this.networkService
          .getReverseGeoCity(query)
          .toPromise();
        this.stateService.setCurrentCity({
          lat: e.latlng.lat,
          lon: e.latlng.lng,
          name: res !== undefined && res.length > 0 ? res[0].name : undefined,
          country:
            res !== undefined && res.length > 0 ? res[0].country : undefined,
        });
        this.router.navigate(['/home']);
      });
  }

  public onMarkerClick(e){
    console.log(e.target);
  }
}
