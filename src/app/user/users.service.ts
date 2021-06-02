import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';

/**
 * UserService manages our current user
 */
@Injectable()
export class UsersService {
    // Usage:
    // Write:
    // let user1 = new User('Bob');
    // UserService.currentUser.next(user1);
    // Read:
    // UserService.currentUser.subscribe((user)=>{
        // console.log(user)
    // })
    currentUser: Subject<User> = new BehaviorSubject<User>(null);

    public setCurrentUser(newUser: User) {
        this.currentUser.next(newUser);
    }

}

