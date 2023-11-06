import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarListService } from '../Services/car-list.service';
import { AuthService } from '../Services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rental-agreement-acceptance',
  templateUrl: './rental-agreement-acceptance.component.html',
  styleUrls: ['./rental-agreement-acceptance.component.css']
})
export class RentalAgreementAcceptanceComponent {
  
  selectedFile: File | undefined;
  selectedFileName: string | undefined;
  PhotoFileName: any;
  PhotoFilePath: any;
  changedPhotoFilePath: any;
  photoFile: any;
  carDetail:any = {};
  rentalAgreementDetail: any = {};
  isCarAdded: boolean = false;
  isChanged: boolean = false;
  isRentalAgreementAdded :any;

  constructor(
    private service: CarListService,
     private router: ActivatedRoute,
     private authService:AuthService,
     private route:Router) { }

     ngOnInit() {
      this.refreshRentalAgreementDetail();
      
    }

  refreshRentalAgreementDetail() {
    this.router.queryParams.subscribe(params => {
       console.log(params);
      this.rentalAgreementDetail = params;
    });

    this.service.getCarDetailById(this.rentalAgreementDetail.vechicleId).
      subscribe((response: any) => {

        console.log(response.imageFileName);
        const selectedFileName = response.imageFileName;
        const filenameParts = selectedFileName?.split('\\');
        const filename = filenameParts?.[filenameParts.length - 1];
        response.photoFilePath = this.service.imageUrl + filename;
        this.carDetail = response;

      })

    
   
  }

  acceptRentalAgreement(data:any){
 
      this.service.addRentalAgreement(data).subscribe(
        (res) => {
         
          this.isRentalAgreementAdded = true;
          location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
      
      this.route.navigate(['RentalAgreementPage']);

  }

  collectData(data: any) {
    this.route.navigate(['editRentalAgreement'], { queryParams: data });
}

}