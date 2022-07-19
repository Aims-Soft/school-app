import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedServicesAuthModule } from '@general-app/shared/services/auth';
import { SharedHelpersFieldValidationsModule } from '@general-app/shared/helpers/field-validations';
import { SharedHelpersJwtInterceptorModule } from '@general-app/shared/helpers/jwt-interceptor';
import { SharedServicesGlobalDataModule } from '@general-app/shared/services/global-data';
import { SharedServicesDataModule } from '@general-app/shared/services/data';
import { AuthGuard } from '@general-app/shared/helpers/guards';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { Route, RouterModule } from '@angular/router';
import { AuthModule, authRoutes } from '@general-app/auth';

import { MaterialModule } from '@general-app/material';
import { LayoutsModule } from '@general-app/layouts';

import { HomeComponent } from '../../../../libs/auth/src/lib/home/home.component';
import { TopSideNavComponent } from './layouts/top-side-nav/top-side-nav.component';

export const appRoutes: Route[] = [
  { path: 'auth', children: authRoutes },
  {
    path: 'home',
    component: TopSideNavComponent,
    children: [{ path: '', component: HomeComponent }],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];
@NgModule({
  declarations: [AppComponent, TopSideNavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutsModule,
    AuthModule,
    SharedHelpersFieldValidationsModule,
    SharedServicesAuthModule,
    SharedHelpersJwtInterceptorModule,
    SharedHelpersFieldValidationsModule,
    SharedServicesGlobalDataModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    SharedServicesGlobalDataModule,
    SharedServicesDataModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SharedHelpersJwtInterceptorModule,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
