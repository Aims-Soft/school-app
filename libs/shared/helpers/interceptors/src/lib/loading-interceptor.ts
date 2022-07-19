import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedServicesGlobalDataModule } from '@general-app/shared/services/global-data';

@Injectable()
export class SharedHelpersLoadingInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private globalDataService: SharedServicesGlobalDataModule) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        this.requests.splice(i, 1);
        this.globalDataService.setLoadingIndicator(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);
        this.globalDataService.setLoadingIndicator(true);
        return new Observable(observer => {
          const subscription = next.handle(req)
            .subscribe(
            event => {
              if (event instanceof HttpResponse) {
                this.removeRequest(req);
                observer.next(event);
              }
            },
            err => { this.removeRequest(req); observer.error(err); },
            () => { this.removeRequest(req); observer.complete(); });
          // teardown logic in case of cancelled requests
          return () => {
            this.removeRequest(req);
            subscription.unsubscribe();
          };
        });
    }
}
