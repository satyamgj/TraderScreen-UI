import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  url:String = "http://localhost:3000/";

  fetch_static_data_url:String = "http://localhost:3001/";

  quoteRequest:String="http://localhost:8000/";

  socket_url:String="http://localhost:8001/";


  getBank(){
    //Will have an API
    return 'HDFC';
  }
  getBroker(){
    //Will have an API
    return 'KANJI';
  }
  initiateSocket(_bank:string){
    //Might get Brokers in this parameter
    console.log("Starting publishers")
    //Hit consumerapi
    switch(_bank){
      case "HDFC": {
        console.log("Starting Socket connection HDFC-BROKER")
        return this.http.get(this.socket_url+"quoterequests/HDFC");
      }
      case "KANJI":{
        console.log("Starting Socket connection for KANJI to get all the requests ")
        return this.http.get(this.socket_url+"quoterequests/KANJI");
      }
      default:{
        return this.http.get(this.socket_url+"invalidBank");
      }
    }
  }

  sendQuote(email:String){
    const header = { 'content-type': 'application/json'} 
    let final_url = this.url + "signIn";
    let _json = {
      "email":email
    }
    return this.http.post(final_url,_json,{'headers':header})
  }

  signIn(_email:String, _code:String){
    const header = { 'content-type': 'application/json'}
    let final_url =this.url + "validate"
    let _json:any = {
     "emailAddress": _email,
     "verificationCode":_code
    }
    return this.http.post(final_url,_json,{'headers':header})
  }

  fetchStaticData(){
    let final_url = this.fetch_static_data_url + "fetchStaticData"
    return this.http.get(final_url)
  }

  register(_json:any){
    const header = { 'content-type': 'application/json'}
    let final_url =this.url + "register"
    return this.http.post(final_url,_json,{'headers':header})
  }

  sendQuoteRequest(_json:any){
    const header = { 'content-type': 'application/json'}
    let final_url =this.quoteRequest + "sendQuote"
    return this.http.post(final_url,_json,{'headers':header})
  }
  
}


