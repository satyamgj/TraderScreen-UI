import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  url:String = "http://localhost:3000/";

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
     "username": _email,
     "code":_code
    }
    return this.http.post(final_url,_json,{'headers':header})
  }
  
}


