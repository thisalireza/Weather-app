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
  today: boolean = false;
  week: boolean = true;
  celsius: boolean = true;
  fahrenheit: boolean = false;

  locationDetails?: locationDetails;
  weatherDetails?: weatherDetails;
  temperatureData: temperatureData = new temperatureData();
  todayData: todayData[] = [];
  weekData: weekData[] = [];
  todaysHighlight: todaysHighlight;
  currentTime: Date;

  cityName: string = 'liverpool';
  language: string = 'en-US';
  date: string = '20250814';
  units: string = 'm';

  private httpClient = inject(HttpClient);

  constructor() {
    this.getData();
  }


  getSummaryImage(summary: string): string {
    //base folder address containing the images
    let baseAddress = 'images/Weather-Icons/';


    //respective image name
    let cloudySunny = 'imgi_71_partly-cloudy-day.svg';
    let rainySunny = 'imgi_72_partly-cloudy-day-drizzle.svg';
    let windy = 'imgi_86_wind.svg';
    let sunny = 'imgi_123_clear-day.svg';
    let rainy = 'imgi_68_rain.svg';

    if (String(summary).includes('Partly Cloudy') || String(summary).includes('P Cloudy')) return baseAddress + cloudySunny;
    else if (String(summary).includes('Partly Rainy') || String(summary).includes('P Rainy')) return baseAddress + rainySunny;
    else if (String(summary).includes('wind')) return baseAddress + windy;
    else if (String(summary).includes('rain')) return baseAddress + rainy;
    else if (String(summary).includes('sun')) return baseAddress + sunny;


    return baseAddress + cloudySunny;
  }


  fillTemperatureDataModel() {
    this.currentTime = new Date();
    this.temperatureData.day = this.weatherDetails['v3-wx-observations-current'].dayOfWeek;
    this.temperatureData.temperature = this.weatherDetails['v3-wx-observations-current'].temperature;
    this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(2, '0')}:${String(this.currentTime.getMinutes()).padStart(2, '0')}`;
    this.temperatureData.location = `${this.locationDetails.location.city[0]}, ${this.locationDetails.location.country[0]}`;
    this.temperatureData.rainPercent = this.weatherDetails['v3-wx-observations-current'].precip24Hour;
    this.temperatureData.summaryPhrase = this.weatherDetails['v3-wx-observations-current'].wxPhraseLong;
    this.temperatureData.summaryImage = this.getSummaryImage(this.temperatureData.summaryPhrase)
  }

  fillWeekData() {
    let weekCount = 0;
    while (weekCount < 7) {
      this.weekData.push(new weekData());
      this.weekData[weekCount].day = this.weatherDetails['v3-wx-forecast-daily-15day'].dayOfWeek[weekCount].slice(0.3);
      this.weekData[weekCount].tempMax = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMax[weekCount];
      this.weekData[weekCount].tempMin = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMin[weekCount];
      this.weekData[weekCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-daily-15day'].narrative[weekCount]);
      weekCount++;
    }
  }

  prepareData(): void {
    this.fillTemperatureDataModel();
    this.fillWeekData();
    this.fillTodayData()
    this.fillTodayHighlight();
  }

  celsiusToFahrenheit(celsius: number): number {
    return +((celsius * 1.8) + 32).toFixed(2);
  }

  fahrenheitToCelsius(fahrenheit: number): number {
    return +((fahrenheit - 32) * 0.555).toFixed(2);
  }


  getTimeFormString(localTime: string) {
    return localTime.slice(11, 16);
  }

  fillTodayData(): void {
    let todayCount = 0;
    while (todayCount < 7) {
      this.todayData.push(new todayData());
      this.todayData[todayCount].time = this.weatherDetails['v3-wx-forecast-hourly-10day'].validTimeLocal[todayCount].slice(11.16);
      this.todayData[todayCount].temperature = this.weatherDetails['v3-wx-forecast-hourly-10day'].temperature[todayCount];
      this.todayData[todayCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-hourly-10day'].wxPhraseShort[todayCount]);
      todayCount++;
    }
  }

  fillTodayHighlight() {
    this.todaysHighlight.airQuality = this.weatherDetails['v3-wx-globalAirQuality'].globalairquality.airQualityIndex;
    this.todaysHighlight.humidity = this.weatherDetails['v3-wx-observations-current'].relativeHumidity;
    this.todaysHighlight.sunrise = this.getTimeFormString(this.weatherDetails['v3-wx-observations-current'].sunriseTimeLocal);
    this.todaysHighlight.sunset = this.getTimeFormString(this.weatherDetails['v3-wx-observations-current'].sunsetTimeLocal);
    this.todaysHighlight.uvIndex = this.weatherDetails['v3-wx-observations-current'].uvIndex;
    this.todaysHighlight.visibility = this.weatherDetails['v3-wx-observations-current'].visibility;
    this.todaysHighlight.windStatus = this.weatherDetails['v3-wx-observations-current'].windSpeed;
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
    this.todayData = [];
    this.weekData = [];
    this.temperatureData = new temperatureData();
    this.todaysHighlight = new todaysHighlight();

    this.getLocationDetails(this.cityName, this.language).subscribe({
      next: (response) => {
        this.locationDetails = response;
        const latitude = this.locationDetails?.location.latitude[0];
        const longitude = this.locationDetails?.location.longitude[0];

        //  Only call getWeatherReport after you have lat/lon
        this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
          next: (weatherResponse) => {
            this.weatherDetails = weatherResponse;
            this.prepareData();
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


}
