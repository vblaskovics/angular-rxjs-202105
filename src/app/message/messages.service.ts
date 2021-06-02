import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { Message } from './message.model';
import { filter, scan, publishReplay, refCount } from 'rxjs/operators'

const initialMessages: Message[] = [];

interface IMessageOperation extends Function {
  (messages: Message[]): Message[]
}

@Injectable()
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();

  constructor() {
    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessageOperation) => {
        return operation(messages);
      }, initialMessages),
      publishReplay(1),
      refCount()
    )

    
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user:User): Observable<Message>{
    return this.newMessages.pipe(
      filter((message:Message)=>{
        return message.thread.id === thread.id && message.author.id !== user.id;
      })
    );
  }

}
