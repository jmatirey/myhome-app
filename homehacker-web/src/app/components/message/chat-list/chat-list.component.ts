import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ChatService } from '../../../shared/services/chat.service';
import { Message } from '../../../models/message.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { FormGroup } from '@angular/forms';
import { ApiError } from '../../../models/api-error.model';
import { User } from '../../../models/user.model';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy {
  private static readonly POLLING_INTERVAL = 1000;
  @ViewChild('form') form: FormGroup;
  @ViewChild('containerMessages') containerMessages: ElementRef;
  iconSend = 'https://cdn0.iconfinder.com/data/icons/new-design/512/57-Send-512.png';
  message: Message = new Message();
  messages: Array<Message>;
  apiError: ApiError;
  intervalPollingSubscription: Subscription;
  meId: string;
  constructor(private chatService: ChatService, private route: ActivatedRoute, private sessionService: SessionService, private router: Router) { }
  
  ngOnInit(){
    
    this.message.from = this.sessionService.user; //me
    this.meId = this.sessionService.user.id; // me
    
    this.route.params.subscribe(params =>{
      console.log(params.userId);
      this.message.to = new User(); //DEBO INICIALIZARLO!!!!
      this.message.to.id = params.userId; // him  
    });
    
    this.intervalPollingSubscription = interval(ChatListComponent.POLLING_INTERVAL)
    .pipe(
      startWith(0),
      switchMap(() => this.chatService.list(this.message.to.id))
    ).subscribe(
      (messages: Array<Message>) => {
        this.messages = messages;    
        this.containerMessages.nativeElement.scrollTop = this.containerMessages.nativeElement.scrollHeight;
        
      },
      (error: ApiError)=> {
        this.apiError = error;
      }
    );
  }
  
  
  
  onClickSubmitMessage(){
    console.log(this.message);
    
    if (this.form.valid) {        
      this.chatService.sendMessage(this.message).subscribe((message: Message) => {    
        this.form.reset();
      },
      (error: ApiError) => {
        this.apiError = error;
      }
    )
  }
}

ngOnDestroy(){
  this.intervalPollingSubscription.unsubscribe();
}

}



