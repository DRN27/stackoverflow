// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment: Environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB4xzPvqcV2P3zQdz_oUGwCohIDkuvlDSM",
    authDomain: "fir-5b04d.firebaseapp.com",
    databaseURL: "https://fir-5b04d.firebaseio.com",
    projectId: "fir-5b04d",
    storageBucket: "fir-5b04d.appspot.com",
    messagingSenderId: "88794073232",
    appId: "1:88794073232:web:42329c95f3a97ec3083015"
  },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
