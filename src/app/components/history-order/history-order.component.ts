import { Transaction, openOrders } from './../../Interfaces/DataInterfaces';
import { SharedDataService } from './../../services/shared-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit {

  editableCell:string = "2:04PM";
  newOrders:openOrders[]=[]

  constructor(private sharedData:SharedDataService) { }

  ngOnInit(): void {
    this.newOrders.splice(0,1)
    this.sharedData.currentOrder.subscribe((data:openOrders)=>{
      // if(this.newOrders[0].orderId == 0){
      //   this.newOrders.splice(0,1);
      // }
      
      if(data.sourceId == 1){
        this.newOrders.push(data);
      }
    })
  }

  expandContent = true;
  data1 = [{
    'name': 'john',
    'place': 'forest',
    'phone': '124-896-8963',
    'expanded': false
  }, {
    'name': 'Jay',
    'place': 'City',
    'phone': '124-896-1234',
    'expanded': false
  }, {
    'name': 'Joseph',
    'place': 'sky',
    'phone': '124-896-9632',
    'expanded': false
  },
  ]
 
  data2 = [{
    'whoseData': 'john',
    'datades': {
      'name': 'john',
      'hobbies': 'singing',
      'profession': 'singer'
    }
  }, 
  {
    'whoseData': 'john',
    'datades': {
      'name': 'john',
      'hobbies': 'singing',
      'profession': 'singer'
    }
  },
  {
    'whoseData': 'Jay',
    'datades': {
      'name': 'jay',
      'hobbies': 'coding',
      'profession': 'coder'
    }
  }, {
    'whoseData': 'Jay',
    'datades': {
      'name': 'jay',
      'hobbies': 'testing',
      'profession': 'tester'
    }
  }
  ]
 
  findDetails(data:any) {
    return this.data2.filter(x => x.whoseData === data.name);
  }
 
  callBack(){
    console.log("Time changed: ")
  }
}
