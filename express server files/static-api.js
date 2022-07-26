const express = require("express")
const app = express()
var cors = require('cors')
const request = require('request')
const http = require('http')

//API CALL
const api_call = require("./api_helper.js")

//API URL TO SEND REQUEST
const static_data_request = 'http://192.168.1.7:1028/loadStaticData'

//Adding Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log(` Static Data fetch API Server is up and running on 3001 ...`);
});

app.get('/fetchStaticData',(req,res)=>{
	 //console.log(req.body);	
	 //console.log("Hitting to fetch static data ->" + static_data_request)
	 api_call.make_API_call(static_data_request,'GET',req)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})

