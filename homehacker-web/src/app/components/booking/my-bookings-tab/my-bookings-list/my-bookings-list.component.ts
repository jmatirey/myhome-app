import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BookingService } from '../../../../shared/services/booking.service';
import { Booking } from '../../../../models/booking.model';
import { ApiError } from '../../../../models/api-error.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-bookings-list',
  templateUrl: './my-bookings-list.component.html',
  styleUrls: ['./my-bookings-list.component.css']
})
export class MyBookingsListComponent implements OnInit {
  bookings: Array<Booking> = [];
  apiError: ApiError;
  onBookingChangesSubscription: Subscription;
  
  constructor(private bookingService: BookingService) {}
  
  ngOnInit() {
    this.bookingService.list().subscribe((bookings: Array<Booking>) => {
      this.bookings = bookings;      
      if (this.bookings.length === 0) {
        //SHOW TOAST ERROR ????
      }
    },
    (error: ApiError) =>{
      this.apiError = error;
    }
  )
  
  this.onBookingChangesSubscription = this.bookingService.onBookingChanges()
  .subscribe((bookings: Array<Booking>) => {
    this.bookings = bookings;
  })
}

}

