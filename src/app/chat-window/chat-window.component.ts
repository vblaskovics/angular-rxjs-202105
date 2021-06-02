import {
  Component,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { UsersService } from '../user/users.service';
import { ThreadsService } from '../thread/threads.service';
import { MessagesService } from '../message/messages.service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
 
  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public UsersService: UsersService,
              public el: ElementRef) {
  }

  ngOnInit(): void {
   
  }

  
}
