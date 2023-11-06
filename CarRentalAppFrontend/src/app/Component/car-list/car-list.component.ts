import { Component } from '@angular/core';
import { CarListService } from '../Services/car-list.service';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Car {
  maker: string;
  model: string;
  rentalPrice: number;
  [key: string]: any;
}

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {
  
  CarList: any = [];
  selectedFileName: string | undefined;
  PhotoFilePath: string | undefined;
  isCarDataEmpty: boolean = false;
  isCarListAvailable: boolean = false;
  isDeleted: boolean = false;
  isAdmin: boolean = false;
  isAvaiable: boolean=false;
  notAvaiable:boolean = false;
  imageUrl: any;

  //Pagination Variables
  title = "pagination";
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [5, 5, 5, 5];

  CarMakerFilter: string = "";
  CarModelFilter: string = "";
  
  CarListWithoutFilter: any = [];
  showAvailableCars = true;
  minrentalPrice: number = 5000;
  maxrentalPrice: number = 60000; 
  selectedMaker: string = '';

  showAdditionalFilters: boolean = false; 

  toggleFilters() {
    this.showAdditionalFilters = !this.showAdditionalFilters; 
  }

  
  // filter by rental price
  filterAndSortCars(): void {
    this.CarList = this.CarListWithoutFilter.filter((car: Car) => {
      return car.rentalPrice >= this.minrentalPrice && car.rentalPrice <= this.maxrentalPrice;
    });
  }

 // filter by maker
  filterByMaker() {
    if (this.selectedMaker === '') {
      // If no maker is selected, show all cars
      this.CarList = this.CarListWithoutFilter;
    } else {
      this.CarList = this.CarListWithoutFilter.filter((el: any) => {
        return el.maker.toLowerCase() === this.selectedMaker;
      });
    }
  }
  
  // Search On the basis of Company Name
  searchProduct() {
    var CarMakerFilter = this.CarMakerFilter;
    // var CarModelFilter = this.CarModelFilter;
    this.CarList = this.CarListWithoutFilter.filter(function (el: any) {
      return el.maker.toString().toLowerCase().includes(CarMakerFilter.toLowerCase().toString().trim())
    });

    // this.CarList = this.CarListWithoutFilter.filter(function (el: any) {
    //   return el.model.toString().toLowerCase().includes(CarModelFilter.toLowerCase().toString().trim())
    // });

  }


  // Sort On the basis of Rental Price
  sortResult(prop: string, asc: boolean): void {
    this.CarList.sort((a: Car, b: Car) => {
      const valueA = a[prop];
      const valueB = b[prop];
  
      if (asc) {
        return valueA - valueB; // Sort in ascending order
      } else {
        return valueB - valueA; // Sort in descending order
      }
    });
  }
  
  toggleAvailability(): void {
    this.showAvailableCars = !this.showAvailableCars;
  }


  constructor(
    private services: CarListService,
    private route: Router,
    private AuthService: AuthService
  ) { }


  ngOnInit(): void {
    this.isAdmin = this.AuthService.isAdmin();
    this.services.getAllCarList().subscribe((res: any) => {

      this.CarList = res;
    

      if (this.CarList.length == 0) {
        this.isCarDataEmpty = true;
      }

        console.warn(this.CarList);
        this.CarListWithoutFilter = this.CarList;

        this.CarList.forEach((product: any) => {
          const selectedFileName = product.imageFileName;
          const filenameParts = selectedFileName?.split('\\');
          const filename = filenameParts?.[filenameParts.length - 1];
          product.photoFilePath = this.services.imageUrl + filename;

          if(product.availablityStatus=='Available'){
            this.isAvaiable=true;
          }
          else{
            this.notAvaiable=true;
          }
        });

      
    });

    if(this.isAdmin){
      this.isCarDataEmpty = false;
    }else{
     
    }

  }

  onTableDataChanged(event: any) {
    this.page = event;
    setTimeout(() => {
      location.reload();
    }, 1000000000)
  }

  onTableSizeChanged(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    setTimeout(() => {
      location.reload();
    }, 20)
  }


 

  deleteCarDetail(id: any) {
    if (confirm("Are you sure you want to delete this Car from repository?")) {
      this.services.deleteCarDetail(id).subscribe((data: any) => {
        setTimeout(() => {
          location.reload();
        }, 400)
        this.isDeleted = true;
      })
    }
  }

  collectData(carDetail: any) {

    if(carDetail.availablityStatus=='Available'){
      this.route.navigate(['RentYourCar'], { queryParams: carDetail });
    }
    else{
      alert("This Car is Not Available, Rent another Car")
    }
  }

  closeClick() {
    this.isDeleted = false;
  }
}
