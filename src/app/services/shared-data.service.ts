import { openOrders } from './../Interfaces/DataInterfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private placedOrders = new BehaviorSubject<openOrders>(new openOrders());
  currentOrder =  this.placedOrders.asObservable();

  constructor() { }

  updateOrder(_json:openOrders){
    this.placedOrders.next(_json);
  }
}
