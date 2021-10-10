import {AfterViewInit, Component, Input} from '@angular/core';
import {UserModel} from '../../models/user.model';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() user: UserModel;


  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const userLocation = L.map('map', {
      center: [this.user.address.geo.lat, this.user.address.geo.lng],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(userLocation);
    const marker = new L.Marker([this.user.address.geo.lat, this.user.address.geo.lng]);
    userLocation.addLayer(marker);
    marker.bindPopup(`${this.user.name}`).openPopup();
  }
}
