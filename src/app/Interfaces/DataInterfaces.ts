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