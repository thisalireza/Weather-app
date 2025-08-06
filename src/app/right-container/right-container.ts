import { Component } from '@angular/core';

@Component({
  selector: 'app-right-container',
  imports: [],
  templateUrl: './right-container.html',
  styleUrl: './right-container.css'
})
export class RightContainer {
  today:boolean = false;
  week:boolean = true;
  celsius:boolean = true;
  fahrenheit:boolean = false;

  onTodayClick(){
    this.today=true;
    this.week=false;
  }

  onWeekClick(){
    this.today=false;
    this.week=true;
  }

  onCelsiusClick(){
    this.celsius=true;
    this.fahrenheit=false;
  }

  onFahrenheitClick(){
    this.celsius=false;
    this.fahrenheit=true;
  }
}
