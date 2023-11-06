import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  repeatPass: string = 'none';
  displayMsg: string = "";
  IsAccountCreated: boolean = false;

  constructor(private authService: AuthService) { }

  registerForm = new FormGroup({
    firstname: new FormControl("",
      [Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")
      ]),

    lastname: new FormControl("",
      [
        Validators.minLength(2),
        Validators.pattern("[a-zA-Z].*")
      ]),

    email: new FormControl("",
      [Validators.required,
      Validators.email
      ]),

    role: new FormControl("",
      [Validators.required]),

    password: new FormControl("",
      [Validators.required,
      Validators.maxLength(15),
      Validators.minLength(6)
      ]),

    rpwd: new FormControl("")

  });

  get FirstName(): FormControl {
    return this.registerForm.get("firstname") as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get("lastname") as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }

  get Role(): FormControl {
    return this.registerForm.get("role") as FormControl;
  }

  get Password(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }

  get RepeatPwd(): FormControl {
    return this.registerForm.get("rpwd") as FormControl;
  }



  registerSubmitted() {

    if (this.Password.value == this.RepeatPwd.value) {
      console.log(this.registerForm.valid);
      this.repeatPass = "none";

      this.authService.registerUser([
        this.registerForm.value.firstname,
        this.registerForm.value.lastname,
        this.registerForm.value.email,
        this.registerForm.value.role,
        this.registerForm.value.password

      ])
        .subscribe((res) => {
          if (res == 'Success') {

            this.displayMsg = "Account Created Successfully";
            this.IsAccountCreated = true;
            this.registerForm.reset({});

          } else if (res == 'Already Exist') {

            this.displayMsg = "Email already exists, TryAnother Email";
            this.IsAccountCreated = false;
          } else {
            this.displayMsg = 'Something went wrong';
            this.IsAccountCreated = false;
          }

          console.log(res);


        },(error: HttpErrorResponse) => {
          console.error('Error:', error);
          // Handle the error, display an error message, or take other appropriate actions
        });
    }
    else {
      this.repeatPass = 'inline';
    }
  }
  closeAlert() {
    this.IsAccountCreated = false;
  }
}
