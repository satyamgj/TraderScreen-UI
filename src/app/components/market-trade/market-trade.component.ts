import { DataService } from 'src/app/services/data.service';
import { Entity, CustomerSegment, Tenor } from './../../Interfaces/DataInterfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-trade',
  templateUrl: './market-trade.component.html',
  styleUrls: ['./market-trade.component.scss']
})
export class MarketTradeComponent implements OnInit {

  entity:number = 0;
  customerSegment:number = 0;
  tenor:number=0;
  entityList:Entity[]=[]
  customerSegmentType:CustomerSegment[]=[]
  tenorList:Tenor[]=[];
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.fetchStaticData().subscribe((data:any)=>{
      console.log(data)
      this.entityList = data.payload.ENTITY
      this.customerSegmentType = data.payload.CUSTOMER_SEGMENT
      this.tenorList = data.payload.TENOR
    })
  }

}
