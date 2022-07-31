export interface CurrencyPair{
    id:number,
    askRate:number,
    bidRate:number,
    baseCurrency:Currency,
    quoteCurrency:Currency
}

export interface Currency{
    id:number,
    isoCode:String
}

export interface Roles{
    id:number,
    roleDescription:String,
    roleName:String
}

export interface Entity{
    id:number,
    entityName:String,
    entityDescription:String
}

export interface CustomerSegment{
    id:number,
    segmentDescription:String,
    segmentName:String
}

export interface Tenor{
    id:number,
    tenorUnit:String
}

export class Transaction{
    userId: number = 0
    customerId: number = 0
    requestTypeId: number = 1
    productId: number = 1  //will be given dynamically
    parentId: number = 0
    baseCurrencyId: number = 0
    quoteCurrencyId: number = 0
    curencyPairId: number = 0
    buySellDirectionId: number = 1 //will be handled
    buyAmount: number = 0
    sellAmount: number = 0
    spotRate: SpotRate  = new SpotRate()
    swapPoint: SwapPoint  = new SwapPoint()
    outright: Outright = new Outright()
    tenorValue: number = 0
    tenorUnitId: number = 0
    sourceBankId: number = 1 // will be  modified
    destinationBankId: number = 3 // will be modified 
    uiRequestTimeStamp:String= "2022-07-20T16:29:02.071Z"
    spread: number = 0
    entityId: number = 0
    tradeDate:String = "2022-07-20T16:29:02.071Z"
    customerSegmentId: number = 0
    valueDate: String = "2022-07-20T16:29:02.071Z"
      }

export class SpotRate{
        sourceSpotRate:number=0
        sourceSpotSpread:number=0
        destinationSpotRate:number=0
}

export class SwapPoint{
        sourceSwapPoints:number=0
        sourceSwapSpread:number=0
        destinationSwapRate:number=0
}

export class Outright{
        sourceOutright:number=0
        sourceSpreadOutright:number=0
        destinationOutright:number=0
}
