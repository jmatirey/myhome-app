import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { House } from './../../../../models/house.model';
import { Booking } from './../../../../models/booking.model';
import { BookingService } from './../../../../shared/services/booking.service';
import { ApiError } from './../../../../models/api-error.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-house-item',
  templateUrl: './house-item.component.html',
  styleUrls: ['./house-item.component.css']
})
export class HouseItemComponent implements OnInit {
  
  @Input() house: House;
  booking: Booking = new Booking();
  apiError: ApiError;
  
  constructor(private bookingService: BookingService) { }
  
  ngOnInit() {
  }

}
