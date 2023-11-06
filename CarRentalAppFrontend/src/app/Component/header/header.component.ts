import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { CarListService } from '../Services/car-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title = 'CarRentalAppFrontend';
  isLoggedIn: boolean = false;
  menuType: string = 'Default';
  userName: string = "";

  constructor(private service: AuthService, private listServices:CarListService) { }

  ngOnInit() {
    this.setCurrentUser();
    this.service.currentUser.subscribe({
      next: (res) => {

        this.setCurrentUser();
      }
    })
  };

  signOut() {

    //Condition For Something when user get Logged out;
    
    this.service.signOut();

  }

  setCurrentUser() {
    var user = localStorage.getItem("localUserData");
    if (user != null) {
      var userInfo = JSON.parse(user);
      this.menuType = userInfo.role;
      this.userName = userInfo.firstname;
    } else {
      this.menuType = "Default";

    }

  }
}
