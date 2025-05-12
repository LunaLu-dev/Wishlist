import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {connectFirestoreEmulator, getFirestore, provideFirestore} from '@angular/fire/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from "@angular/fire/app-check";
import {environment} from '../environments/environment';
import { provideAppCheck } from '@angular/fire/app-check';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideAppCheck(() => {
      return initializeAppCheck(undefined, {
        provider: new ReCaptchaV3Provider('6LfxJDYrAAAAADz3DvXNo_GHvsMWN2QE-qJVqtFF'),
        isTokenAutoRefreshEnabled: true
      });
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
        connectFirestoreEmulator(
          firestore,
          environment.emulators.firestore.host,
          environment.emulators.firestore.port
        );
      }
      return firestore;
    }),
  ],
};


