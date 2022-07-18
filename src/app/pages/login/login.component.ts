import { DataService } from './../../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:String = "";
  verificationCode:String = "";
  QRCode:any;

  @ViewChild('showQRCode',{static:true}) showQRCode:any;

  constructor(private dataService:DataService,
              private modalService: NgbModal,
              private sanitizer: DomSanitizer,
              private router:Router) { }

  ngOnInit(): void {
  }


  sendCode(){
    console.log("Sending code to " + this.email);
    this.dataService.sendQuote(this.email).subscribe((result:any)=>{

      let objectURL = 'data:image/jpeg;base64,' + result;
      console.log(objectURL);
      this.QRCode = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.modalService.open(this.showQRCode, {centered:true, scrollable:false,backdrop:'static'});
      console.log(result);

    })
  }

  signIn(){
    console.log("Signin in.. Please Wait");
    this.dataService.signIn(this.email,this.verificationCode).subscribe((result:any)=>{
      console.log(result)
      if(result){
        console.log("SignIn successfull!");
        this.router.navigate(['exchange'])
      }
      else{
        console.log("Tumse na ho paega! Bhakkk Bhencho");
      }
    })
  }

}
