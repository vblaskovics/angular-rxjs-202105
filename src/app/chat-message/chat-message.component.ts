import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { UsersService } from './../user/users.service';

import { Message } from './../message/message.model';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;

  constructor(public UsersService: UsersService) {
  }

  ngOnInit(): void {
  }
}
