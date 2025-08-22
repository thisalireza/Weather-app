import {Component, inject} from '@angular/core';
import {Weather} from '../services/weather';

@Component({
  selector: 'app-left-container',
  imports: [],
  templateUrl: './left-container.html',
  styleUrl: './left-container.css'
})
export class LeftContainer {
  public weather = inject(Weather)

  onSearch(location: string) {
    this.weather.cityName = location;
    this.weather.getData();
  }
}
