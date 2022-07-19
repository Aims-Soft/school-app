import { Component } from '@angular/core';
import {
  LoaderService,
  SharedServicesGlobalDataModule,
} from '@general-app/shared/services/global-data';

@Component({
  selector: 'general-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'general-portal';

  constructor(
    public loaderService: LoaderService,
    public globalDataService: SharedServicesGlobalDataModule
  ) {}
}
