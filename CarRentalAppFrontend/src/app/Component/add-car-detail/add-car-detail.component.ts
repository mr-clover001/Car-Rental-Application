import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarListService } from '../Services/car-list.service';

@Component({
  selector: 'app-add-car-detail',
  templateUrl: './add-car-detail.component.html',
  styleUrls: ['./add-car-detail.component.css']
})
export class AddCarDetailComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;


  selectedFile: File | undefined;
  selectedFileName: string | undefined;
  PhotoFileName: any;

  isCarAdded: boolean = false;


  constructor(private service: CarListService) { }


  addCarDetailsForm = new FormGroup({
    maker: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z].*")
    ]),
    model: new FormControl("", [
      Validators.required,
    ]),
    color: new FormControl("", [
      Validators.required,
    ]),
    imageFileName: new FormControl("", [Validators.required]),

    rentalPrice: new FormControl("", [Validators.required]),

    availablityStatus: new FormControl("", 
    [Validators.required,
      Validators.pattern("[a-zA-Z]")
    ]),

  });

  get Maker(): FormControl {
    return this.addCarDetailsForm.get("maker") as FormControl;
  }

  get Model(): FormControl {
    return this.addCarDetailsForm.get("model") as FormControl;
  }

  get Color(): FormControl {
    return this.addCarDetailsForm.get("color") as FormControl;
  }

  get ImageFileName(): FormControl {
    return this.addCarDetailsForm.get("imageFileName") as FormControl;
  }

  get RentalPrice(): FormControl {
    return this.addCarDetailsForm.get("rentalPrice") as FormControl;
  }

  get AvailablityStatus(): FormControl {
    return this.addCarDetailsForm.get("availablityStatus") as FormControl;
  }

  dataAdded() {
    this.service.addCarDetail(this.addCarDetailsForm.value).subscribe(
      (res) => {
       
        this.isCarAdded = true;
        this.addCarDetailsForm.reset();
        this.selectedFile = undefined;
        this.selectedFileName = undefined;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  UploadPhoto(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile ? this.selectedFile.name : undefined;

    const formdata: FormData = new FormData();
    if (this.selectedFile) {
      formdata.append('file', this.selectedFile, this.selectedFileName);
    }

    this.service.UploadPhoto(formdata).subscribe(
      (response: any) => {
        console.log(response.fileName);
        this.selectedFileName = response.fileName;
        const filenameParts = this.selectedFileName?.split('\\');
        this.selectedFileName = filenameParts?.[filenameParts.length - 1];
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  closeClick() {
    this.isCarAdded = false;
  }

}
