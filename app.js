const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://savy:iD5MG1YKgBc1APaX@cluster0-bsqiz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
/* client.connect()
    .then(result => {
        return result.db("test").createCollection("ABC123");

    })
    .then(result => {
        return result.insertOne({ name: "abc", age: 23 });
    })
    .then(result => {
        console.log(result.result);
        client.close();
    })
    .catch(err => {
        console.log(err);
    }); */

var mqtt = require('mqtt');
var mqttclient = mqtt.connect('mqtt://localhost:1883', { username: 'guagtchv', password: '7x4D_P5Hjiet', clientId: 'sc01', clean: false });

mqttclient.on('connect', function (connack) {
    if (connack.sessionPresent) {
        console.log("previous session is still available");
    } else {
        mqttclient.subscribe('presence/#', function (err) {
            if (!err) {
                mqttclient.publish('presence', 'Hello mqtt')
            }
        })
    }
})

mqttclient.on('error', (err) => {
    //console.log(err);
});

mqttclient.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    //mqttclient.end()
})

