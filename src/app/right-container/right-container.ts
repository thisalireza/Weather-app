import {Component, inject} from '@angular/core';
import {Weather} from '../services/weather';

@Component({
  selector: 'app-right-container',
  imports: [],
  templateUrl: './right-container.html',
  styleUrl: './right-container.css'
})
export class RightContainer {
public weather = inject(Weather);

  onTodayClick(){
    this.weather.today=true;
    this.weather.week=false;
  }

  onWeekClick(){
    this.weather.today=false;
    this.weather.week=true;
  }

  onCelsiusClick(){
    this.weather.celsius=true;
    this.weather.fahrenheit=false;
  }

  onFahrenheitClick(){
    this.weather.celsius=false;
    this.weather.fahrenheit=true;
  }
}
