import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServicesAuthModule } from '@general-app/shared/services/auth';
import { first } from 'rxjs/operators';
import { SharedHelpersFieldValidationsModule } from '@general-app/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@general-app/shared/services/data';
import { environment } from 'apps/aims-school/src/environments/environment';

@Component({
  selector: 'general-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logoImg: any = '';
  loginForm: any;
  validate: any[] = [];
  hide = true;
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: SharedServicesAuthModule,
    private toastr: SharedHelpersFieldValidationsModule,
    private dataService: SharedServicesDataModule,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.validate = [
      {
        value: this.email,
        msg: 'enter user name or email',
        type: 'textBox',
        required: true,
      },
      {
        value: this.password,
        msg: 'enter password',
        type: 'textBox',
        required: true,
      },
    ];

    if (this.toastr.validateToastr(this.validate) == true) {
      this.authService
        .login(this.email, this.password)
        .pipe(first())
        .subscribe(
          (data) => {
            this.toastr.apiSuccessResponse('User Login Successfully');
            this.router.navigate(['home']);
          },
          (error) => {
            // console.log(error);
            // this.error = error.error.message;
            this.toastr.apiErrorResponse('user name or password in invalid');
          }
        );
    }
  }

}
