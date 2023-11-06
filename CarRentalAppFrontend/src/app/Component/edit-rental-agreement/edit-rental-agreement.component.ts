// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CarListService } from '../Services/car-list.service';
// import { AuthService } from '../Services/auth.service';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// interface RentalAgreementDetail{

//   personName: string;
//   vechicleId: number;
//   mobile:number;
//   adhar:number;
//   email:string;
//   duration:number;
//   totalCost:number;

// }

// @Component({
//   selector: 'app-edit-rental-agreement',
//   templateUrl: './edit-rental-agreement.component.html',
//   styleUrls: ['./edit-rental-agreement.component.css']
// })
// export class EditRentalAgreementComponent {

//   carDetail:any = {};
//   rentalAgreementDetail: any = {};

//   constructor(
//     private service: CarListService,
//      private router: ActivatedRoute,
//      private authService:AuthService,
//      private route:Router) { }
     

//      editRentAgreementForm = new FormGroup({
//       duration: new FormControl("", [
//         Validators.required,
//       ]),
//       mobile: new FormControl("", [
//         Validators.required,
//       ]),
//       adhar: new FormControl("", [
//         Validators.required,
//       ]),
  
//     });
  
//     get Duration(): FormControl {
//       return this.editRentAgreementForm.get("duration") as FormControl;
//     }
  
//     get Mobile(): FormControl {
//       return this.editRentAgreementForm.get("mobile") as FormControl;
//     }
  
//     get Adhar(): FormControl {
//       return this.editRentAgreementForm.get("adhar") as FormControl;
//     }
  
     
//      ngOnInit() {
//       this.refreshRentalAgreementDetail();
//       this.editRentAgreementForm = new FormGroup({
//         duration: new FormControl(this.rentalAgreementDetail['duration']),
//         mobile: new FormControl(this.rentalAgreementDetail['mobile']),
//         adhar: new FormControl(this.rentalAgreementDetail['adhar']),
    
//       });
//     }

//   refreshRentalAgreementDetail() {
//     this.router.queryParams.subscribe(params => {
//        console.log(params);
//       this.rentalAgreementDetail = params;
//     });

//     this.service.getCarDetailById(this.rentalAgreementDetail.vechicleId).
//       subscribe((response: any) => {
//         console.log(response);
//         // console.log(response.imageFileName);
//         const selectedFileName = response.imageFileName;
//         const filenameParts = selectedFileName?.split('\\');
//         const filename = filenameParts?.[filenameParts.length - 1];
//         response.photoFilePath = this.service.imageUrl + filename;
//         this.carDetail = response;

//       })
//     }

//     EditRentAgreementDetail(){
     
//         const mobileValue = Number(this.editRentAgreementForm.value.mobile);
//         const adharValue = Number(this.editRentAgreementForm.value.adhar);
//         const durationValue = Number(this.editRentAgreementForm.value.duration);
  
//         if(!isNaN(mobileValue)){
//           const rentalAgreementDetail: RentalAgreementDetail ={
  
//             personName: this.rentalAgreementDetail.personName,
//             vechicleId: Number(this.carDetail.vechicleId),
//             mobile: mobileValue,
//             adhar: adharValue,
//             email: this.rentalAgreementDetail.email,
//             duration:durationValue,
//             totalCost: durationValue * Number(this.carDetail.rentalPrice),
    
//           };
//           console.log(rentalAgreementDetail);
         
//           this.BacktoForm(rentalAgreementDetail);
//         }
     
      
//     }

//     BacktoForm(data: any) {
//       this.route.navigate(['AcceptRentalAgreement'], { queryParams: data });
//     }
//   }


import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarListService } from '../Services/car-list.service';
import { AuthService } from '../Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface RentalAgreementDetail{

  personName: string;
  vechicleId: number;
  mobile:number;
  adhar:number;
  email:string;
  duration:number;
  totalCost:number;

}

@Component({
  selector: 'app-edit-rental-agreement',
  templateUrl: './edit-rental-agreement.component.html',
  styleUrls: ['./edit-rental-agreement.component.css']
})
export class EditRentalAgreementComponent {

  carDetail:any = {};
  rentalAgreementDetail: any = {};

  constructor(
    private service: CarListService,
     private router: ActivatedRoute,
     private authService:AuthService,
     private route:Router) { }
     

     editRentAgreementForm = new FormGroup({
      duration: new FormControl("", [
        Validators.required,
      ]),
      mobile: new FormControl("", [
        Validators.required,
      ]),
      adhar: new FormControl("", [
        Validators.required,
      ]),
    });
  
    get Duration(): FormControl {
      return this.editRentAgreementForm.get("duration") as FormControl;
    }
  
    get Mobile(): FormControl {
      return this.editRentAgreementForm.get("mobile") as FormControl;
    }
  
    get Adhar(): FormControl {
      return this.editRentAgreementForm.get("adhar") as FormControl;
    }
  
     
     ngOnInit() {
      this.refreshRentalAgreementDetail();
      this.editRentAgreementForm = new FormGroup({
        duration: new FormControl(this.rentalAgreementDetail['duration']),
        mobile: new FormControl(this.rentalAgreementDetail['mobile']),
        adhar: new FormControl(this.rentalAgreementDetail['adhar']),
    
      });
    }

  refreshRentalAgreementDetail() {
    this.router.queryParams.subscribe(params => {
       console.log(params);
      this.rentalAgreementDetail = params;
    });

    this.service.getCarDetailById(this.rentalAgreementDetail.vechicleId).
      subscribe((response: any) => {
        console.log(response);
        // console.log(response.imageFileName);
        const selectedFileName = response.imageFileName;
        const filenameParts = selectedFileName?.split('\\');
        const filename = filenameParts?.[filenameParts.length - 1];
        response.photoFilePath = this.service.imageUrl + filename;
        this.carDetail = response;

      })
    }

    EditRentAgreementDetail() {
      const mobileValue = Number(this.editRentAgreementForm.value.mobile);
      const adharValue = Number(this.editRentAgreementForm.value.adhar);
      const durationValue = Number(this.editRentAgreementForm.value.duration);
  
      if (!isNaN(mobileValue)) {
        const rentalAgreementDetail: RentalAgreementDetail = {
          personName: this.rentalAgreementDetail.personName,
          vechicleId: Number(this.carDetail.vechicleId),
          mobile: mobileValue,
          adhar: adharValue,
          email: this.rentalAgreementDetail.email,
          duration: durationValue,
          totalCost: durationValue * Number(this.carDetail.rentalPrice),
        };
        console.log(rentalAgreementDetail);
        this.BacktoForm(rentalAgreementDetail);
      }
    }

    BacktoForm(data: any) {
      this.route.navigate(['AcceptRentalAgreement'], { queryParams: data });
    }
  }
