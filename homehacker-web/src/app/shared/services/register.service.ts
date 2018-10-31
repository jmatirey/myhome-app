import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiError } from '../../models/api-error.model';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  private static readonly REGISTER_API = `${environment.homehackerApi}/users`;
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  constructor(private http: HttpClient) { }
  
  createUser(user: User):Observable<User | ApiError>{     
    return this.http.post<User>(RegisterService.REGISTER_API, user, RegisterService.defaultOptions)
    .pipe(
      map((user: User)=>{        
        return user;
      }),
      catchError(this.handleError)
    )
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
