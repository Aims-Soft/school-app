import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

//rxjs
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, takeUntil } from 'rxjs/operators';

//service
import { SharedHelpersFieldValidationsModule } from '@general-app/shared/helpers/field-validations';
import { MyFormField } from '@general-app/shared/interface';
import { environment } from "apps/aims-school/src/environments/environment"

// export const sharedServicesDataRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule],
})
export class SharedServicesDataModule {
  private baseURL = environment.apiUrl;
  
  destory$: Subject<boolean> = new Subject<boolean>();

  //variables
  error = '';
  result: any = [];

  constructor(
    private http: HttpClient,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  //Http GET
  public getRequest(functionName: string, params: any): Observable<any> {
    return this.http
      .get(this.baseURL + functionName + params)
      .pipe(retry(0), catchError(this.handleError));
  }

  // Http POST
  public createRequest(functionName: string, data: any): Observable<any> {
    console.log('to send', data);
    return this.http
      .post(this.baseURL + functionName, data)
      .pipe(retry(0), catchError(this.handleError));
  }

  // Http PUT
  public updateRequest(functionName: string, data: any) {
    return this.http
      .put(this.baseURL + functionName, data)
      .pipe(retry(0), catchError(this.handleError));
  }

  // HttpDelete
  public deleteRequest(functionName: string, params: string) {
    return this.http
      .delete(this.baseURL + functionName + '?' + params)
      .pipe(retry(0), catchError(this.handleError));
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

    this.valid.apiErrorResponse(errorMessage);
    console.log(errorMessage);
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  //////////////////////////////////
  // CRUD Operation
  //////////////////////////////////

  // get Function
  public getHttp(url: string, param: any): any {
    this.result = [];
    return this.getRequest(url, param).pipe(takeUntil(this.destory$));
  }

  public deleteHttp(
    pageInterface: any,
    formFields: MyFormField[],
    url: string
  ): any {
    if (this.valid.validateToastr(formFields) == true) {
      // set page interface
      pageInterface = this.setInterface(pageInterface, formFields);

      // if(formFields[1].value == ''){
      //   pageInterface.spType = 'delete';
      // }else{
      //   pageInterface.spType = 'activate';
      // }

      console.log(pageInterface);
      return this.createRequest(url, pageInterface).pipe(
        takeUntil(this.destory$)
      );
    }
  }

  public pintHttp(
    pageInterface: any,
    formFields: MyFormField[],
    url: string
  ): any {
    if (this.valid.validateToastr(formFields) == true) {
      // set page interface
      pageInterface = this.setInterface(pageInterface, formFields);

      console.log(pageInterface);
      return this.createRequest(url, pageInterface).pipe(
        takeUntil(this.destory$)
      );
    }
  }

  public savetHttp(
    pageInterface: any,
    formFields: MyFormField[],
    url: string
  ): any {
    if (this.valid.validateToastr(formFields) == true) {
      // set page interface
      pageInterface = this.setInterface(pageInterface, formFields);

      // // save
      // if (formFields[0].value == '0') {
      //   if(formFields[1].value == '')
      //   {
      //     pageInterface.spType = 'insert';
      //   }else if ( formFields[1].value != ''){
      //     pageInterface.spType = formFields[1].value
      //   }
      // } else {
      //   if(formFields[1].value == ''){
      //     pageInterface.spType = 'update';
      //   } else if(formFields[1].value == 'Complete'){
      //     pageInterface.spType = 'Complete';
      //   } else{
      //     pageInterface.spType = 'insert';
      //   }
      // }
      console.log(pageInterface);
      return this.createRequest(url, pageInterface).pipe(
        takeUntil(this.destory$)
      );
    }
  }

  public receivedtHttp(
    pageInterface: any,
    formFields: MyFormField[],
    url: string
  ): any {
    if (this.valid.validateToastr(formFields) == true) {
      // set page interface
      pageInterface = this.setInterface(pageInterface, formFields);

      console.log(pageInterface);
      return this.createRequest(url, pageInterface).pipe(
        takeUntil(this.destory$)
      );
    }
  }

  setInterface(pageInterface: any, formFields: MyFormField[]): any {
    const headers: Array<any> = Object.keys(pageInterface).map((key) => {
      return { header: key };
    });
    // console.log(headers);
    for (let i = 0; i < headers.length; i++) {
      if (formFields[i].type == 'datePicker') {
        formFields[i].value = this.valid.dateFormat(formFields[i].value);
      }
      pageInterface[headers[i]['header']] = formFields[i].value;
    }
    return pageInterface;
  }
}
