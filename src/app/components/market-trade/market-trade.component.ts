import { DataService } from 'src/app/services/data.service';
import { Entity, CustomerSegment, Tenor, Outright, SpotRate, SwapPoint, Transaction, Currency } from './../../Interfaces/DataInterfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-trade',
  templateUrl: './market-trade.component.html',
  styleUrls: ['./market-trade.component.scss']
})
export class MarketTradeComponent implements OnInit {

  

  entityList:Entity[]=[]
  customerSegmentType:CustomerSegment[]=[]
  tenorList:Tenor[]=[];
  currencyList:Currency[]=[]

  //Transaction Parameters
  userId!: number
  customerId!: number
  requestTypeId!: number
  productId: number = 1
  parentId: number = 0
  baseCurrencyId: number=0
  quoteCurrencyId: number=0 
  curencyPairId!: number 
  buySellDirectionId: number = 0
  buyAmount!: number
  sellAmount!: number 
  spotRate!: SpotRate 
  swapPoint!: SwapPoint 
  outright!: Outright 
  tenorValue!: number 
  tenorUnitId: number = 0
  sourceBankId!: number 
  destinationBankId!: number
  uiRequestTimeStamp:String= "2022-07-20T16:29:02.071Z"
  spread!: number
  entityId: number = 0
  tradeDate:String = "2022-07-20T16:29:02.071Z"
  customerSegmentId: number = 0  
  valueDate: String = "2022-07-20T16:29:02.071Z"

  //Spot rate data points
  bankSpotRate!:number
  bankSpotSpread!:number
  clientSpotRate!:number
  
  //Swap rate data points
  bankSwapPoints!:number
  bankSwapSpread!:number
  clientSwapRate!:number

  //Outright data points
  bankOutright!:number
  spreadOutright!:number
  clientOutright!:number

  //Setting Buy/Sell flag
  buyFlag:boolean = true
  sellFlag:boolean = true

  transaction:Transaction = new Transaction();

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.fetchStaticData().subscribe((data:any)=>{
      console.log(data)
      this.entityList = data.payload.ENTITY
      this.customerSegmentType = data.payload.CUSTOMER_SEGMENT
      this.tenorList = data.payload.TENOR
      this.currencyList = data.payload.CURRENCY
    })
  }

  requestQuote(){
    //setting transaction
    this.transaction.entityId = this.entityId
    this.transaction.customerId = this.customerId
    this.transaction.userId = this.userId
    this.transaction.customerSegmentId = this.customerSegmentId
    this.transaction.tradeDate = this.tradeDate
    this.transaction.valueDate = this.valueDate
    this.transaction.curencyPairId = this.curencyPairId
    this.transaction.tenorUnitId = this.tenorUnitId
    this.transaction.baseCurrencyId = this.baseCurrencyId
    this.transaction.quoteCurrencyId = this.quoteCurrencyId
    this.transaction.buyAmount = this.buyAmount
    this.transaction.sellAmount = this.sellAmount
    this.transaction.spotRate.sourceSpotRate = this.bankSpotRate
    this.transaction.spotRate.sourceSpotSpread = this.bankSpotSpread
    this.transaction.spotRate.destinationSpotRate = this.clientSpotRate
    this.transaction.swapPoint.sourceSwapPoints = this.bankSwapPoints
    this.transaction.swapPoint.sourceSwapSpread = this.bankSwapSpread
    this.transaction.swapPoint.destinationSwapRate = this.clientSwapRate
    this.transaction.outright.sourceOutright = this.bankOutright
    this.transaction.outright.sourceSpreadOutright = this.spreadOutright
    this.transaction.outright.destinationOutright = this.clientOutright
    this.transaction.userId = 2

    console.log(this.transaction)
    
    this.dataService.sendQuoteRequest(this.transaction).subscribe((_result)=>{
      console.log(_result)
    })

  }

  /**
   * Below method is to set product ID
   * Default set to 1
   **/
  setProductId(_productId:number){
    console.log(_productId);
    if(_productId == 1 ){
      this.transaction.productId = 1
    }
    else if(_productId == 2 ){
      this.transaction.productId = 2
    }
    else if(_productId == 3 ){
      this.transaction.productId = 3
    }
    else{
      this.transaction.productId = 4
    }
  }

  directionActive(){
 
    if(this.buyAmount > 0){
      this.transaction.buySellDirectionId = 1
      this.sellFlag = false
      this.sellAmount = 0
    }
    
    if(this.sellAmount > 0){
      this.transaction.buySellDirectionId = 2
      this.buyFlag = false
      this.buyAmount = 0
    }

    if(this.buyAmount == null || this.sellAmount == null){
      this.buyFlag = true
      this.sellFlag = true
    }

  }
}
