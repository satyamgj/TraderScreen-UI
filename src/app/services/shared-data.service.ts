import { openOrders, Transaction } from './../Interfaces/DataInterfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private placedOrders = new BehaviorSubject<any>([]);
  currentOrder =  this.placedOrders.asObservable();

  constructor() { }

  updateOrder(_json:any){
    this.placedOrders.next(_json);
  }
}
