import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CarListService {

  url = "https://localhost:44374";
  imageUrl = "https://localhost:44374/GetImage/";
  carListUrl = "https://localhost:44374/carlist";



  constructor(private http:HttpClient) { }

  httpOptions ={
    header: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

// CAR API Methods

getAllCarList() {
  return this.http.get(`https://localhost:44374/CarList/CarList`);
}

getCarDetailById(id: any){
  return this.http.get(`${this.carListUrl}/CarDetail?vechicleId=${id}`);
}

addCarDetail(data: any): Observable<any> {
  return this.http.post(`${this.carListUrl}/AddCarDetails`, data);
}

updateCarDetail(data: any, id: any) {
  return this.http.put(`${this.carListUrl}/UpdateCarDetail?vechicleId=${id}`, data);
}

deleteCarDetail(id: any) {
  return this.http.delete(`${this.carListUrl}/DeleteCarDetail?vechicleId=${id}`);
}

UploadPhoto(val: any) {
  return this.http.post(`${this.url}/UploadFile`, val);
}

getImage(val: any) {
  return this.http.get(`${this.imageUrl}+${val}`);
}


// Rental Agreement API Methods

getAllRentalAgreement(){
  return this.http.get(`${this.url}/ViewRentalAgreement`);
}

getRentalAgreementByEmail(email: any) {
  return this.http.get(`${this.url}/ViewRentalDetail?email=${email}`);
}

addRentalAgreement(data : any){
  return this.http.post(`https://localhost:44374/AddRentalAgreement`, data);
  console.log(data);
}

DeleteRentalAgreementById(id: any) {
  return this.http.delete(`${this.url}/DeleteRentalAgreement?id=${id}`);
}

}
