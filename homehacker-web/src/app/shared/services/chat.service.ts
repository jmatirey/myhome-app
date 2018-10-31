import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { ApiError } from '../../models/api-error.model';
import { Message } from '../../models/message.model';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Array<Message> = [];
  messagesSubject: Subject<Array<Message>> = new Subject();
  
  private static readonly CHAT_API = `${environment.homehackerApi}`;
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  constructor(private http: HttpClient) { }
  
  //LIST MESSAGES ONLY WITH THAT PERSON
  list(userId: string): Observable<Array<Message> | ApiError>{    
      console.log(`${ChatService.CHAT_API}/chat/${userId}/messages`);
      
    return this.http.get<Array<Message>>(`${ChatService.CHAT_API}/chat/${userId}/messages`, ChatService.defaultOptions)
    .pipe(
      map((messages: Array<Message>) => {
        this.messages = messages;
        // this.notifyMessagesChanges();        
        return messages;
      })
    )
  }
  
  sendMessage(message: Message):Observable<Message | ApiError>{    
    return this.http.post<Message>(`${ChatService.CHAT_API}/chat/${message.to.id}/message`, message, ChatService.defaultOptions)
    .pipe(
      map((message: Message) => {
        this.messages.push(message);        
        // this.notifyMessagesChanges(); 
        return message;
      }),
      catchError(this.handleError)
    )
  }
  
  // notifyMessagesChanges():void{
  //   // console.log(3, this.messages);
  //   this.messagesSubject.next(this.messages);
  // }
  
  // onMessagesChanges():Observable<Array<Message>>{
  //   return this.messagesSubject.asObservable();
  // }
  
  private handleError(error: HttpErrorResponse): Observable<ApiError> {
    console.error('An error occurred:', error);
    const apiError = new ApiError();
    if (error.error instanceof ErrorEvent) {
      console.error('Client error:', error.error.message);
      apiError.message = 'Something bad happened; please try again later.';
    } else {
      apiError.message = error.error.message;
      apiError.errors = error.error.errors;
    }
    return throwError(apiError);
  }
}
