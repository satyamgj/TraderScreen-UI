const express = require("express")
const app = express()
var cors = require('cors')
const request = require('request')
const http = require('http')

//API CALL
const api_call = require("./api_helper.js")

//API URL TO SEND REQUEST
const transaction_request = 'http://192.168.1.73:8080/'

//Adding Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log(` SignIn API Server is up and running on 3000 ...`);
});

app.post('/signIn',(req,res)=>{
	 console.log(req.body);	
	 let api_url  = transaction_request + "generate/" + req.body.email 
	 console.log("sending quote to ->" + api_url)
	 api_call.make_API_call(api_url,'GET',req)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})

/*

* To Validate the code

*/

app.post('/validate',(req,res)=>{
	 console.log(req.body);	
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