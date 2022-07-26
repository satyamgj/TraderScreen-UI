import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-markets-list',
  templateUrl: './markets-list.component.html',
  styleUrls: ['./markets-list.component.scss']
})
export class MarketsListComponent implements OnInit {

  orders:any[]=[];
  _topicName:string="";

  constructor(private socket:Socket, private dataService:DataService) { }


  ngOnInit(): void {    
    console.log("Welcome to the banking portal of FinMamba!")
    // this.Bank = this.dataService.getBank()
    // console.log(this.Bank);
    this.dataService.initiateSocket("KANJI").subscribe((data)=>{
          console.log(data);
    })
    //console.log("Listening to: "+ "KANJI_" + this.bankName);
      this._topicName = "KANJI_"+"REQUESTS";
      this.fetchOrderRequests(this._topicName).subscribe((msg:any)=>{
         console.log(this._topicName + "->" + msg);
     })
  }

  fetchOrderRequests(_topic:string){
    console.log("Fetching Price from: " + _topic)
    return this.socket.fromEvent(_topic)
  }

}
