import { DataService } from './../../services/data.service';
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
  newOrders:any[]=[]

  constructor(private dataService:DataService,private sharedData:SharedDataService) { }

  ngOnInit(): void {

    this.sharedData.currentOrder.subscribe((data:any[])=>{
      // console.log(data)
      if(data.length > 1){
        // console.log(data[0].baseCurrency.isoCode) 
      }
      this.newOrders = data
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
