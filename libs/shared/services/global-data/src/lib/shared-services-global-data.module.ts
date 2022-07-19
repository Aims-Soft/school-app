import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { SharedServicesAuthModule } from '@general-app/shared/services/auth';
import { SharedServicesDataModule } from '@general-app/shared/services/data';
import { UserInterface } from '@general-app/shared/interface';
import { Router } from '@angular/router';

declare var $: any;

@NgModule({
  imports: [CommonModule],
})
export class SharedServicesGlobalDataModule {
  currentUser = {} as UserInterface;

  private subject = new Subject<any>();

  private _headerTitleSource = new Subject<string>();
  header_title$ = this._headerTitleSource.asObservable();

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable();

  constructor(
    private router: Router,
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule
  ) {}

  setHeaderTitle(title: string) {
    this._headerTitleSource.next(title);
  }

  setLoadingIndicator(value: boolean) {
    this.isLoading$$.next(value);
  }

  getUserId(): number {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      return this.currentUser.userLoginId;
    } else {
      return 0;
    }
  }

  getUserName(): string {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      return this.currentUser.fullName;
    } else {
      return '';
    }
  }

  getRoleId(): number {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      return this.currentUser.roleId;
    } else {
      return 0;
    }
  }

  setMenuItems(item: any) {
    this.subject.next(item);
  }

  getMenuItems(): Observable<any> {
    return this.subject.asObservable();
  }

  checkRouterUrl(listItems: any, routerUrl: any) {
    var pRoute = routerUrl.split('/')[1];
    var cRoute = routerUrl.split('/')[2];

    var row = listItems.filter(
      (m: { parentRoute: any; routeTitle: any }) =>
        m.parentRoute == pRoute && m.routeTitle == cRoute
    );

    if (row.length == 0) {
      this.router.navigate(['/home']);
    } else {
      // console.log(row)
      this.setPermission(row);
    }
  }

  setPermission(item: any) {
    this.subject.next(item);
  }

  getPermission(): Observable<any> {
    return this.subject.asObservable();
  }

  //print Asset Register Report
  printData(printSection: string) {
    var contents = $(printSection).html();

    var frame1 = $('<iframe />');
    frame1[0].name = 'frame1';
    frame1.css({ position: 'absolute', top: '-1000000px' });
    $('body').append(frame1);
    var frameDoc = frame1[0].contentWindow
      ? frame1[0].contentWindow
      : frame1[0].contentDocument.document
      ? frame1[0].contentDocument.document
      : frame1[0].contentDocument;
    frameDoc.document.open();

    //Create a new HTML document.
    // frameDoc.document.write(
    //   "<html><head><title>DIV Contents</title>" +
    //     "<style>" +
    //     printCss +
    //     "</style>"
    // );

    //Append the external CSS file. <link rel="stylesheet" href="../../../styles.scss" /> <link rel="stylesheet" href="../../../../node_modules/bootstrap/dist/css/bootstrap.min.css" />
    frameDoc.document.write(
      '<style type="text/css" media="print">@page { size: landscape; }</style>'
    );
    frameDoc.document.write(
      // '<link rel="stylesheet" href="../../../../../../apps/society/src/styles.scss" type="text/scss"  media="print"/>'
      // '<link rel="stylesheet" href="../../../../../ui/src/lib/styles/print/styles.css" type="text/css"  media="print"/>'
      '<link rel="stylesheet" href="../styles.css" type="text/css"  media="print"/>'
      // '<link rel="stylesheet" href="../css/bootstrap.css" type="text/css"  media="print"/>'
    );
    frameDoc.document.write('</head><body>');

    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');

    frameDoc.document.close();

    setTimeout(function () {
      window.frames[0].focus();
      window.frames[0].print();

      frame1.remove();
    }, 500);
  }

  /****************************** */
  /*********** Text Masks ******* */
  /****************************** */
  cnicMask(): any {
    return [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
    ];
  }

  mobileMask(): any {
    return [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
  }

  ntnMask(): any {
    return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
  }

  bpsMask(): any {
    return [/\d/, /\d/];
  }
}
