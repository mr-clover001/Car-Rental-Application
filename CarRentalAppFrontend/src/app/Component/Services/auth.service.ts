import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoggedIn: boolean = false;
  menuType: string = "Default";
  jwtHelpherSerivice = new JwtHelperService();
  baseUrl = "https://localhost:44374";


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

 


  registerUser(user: any) {
    return this.http.post(this.baseUrl + '/CreateUser',
      {
        FirstName: user[0],
        LastName: user[1],
        Email: user[2],
        Role: user[3],
        Password: user[4],

      }, {
      responseType: "text"
    });
  }


  
  LoginUser(user: any) {
    return this.http.post(this.baseUrl + '/login',
      {
        Email: user[0],
        Password: user[1]
      }, { responseType: "text" }
    )
  };

  setToken(token: string) {
    localStorage.setItem("access_token", token);

    const userInfo = token != null ? this.jwtHelpherSerivice.decodeToken(token) : null;
    const user = userInfo ?
      {
        id: userInfo.id,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        email: userInfo.email,
        mobile: userInfo.mobile,
        role: userInfo.role,
      } : null;

    localStorage.setItem("localUserData", JSON.stringify(user));
    this.currentUser.next(user);

  }

  isAdmin() {
    var user = localStorage.getItem("localUserData");
    if (user != null) {
      var userInfo = JSON.parse(user);

      if (userInfo.role == "Admin") {
        return true;
      }
    }
    return false;

  }


  isUser(){
    var user = localStorage.getItem("localUserData");
    if (user != null) {
      var userInfo = JSON.parse(user);

      if (userInfo.role == "User" ) {
        return true;
      }
    }
    return false;
  }

  signOut() {
    localStorage.clear();
    this.currentUser.next(null);
    this.router.navigate(['Login']);

  }

  
}
