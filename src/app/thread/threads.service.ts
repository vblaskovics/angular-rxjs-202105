import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Message } from "../message/message.model";
import { MessagesService } from "../message/messages.service";
import { Thread } from "./thread.model";

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;
  orderedThreads: Observable<Thread[]>;

  constructor(public messagesService: MessagesService) {
    this.threads = messagesService.messages.pipe(
      map((messages: Message[]) => {
        const threads: { [key: string]: Thread } = {};

        messages.map((message: Message) => {
          threads[message.thread.id] =
            threads[message.thread.id] || message.thread;

          const messsagesThread: Thread = threads[message.thread.id];
          if (
            !messsagesThread.lastMessage ||
            messsagesThread.lastMessage.sentAt < message.sentAt
          ) {
            messsagesThread.lastMessage = message;
          }
        });

        return threads;
      })
    );

    this.orderedThreads = this.threads.pipe(
      map((threadsObj: { [key: string]: Thread }) => {
        const threads: Thread[] = Object.values(threadsObj);
        return threads.sort(
          (t1, t2) =>
            t2.lastMessage.sentAt.getTime() - t1.lastMessage.sentAt.getTime()
        );
      })
    );
  }
}
