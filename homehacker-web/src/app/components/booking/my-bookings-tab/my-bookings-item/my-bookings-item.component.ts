import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../../../models/booking.model';
import { House } from '../../../../models/house.model';
import { BookingService } from '../../../../shared/services/booking.service';
import { ApiError } from '../../../../models/api-error.model';

@Component({
  selector: 'app-my-bookings-item',
  templateUrl: './my-bookings-item.component.html',
  styleUrls: ['./my-bookings-item.component.css']
})
export class MyBookingsItemComponent implements OnInit {
  
  @Input() booking: Booking;
  apiError: ApiError;
  
  constructor(private bookingService: BookingService) { }
  
  ngOnInit() {
    
  }
  
  onClickRemoveBooking(id: string){
    this.bookingService.deleteBooking(id).subscribe(() => {
    },
    (error: ApiError) => {
      this.apiError = error;
    })
    
  }
  
}

