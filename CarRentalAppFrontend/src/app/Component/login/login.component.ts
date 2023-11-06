import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  alert: boolean = false;
  isUserValid: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private app: AppComponent,
  ) { }

  loginForm = new FormGroup({

    email: new FormControl("",
      [Validators.required,
      Validators.email
      ]),
    password: new FormControl("",
      [Validators.required,
      Validators.maxLength(15),
      Validators.minLength(6)
      ])

  });

  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

  loginSubmitted() {
    this.authService
      .LoginUser(
        [this.loginForm.value.email,
        this.loginForm.value.password])
      .subscribe({
        next: (res) => {
          if (res == 'Failure') {

            this.isUserValid = false;
            this.alert = true;

          } else {
            this.isUserValid = true;
            alert("Login successFul");

            this.authService.setToken(res);

            this.router.navigateByUrl('/');
          }
        },
        error: error => {
          console.error(error);
          this.isUserValid = false;
          this.alert = true;

        }
      }

      );
  }

  closeAlert() {
    this.alert = false;
    this.loginForm.reset();
  }

}
