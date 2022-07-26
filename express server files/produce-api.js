const express = require("express")
const app = express()
var cors = require('cors')
const request = require('request')
const http = require('http')

//API CALL
const api_call = require("./api_helper.js")

//API URL TO SEND REQUEST
const transaction_request = "http://192.168.1.79:1030/transaction-service/transaction/processQuoteRequest"

//Adding Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log(` Producer API Server is up and running on 8000 ...`);
});

app.post('/sendQuote',(req,res)=>{
	 console.log(req.body);	
	 api_call.make_API_call(transaction_request,'POST',req)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})
