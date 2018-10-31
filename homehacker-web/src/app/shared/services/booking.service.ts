import { Injectable } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { SessionService } from './session.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { ApiError } from '../../models/api-error.model';
import { HomeService } from './home.service';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  booking: Booking;
  bookings: Array<Booking> = [];
  private bookingSubject: Subject<Array<Booking>> = new Subject();
  
  private static readonly BOOKING_API = `${environment.homehackerApi}`;
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  constructor(private http: HttpClient, private session: SessionService, private homeService: HomeService) { }
  
  makeBooking(booking: Booking):Observable<Booking | ApiError>{
    const userId = this.session.user.id;    
    const houseId = booking.house;
    
    return this.http.post<Booking>(`${BookingService.BOOKING_API}/users/${userId}/houses/${houseId}/booking`, booking, BookingService.defaultOptions)
    .pipe(
      map((booking: Booking) => {
        return booking;
      }),
      catchError(this.handleError)
    )
  }
  
  //GET BOOKINGS OF ONE USER
  list():Observable<Array<Booking> | ApiError>{
    
    return this.http.get<Array<Booking>>(`${BookingService.BOOKING_API}/bookings`, BookingService.defaultOptions)
    .pipe(
      map((bookings: Array<Booking>) => {
        this.bookings = bookings;
        return bookings;
      }),
      catchError(this.handleError)
    )
  }
  
  deleteBooking(id: string): Observable<void | ApiError>{      
    return this.http.delete<void>(`${BookingService.BOOKING_API}/bookings/${id}`, BookingService.defaultOptions)
    .pipe(
      map(() => {
        this.bookings = this.bookings.filter(booking => booking.id !== id);
        this.notifyBookingChanges();
        return;
      }),
      catchError(this.handleError)
    )
  }
  
  private notifyBookingChanges(): void{
    this.bookingSubject.next(this.bookings);
  }
  
  onBookingChanges():Observable<Array<Booking>>{
    return this.bookingSubject.asObservable();
  }
  
  handleError(error: HttpErrorResponse):Observable<ApiError>{
    const apiError = new ApiError();
    if (error.error instanceof ErrorEvent) {
      apiError.message = 'Something went bad, try again';
    } else{
      apiError.message = error.error.message;
      apiError.errors = error.error.errors;
    }    
    return throwError(apiError);
  }
}
