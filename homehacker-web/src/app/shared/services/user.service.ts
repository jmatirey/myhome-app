import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { ApiError } from '../../models/api-error.model';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userSubject: Subject<User> = new Subject();
  user: User;
  
  private static readonly USER_API = `${environment.homehackerApi}/users`;
  private static readonly CURRENT_USER = 'current-user';
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  constructor(private http: HttpClient) { }
  
  get(id: string){      
    return this.http.get<User>(`${UserService.USER_API}/${id}`, UserService.defaultOptions)
    .pipe(
      map((user: User) => {
        this.user = user;
        return user;
      }),
      catchError(this.handleError)
    )
  }
  
  edit(user: User):Observable<User | ApiError>{      
    return this.http.patch<User>(`${UserService.USER_API}/${user.id}/edit`, user.asFormData(), { withCredentials: true })
    .pipe(
      map((user: User) => {
        this.user = user;        
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
