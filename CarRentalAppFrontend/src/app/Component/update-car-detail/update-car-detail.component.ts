

import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarListService } from '../Services/car-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-car-detail',
  templateUrl: './update-car-detail.component.html',
  styleUrls: ['./update-car-detail.component.css']
})
export class UpdateCarDetailComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedFile: File | undefined;
  selectedFileName: string | undefined;
  PhotoFileName: any;
  PhotoFilePath: any;
  changedPhotoFilePath: any;
  isCarAdded: boolean = false;
  isChanged: boolean = false;
  photoFile: any;

  constructor(private service: CarListService, private router: ActivatedRoute) { }
  vechicleId: any = this.router.snapshot.params['vechicleId'];

  UpdatedCarDetailForm = new FormGroup({
    maker: new FormControl("", Validators.required),
    model: new FormControl("", Validators.required),
    color: new FormControl("", Validators.required),
    imageFileName: new FormControl(),
    rentalPrice: new FormControl("", [Validators.required, Validators.min(0)]),
    avaiablityStatus: new FormControl("", Validators.required),
  });

  ngOnInit() {
    console.warn(this.vechicleId);
    this.service.getCarDetailById(this.vechicleId).subscribe((response: any) => {
      const selectedFileName = response.imageFileName;
      const filenameParts = selectedFileName?.split('\\');
      const filename = filenameParts?.[filenameParts.length - 1];
      this.PhotoFileName = filename;
      this.photoFile = this.service.imageUrl + filename;
      this.PhotoFilePath = this.photoFile;
      this.isChanged = false;

      if (response) {
        this.UpdatedCarDetailForm.patchValue({
          maker: response.maker,
          model: response.model,
          color: response.color,
          rentalPrice: response.rentalPrice,
          avaiablityStatus: response.avaiablityStatus,
        });
      }
    });
  }

  collectUpdatedData() {
    console.warn(this.vechicleId, this.UpdatedCarDetailForm.value);
    this.isCarAdded = true;
    this.service.updateCarDetail(this.UpdatedCarDetailForm.value, this.vechicleId).subscribe(
      (response: any) => {
        console.log(response);
        
      },
      (error: any) => {
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
        this.changedPhotoFilePath = this.service.imageUrl + this.selectedFileName;
        this.isChanged = true;
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

