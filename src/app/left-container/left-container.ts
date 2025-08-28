import { Component, inject } from '@angular/core';
import { Weather } from '../services/weather';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-left-container',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './left-container.html',
  styleUrl: './left-container.css'
})
export class LeftContainer {
  public weather = inject(Weather);
  searchQuery: string = '';
  suggestions: string[] = [];
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.weather.getCitySuggestions(query))
    ).subscribe({
      next: (res) => {
        // ✅ FIXED: Extract city names correctly
        this.suggestions = res?.location?.city ?? [];
      },
      error: (err) => {
        console.error('Error fetching suggestions:', err);
        this.suggestions = [];
      }
    });
  }

  onSearchChange() {
    if (this.searchQuery.trim().length > 1) {
      this.searchSubject.next(this.searchQuery);
    } else {
      this.suggestions = [];
    }
  }

  selectCity(city: string) {
    this.searchQuery = city;
    this.suggestions = [];
    this.onSearch(city);
  }

  onSearch(location: string) {
    this.weather.cityName = location;
    this.weather.getData();
  }
}
