import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { interceptorJWT } from './interceptores/interceptorJWT';
import { interceptorLog } from './interceptores/interceptorLog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([interceptorLog, interceptorJWT]))
  ]
};
