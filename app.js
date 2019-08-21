const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://savy:iD5MG1YKgBc1APaX@cluster0-bsqiz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect()
.then(result=>{
   return result.db("test").createCollection("ABC123");
   
})
.then(result=>{
    return result.insertOne({name:"abc",age:23});
})
.then(result=>{
    console.log(result.result);
    client.close();
})
.catch(err=>{
    console.log(err);
});

var mqtt = require('mqtt');
var mqttclient  = mqtt.connect('mqtt://test.mosquitto.org');
mqttclient.on('connect', function () {
    mqttclient.subscribe('presence', function (err) {
    if (!err) {
        mqttclient.publish('presence', 'Hello mqtt')
    }
  })
})

mqttclient.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  mqttclient.end()
})
