import { CurrencyPair } from './../../Interfaces/DataInterfaces';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-pairs',
  templateUrl: './market-pairs.component.html',
  styleUrls: ['./market-pairs.component.scss']
})
export class MarketPairsComponent implements OnInit {

  CurrencyPair:CurrencyPair[]=[]

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.fetchStaticData().subscribe((data:any)=>{
      console.log(data)
      this.CurrencyPair = data.payload.CURRENCY_PAIR
      console.log(this.CurrencyPair)
    })
  }

}
