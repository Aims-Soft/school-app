import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "apps/aims-school/src/environments/environment"
// import { env_config } from '@nha/shared/enviornment';
import { SharedServicesAuthModule } from '@general-app/shared/services/auth';
import { LoaderService } from '@general-app/shared/services/global-data';
import { finalize } from 'rxjs/operators';

@NgModule({
  imports: [CommonModule],
  providers: [SharedServicesAuthModule],
})
export class SharedHelpersJwtInterceptorModule implements HttpInterceptor {
  // private baseURL = 'http://5.196.171.59:8000/';
  // private baseURL = 'http://localhost:5000/';
  private baseURL = environment.apiUrl;

  constructor(
    private authenticationService: SharedServicesAuthModule,
    public loaderService: LoaderService
    ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loaderService.isLoading.next(true);
    // add auth header with jwt if user logged in and request is to the api url
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(this.baseURL);

    if (isLoggedIn && isApiUrl) {
      if (request.method == 'POST') {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
