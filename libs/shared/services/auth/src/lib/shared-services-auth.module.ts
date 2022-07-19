import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserInterface } from '@general-app/shared/interface';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'apps/aims-school/src/environments/environment';
import { SharedHelpersFieldValidationsModule } from '@general-app/shared/helpers/field-validations';

export const sharedServicesAuthRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
})
export class SharedServicesAuthModule {
  private currentUserSubject: BehaviorSubject<UserInterface>;
  public currentUser: Observable<UserInterface>;

  constructor(
    private http: HttpClient,
    private toastr: SharedHelpersFieldValidationsModule
  ) {
    this.currentUserSubject = new BehaviorSubject<UserInterface>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserInterface {
    return this.currentUserSubject.value;
  }
  
  public getCompanyHttp(functionName: string, params: any): Observable<any> {
    return this.http
      .get(environment.apiUrl + functionName + params)
      .pipe(retry(3), catchError(this.handleError));
  }
// http Error Handling
handleError(error: HttpErrorResponse) {
  // alert('catch error');

  let errorMessage = 'Unknown Error!';

  if (error.error instanceof ErrorEvent) {
    // client side error
    errorMessage = 'Error: ${error.error.message}';
  } else {
    // server side error
    errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
  }

  return throwError(errorMessage);
}

  login(email: string, password: string) {
    debugger;
    return this.http
      .post<UserInterface>(environment.apiUrl + 'auth-api/auth', {
        Loginname: email,
        hashpassword: password,
        spType: 'READ',
      })
      .pipe(
        map((user: UserInterface) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user);
          return user;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('moduleId');
    // alert('shared service funtion')
  }
}
