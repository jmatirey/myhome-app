import { Component, OnInit, OnDestroy, ViewRef } from '@angular/core';
import { HomeService } from './../../../../shared/services/home.service';
import { House } from './../../../../models/house.model';
import { ApiError } from './../../../../models/api-error.model';
import { Subscription } from 'rxjs';
import { BookingService } from './../../../../shared/services/booking.service';
import { Booking } from './../../../../models/booking.model';
import { FindHomeFormComponent } from '../../find/find-home-form/find-home-form.component';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit, OnDestroy {
  apiError: ApiError;
  houses: Array<House> = [];
  prices: Array<number> = [];
  minPrice: number;
  maxPrice: number;
  paintMapIfHouses: boolean = false;
  onHousesChangesSuscription: Subscription;
  searchPattern: string;
  constructor(private homeService: HomeService, private bookingService: BookingService) { }
  
  ngOnInit() {
    this.homeService.list().subscribe((houses: Array<House>)=> {
      this.houses = houses;
      this.prices = [];

      houses.forEach((house) => {        
        this.prices.push(house.price)
        this.maxPrice = Math.max(...this.prices);
        this.minPrice = Math.min(...this.prices);
      })
    },
    (error: ApiError) =>{
      this.apiError = error;
    }
  );
  
  this.onHousesChangesSuscription = this.homeService.onHomeChanges()
  .subscribe((houses: Array<House>) => { 
    this.houses = houses;    
    this.prices = [];
    houses.forEach((house) => {
      this.prices.push(house.price)      
      this.maxPrice = Math.max(...this.prices);
      this.minPrice = Math.min(...this.prices);
    })
  })
  
}

clickedmarker(infowindow){
  console.log(infowindow);
  console.log('dsaad');
  
  
}

// clickedMarker(label: string, infoWindow, marker, index: number) {
//   if( this.infoWindowOpened ===  infoWindow)
//    return;

//  if(this.infoWindowOpened !== null)
//  {
//   this.infoWindowOpened.close();
//  }
//  this.infoWindowOpened = infoWindow;
// }

ngOnDestroy(){
  console.log('destroyed house list suscription');
  this.onHousesChangesSuscription.unsubscribe();
}


}
