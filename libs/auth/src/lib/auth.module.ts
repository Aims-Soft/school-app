import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { MaterialModule } from '@general-app/material';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const authRoutes: Route[] = [
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    HomeComponent
  ],
})
export class AuthModule {}
