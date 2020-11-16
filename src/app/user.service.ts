import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private lowDate = new BehaviorSubject<number>(2015);
  private highDate = new BehaviorSubject<number>(2020);

  castHighDate = this.highDate.asObservable();
  castLowDate = this.lowDate.asObservable();

  constructor() { }

  editUser(lDate, hDate){
    this.highDate.next(hDate);
    this.lowDate.next(lDate);
  }
}
