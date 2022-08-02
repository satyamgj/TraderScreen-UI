import { Roles } from './../../Interfaces/DataInterfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  email:String = "";
  verificationCode:String = "";
  userRole:number = 0;
  QRCode:any;

  roles:Roles[] = [];

  @ViewChild('showQRCode',{static:true}) showQRCode:any;

  constructor(private dataService:DataService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private router:Router) { }

  ngOnInit(): void {

    /* 
    * Below code is to load Static Data
    */
    this.dataService.fetchStaticData().subscribe((data:any)=>{
      console.log(data)
      this.roles = data.payload.USER_ROLE
      console.log(this.roles)
    })
  }

   /* 
    * Below code is to load ask for QR Code
    */
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

    /* 
    * Below code is to register user
    */
  register(){
    console.log("Signin in.. Please Wait");
    this.dataService.signIn(this.email,this.verificationCode).subscribe((result:any)=>{
      console.log(result)
      if(result){
        console.log("SignUp successfull!");
        let _json : any = {
          "emailAddress":this.email,
          "userRoleId": this.userRole
        }
        this.dataService.register(_json);
        this.router.navigate(['exchange'])
      }
      else{
        console.log("SignUp failed");
      }
    })
  }

  closeEditActionModal(_modal:any){
    _modal.close('Close click')
  }
}
