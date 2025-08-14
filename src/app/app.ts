import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RightContainer} from './right-container/right-container';
import {LeftContainer} from './left-container/left-container';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RightContainer, LeftContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WeatherApp');
}
