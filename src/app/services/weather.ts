import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {locationDetails} from '../interfaces/locationDetails';
import {weatherDetails} from '../interfaces/weatherDetails';
import {temperatureData} from '../interfaces/temperatureData';
import {todayData} from '../interfaces/todayData';
import {weekData} from '../interfaces/weekData';
import {todaysHighlight} from '../interfaces/todaysHighlight';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  locationDetails?: locationDetails;
  weatherDetails?: weatherDetails;
  temperatureData?: temperatureData;
  todayData?: todayData;
  weekData?: weekData;
  todaysHighlight?: todaysHighlight;

  cityName: string = 'Tehran';
  language: string = 'en-US';
  date:string = '20250814';
  units:string = 'm';

  private httpClient = inject(HttpClient);
  constructor() {
    this.getData();

  }


  getLocationDetails(cityName: string, language: string): Observable<locationDetails> {
    return this.httpClient.get<locationDetails>(environment.weatherApiLocationBaseURL, {
      headers: new HttpHeaders()
        .set(environment.xRapidApiKeyName, environment.xRapidApiKeyValue)
        .set(environment.xRapidApiHostName, environment.xRapidApiHostValue),
      params: new HttpParams()
        .set('query', cityName)
        .set('language', language)
    })
  }

  getWeatherReport(date: string, latitude: number, longitude: number, language: string, units: string): Observable<weatherDetails> {
    return this.httpClient.get<weatherDetails>(environment.weatherApiForecastBaseURL, {
      headers: new HttpHeaders()
        .set(environment.xRapidApiKeyName, environment.xRapidApiKeyValue)
        .set(environment.xRapidApiHostName, environment.xRapidApiHostValue),
      params: new HttpParams()
        .set('date', date)
        .set('latitude', latitude)
        .set('longitude', longitude)
        .set('language', language)
        .set('units', units)
    });
  }


  getData() {
    this.getLocationDetails(this.cityName, this.language).subscribe({
      next: (response) => {
        this.locationDetails = response;
        const latitude = this.locationDetails?.location.latitude[0];
        const longitude = this.locationDetails?.location.longitude[0];
        console.log(this.locationDetails);

        // ✅ Only call getWeatherReport after you have lat/lon
        this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
          next: (weatherResponse) => {
            this.weatherDetails = weatherResponse;
            console.log(this.weatherDetails);
          },
          error: (err) => {
            console.error('Error fetching weather:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching location:', err);
      }
    });
  }



  // getData() {
  //   let latitude ;
  //   let longitude;
  //
  //   this.getLocationDetails(this.cityName, this.language).subscribe({
  //     next: (response) => {
  //       this.locationDetails = response;
  //       latitude =this.locationDetails?.location.latitude[0];
  //       longitude =this.locationDetails?.location.longitude[0];
  //       console.log(this.locationDetails);
  //     },
  //
  //   });
  //
  //
  //
  //   this.getWeatherReport(this.date , latitude , longitude , this.language , this.units).subscribe({
  //     next: (response) => {
  //       this.weatherDetails = response;
  //       console.log(this.weatherDetails);
  //
  //     },
  //   });
  //
  // }
}
