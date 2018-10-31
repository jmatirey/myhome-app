import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../../shared/services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { House } from '../../../models/house.model';
import { ApiError } from '../../../models/api-error.model';
import { FormGroup } from '@angular/forms';
import { Booking } from '../../../models/booking.model';
import { BookingService } from '../../../shared/services/booking.service';
import { SessionService } from '../../../shared/services/session.service';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  house: House = new House();
  booking: Booking = new Booking();
  
  @ViewChild('formBooking') formBooking: FormGroup;
  apiError: ApiError;
  
  constructor(private homeService: HomeService, 
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router,
    public session: SessionService) {   //ESTE PUBLIC ES NECESARIO PARA USARLO EN MI HTML !!!!
      
    }
    
    
    ngOnInit() {
      const houseId = this.route.snapshot.paramMap.get('id');
      
      this.homeService.get(houseId).subscribe((house: House) =>{
        this.house = house;      
      },
      (error: ApiError) => {
        this.apiError = error;
      }
    );
    
    
    
  }
  
  onSubmitBooking(){  
    if(this.formBooking.valid){
      let booking = undefined;
      
      booking = {
        start: Object.values(this.booking.start).join('-'),
        end: Object.values(this.booking.end).join('-'),
        house: this.house.id,
        user: this.house.owner
      }
      this.bookingService.makeBooking(booking).subscribe((booking: Booking) => {
        this.router.navigate(['/myBookings']);
      },
      (error => {      
        this.apiError = error;
      }))
    }
  }
  
  
}


