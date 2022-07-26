import { Transaction } from './../../Interfaces/DataInterfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {

  transaction:Transaction[] = []

  constructor() { }

  ngOnInit(): void {
    /**
     * Logic: call Api to get negotiation table
     *        start socket connection for real-time updates
    */
  }

}
