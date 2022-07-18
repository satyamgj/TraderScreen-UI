import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  url:String = "http://localhost:3000/";

  fetch_static_data_url:String = "http://localhost:3001/"

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
  
}


