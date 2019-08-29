//const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://savy:iD5MG1YKgBc1APaX@cluster0-bsqiz.mongodb.net/test?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
const mongoose = require('mongoose');
const gpsImuData = require('./gpsImuModel');
mongoose.connect('mongodb+srv://savy:O5Y0j2Ml4ZzEbhJ4@cluster0-bsqiz.mongodb.net/savyDB?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
var mqtt = require('mqtt');
var mqttclient = mqtt.connect('mqtt://broker.hivemq.com:1883', { username: 'guagtchv', password: '7x4D_P5Hjiet', clientId: 'sc01', clean: true });
let client_Id = 'Tr0'
mqttclient.on('connect', function (connack) {
    if (connack.sessionPresent) {
        console.log("previous session is still available");
    }
    else {

        mqttclient.subscribe(
            {
                [`savyMqtt/trackers/${client_Id}/data`]: { qos: 1 },
                [`savyMqtt/trackers/${client_Id}/usd/result`]: { qos: 1 },
                [`savyMqtt/trackers/${client_Id}/siminfo/result`]: { qos: 1 },
            }
            , function (err) {
                if (!err) {
                    console.log("subscribed success");
                }
                else {
                    console.log(err);
                }
            });
    }
})

mqttclient.on('error', (err) => {
    //console.log(err);
});

mqttclient.on('message', function (topic, message) {
    // message is Buffer
    //mqttclient.end()
    if (topic === `savyMqtt/trackers/${client_Id}/data`) {
            
        let m =JSON.parse(message);
        console.log(m);
        new gpsImuData({
            trackerId: m.trackerId,
            dateTime: new Date(),
            latitude: m.latitude,
            longitude: m.longitude,
            imu: [
                {
                    accelx: 2.5,
                    accely: 5.6,
                    accelz: 3.2,
                    gyrox: 5.3,
                    gyroy: 2.3,
                    gyroz: 56.2
                }
            ]
        })
            .save()
            .then(result => {
                console.log("Entry saved")
            })
            .catch(error => {
               // console.log(error);
            })
    }

});

setInterval(() => {
    mqttclient.publish(`savyMqtt/trackers/${client_Id}/pull`, "pull");
}, 5000)