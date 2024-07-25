import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { movieReducers } from './core/stores/movie.reducers';
import * as MovieEffects from './core/stores/movie.effects';
import { tokenInterceptor } from './core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(movieReducers),
    provideEffects(MovieEffects),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor]),
    ),
  ]
};
