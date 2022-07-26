const express = require("express")
const app = express()
var cors = require('cors')
const request = require('request')
const http = require('http')
const cookie =require('cookie-parser')
const jwt = require('jsonwebtoken')

//API CALL
const api_call = require("./api_helper.js")

//SECRET KEY Todo:To be centralised
const SECRET_KEY = 'tsejjjzdsf'

//API URL TO SEND REQUEST
const transaction_request = 'http://192.168.1.7:1029/'

//Adding Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());

app.listen(3000, () => {
  console.log(` SignIn API Server is up and running on 3000 ...`);
});

app.post('/signIn',(req,res)=>{
	 console.log(req.body);	
	 /**
	 * Generating JWT token
	 */
	 const jwtToken = jwt.sign(req.body,SECRET_KEY)

	 /**
		Storing in cookie with name : signIn token
	 */

	 /**
		logic to verify
	 */



	 let api_url  = transaction_request + "generate/" + req.body.email 
	 console.log("sending quote to ->" + api_url)
	 api_call.make_API_call(api_url,'GET',req)
    .then(response => {
        res.json(response)

   //      cookie("signInToken",jwtToken,{
	 	// httpOnly:true
		 // })
     // console.log(res.cookies.signInToken)
	 // console.log(jwt.verify(signInToken,SECRET_KEY))
    })
    .catch(error => {
        res.send(error)
    })
})

/*

* To Validate the code

*/

app.post('/validate',(req,res)=>{
	 console.log("validate - > ")
	 console.log (req.body)	
	 let api_url  = transaction_request + "validate/key/" 
	 console.log("sending quote to -> " + api_url)
	 api_call.make_API_call(api_url,'POST',req)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})

/**
* TO Register user
*/
app.post('/register',(req,res)=>{
	 console.log("register - >") 
	 console.log(req.body);	
	 let api_url  = transaction_request + "register-user" 
	 console.log("sending quote to -> " + api_url)
	 api_call.make_API_call(api_url,'POST',req)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})