import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import 'zone.js';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection()
  ]
}).catch(err => console.error(err));
