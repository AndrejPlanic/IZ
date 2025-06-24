import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})
export class Map implements AfterViewInit {
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([42.433308, 19.263968], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Define your custom icon
    const customIcon = L.icon({
      iconUrl: 'assets/images/logo-pin.png', // your custom marker image path
      iconSize: [38, 50], // size of the icon (adjust as needed)
      iconAnchor: [19, 50], // point of the icon which will correspond to marker's location (usually bottom middle)
      popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor // optional shadow image path (if you have one)
      shadowSize: [50, 64], // size of the shadow
      shadowAnchor: [19, 50], // anchor of the shadow
    });

    const label = L.divIcon({
      html: '<h3>Green Gear</h3>',
      className: '', // Important: removes default styles
      iconSize: [100, 20],
      iconAnchor: [40, 0], // Adjust this to place label near the marker
    });

    // Add marker with custom icon
    L.marker([42.433308, 19.263968], { icon: customIcon }).addTo(this.map);
    L.marker([42.433308, 19.263968], { icon: label }).addTo(this.map);

    this.map.panBy([0, -50]);
  }
}
