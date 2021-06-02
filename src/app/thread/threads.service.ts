import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { Thread } from './thread.model';

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key:string]: Thread }>;

  constructor(public messagesService: MessagesService) {
    this.threads = messagesService.messages.pipe(
      map((messages: Message[]) => {
        const threads: { [key:string] : Thread } = {};

        messages.map((message: Message)=>{
          threads[message.thread.id] = threads[message.thread.id] || message.thread;

          const messsagesThread: Thread = threads[message.thread.id]
          if(!messsagesThread.lastMessage || messsagesThread.lastMessage.sentAt < message.sentAt) {
            messsagesThread.lastMessage = message;
          }
        })

        return threads;
      })
    )
  }
}
