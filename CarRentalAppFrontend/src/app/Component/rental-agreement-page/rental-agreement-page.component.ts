import { Component } from '@angular/core';
import { CarListService } from '../Services/car-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs'
@Component({

  selector: 'app-rental-agreement-page',
  templateUrl: './rental-agreement-page.component.html',
  styleUrls: ['./rental-agreement-page.component.css']
})
export class RentalAgreementPageComponent {

  carDetails:any = [];
  loggedInUserRentalAgreement: any = [];
  allRentalAgreement:any = {};
  userEmail:any;
  menuType:any;
  isDeleted: boolean=false;
 

  constructor(
    private services: CarListService,
    private route: Router ,
    private router: ActivatedRoute, ) { 

    }

  ngOnInit(): void {

    this.getUserDetails();
    this.router.queryParams.subscribe();
    this.refreshRentalAgreement();
}


refreshRentalAgreement(){

 

  this.getAgreement();
}

getAgreement(){

  if (this.menuType == "Admin") {
    this.services.getAllRentalAgreement().subscribe((res: any) => {
      this.allRentalAgreement = res;
      console.log(this.allRentalAgreement);
      const observables: any[] = [];
  
      this.allRentalAgreement.forEach((product: any) => {
        const carDetailObservable = this.services.getCarDetailById(product.vechicleId);
        observables.push(carDetailObservable);
      });
  
      forkJoin(observables).subscribe((carDetailsArray: any) => {
        console.log(carDetailsArray);
  
        this.carDetails = carDetailsArray;
  
        // Manipulate this.carDetails here
        this.carDetails.forEach((product: any) => {
          const selectedFileName = product.imageFileName;
          const filenameParts = selectedFileName?.split('\\');
          const filename = filenameParts?.[filenameParts.length - 1];
          product.photoFilePath = this.services.imageUrl + filename;
          console.log(product.photoFilePath);
        });
      });
  
     
    });

  }
  

  else if(this.menuType=="User"){
        this.services.getRentalAgreementByEmail(this.userEmail).subscribe((res: any) => {

          this.loggedInUserRentalAgreement = res;
          const observables: any[] = [];
  
      this.loggedInUserRentalAgreement.forEach((product: any) => {
        const carDetailObservable = this.services.getCarDetailById(product.vechicleId);
        observables.push(carDetailObservable);
      });

      forkJoin(observables).subscribe((carDetailsArray: any) => {
        console.log(carDetailsArray);
  
        this.carDetails = carDetailsArray;
  
        // Manipulate this.carDetails here
        this.carDetails.forEach((product: any) => {
          const selectedFileName = product.imageFileName;
          const filenameParts = selectedFileName?.split('\\');
          const filename = filenameParts?.[filenameParts.length - 1];
          product.photoFilePath = this.services.imageUrl + filename;
          console.log(product.photoFilePath);
        });
      });


        });
      
      };

        }

   
       

    
    getUserDetails() {
      var user = localStorage.getItem("localUserData");
      if (user != null) {
        var userInfo = JSON.parse(user);
        this.userEmail = userInfo.email;
        this.menuType=userInfo.role;
        console.log(this.menuType);
      } 
    }

    deleteAgreement(id:any){

        if (confirm("Are you sure you want to delete this rental Agreement")) {
          this.services.DeleteRentalAgreementById(id).subscribe((data: any) => {
            setTimeout(() => {
              location.reload();
            }, 400)
            this.isDeleted = true; 
      })

    }
}

}