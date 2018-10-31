import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../models/message.model';
import { SessionService } from '../../../shared/services/session.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {
  @Input() message: Message;
  @Input() meId: string;

  constructor(private sessionService: SessionService) { }
  
  ngOnInit() {
  }
  
}