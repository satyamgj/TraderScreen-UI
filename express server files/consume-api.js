require('events').EventEmitter.defaultMaxListeners = 0
const express = require("express");
const app = express();
var cors = require('cors')
const request = require('request');
const http = require('http');
const {Kafka} = require("kafkajs")


//API CALL
const api_call = require("/home/dell/Downloads/qinif/FronteEnd/api_helper.js")

//Setting HTTP server
const server = http.Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

//Adding middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


io.on('connection', (socket) => {
    console.log('user connected');
});

server.listen(8001, () => {
    console.log(`Consumer API started on port: 8001`);
});

// the client ID lets kafka know who's producing the messages
const clientId = "consumer-group-1"
const clientId_HDFC = "consumer-group-HDFC"
const clientId_ICICI = "consumer-group-ICICI"
const clientId_SBI = "consumer-group-SBI"
const clientId_KANJI = "consumer-group-KANJI"
// we can define the list of brokers in the cluster
const brokers = ["192.168.1.7:9092"]

const kafka = new Kafka({ clientId, brokers })
const kafka_HDFC = new Kafka({ clientId_HDFC, brokers })
const kafka_ICICI = new Kafka({ clientId_ICICI, brokers })
const kafka_SBI = new Kafka({ clientId_SBI, brokers })
const kafka_KANJI = new Kafka({ clientId_KANJI, brokers })

const consumer = kafka.consumer({ groupId: clientId })
const consumer_HDFC = kafka_HDFC.consumer({ groupId: clientId_HDFC })
const consumer_ICICI = kafka_ICICI.consumer({ groupId: clientId_ICICI })
const consumer_SBI = kafka_SBI.consumer({ groupId: clientId_SBI })
const consumer_KANJI = kafka_KANJI.consumer({ groupId: clientId_KANJI })

//DEFAULT END POINT
app.get("/invalidBank",(req,res)=>{
	res.send("The Bank is not registered.")
})

//API END POINT FOR RESPONSE FROM ALL THE QUOTES FOR HDFC
app.get("/quoterequests/HDFC", (req, res)=>{
 console.log("inside quoterequests_HDFC");
 const topic = "KANJI_HDFC"
 res.send(consume_HDFC(topic).catch((err) => {
 	  	console.error("error in consumer: ", err)
 }))
 })

//API END POINT FOR RESPONSE FROM ALL THE QUOTES FOR ICICI
app.get("/quoterequests/ICICI",(req,res)=>{
 console.log("inside quoterequests_ICICI");
 const topic = "KANJI_ICICI"
 res.send(consume_ICICI(topic).catch((err) => {
 	  	console.error("error in consumer: ", err)
 }))
})

//API END POINT FOR REPSONSE FROM ALL THE QUOTES FOR SBI
app.get("/quoterequests/SBI",(req,res)=>{
 console.log("inside quoterequests_SBI");
 const topic = "KANJI_SBI"
 res.send(consume_SBI(topic).catch((err) => {
 	  	console.error("error in consumer: ", err)
 }))
})

//API END POINT FOR REQUESTS FROM ALL THE BANKS FOR KANJI
app.get("/quoterequests/KANJI",(req,res)=>{
 console.log("inside quoterequests_KANJI");
 const topic = "KANJI_REQUESTS"
 res.send(consume_KANJI(topic).catch((err) => {
 	  	console.error("error in consumer: ", err)
 }))
})

const consume_HDFC = async (topic) => {
	// first, we wait for the client to connect and subscribe to the given topic
	console.log(topic);
	await consumer_HDFC.connect()
	await consumer_HDFC.subscribe({ topic })
	await consumer_HDFC.run({
		// this function is called every time the consumer gets a new message

		eachMessage: ({ message }) => {
			
					console.log(`received message HDFC: ${message.value}`)
					io.emit(topic,`${message.value}`)
		},
	})
}

const consume_ICICI = async (topic) => {
	// first, we wait for the client to connect and subscribe to the given topic
	console.log(topic);
	await consumer_ICICI.connect()
	await consumer_ICICI.subscribe({ topic })
	await consumer_ICICI.run({
		// this function is called every time the consumer gets a new message

		eachMessage: ({ message }) => {
					
					console.log(`received message ICICI: ${message.value}`)
					io.emit(topic,`${message.value}`)
		},
	})
}

const consume_SBI = async (topic) => {
	// first, we wait for the client to connect and subscribe to the given topic
	console.log(topic);
	await consumer_SBI.connect()
	await consumer_SBI.subscribe({ topic })
	await consumer_SBI.run({
		// this function is called every time the consumer gets a new message

		eachMessage: ({ message }) => {
					
					console.log(`received message SBI: ${message.value}`)
					io.emit(topic,`${message.value}`)
		},
	})
}

const consume_KANJI = async (topic) => {
	// first, we wait for the client to connect and subscribe to the given topic
	console.log(topic);
	await consumer_KANJI.connect()
	await consumer_KANJI.subscribe({ topic })
	await consumer_KANJI.run({
		// this function is called every time the consumer gets a new message

		eachMessage: ({ message }) => {
					
					console.log(`received message SBI: ${message.value}`)
					io.emit(topic,`${message.value}`)
		},
	})
}