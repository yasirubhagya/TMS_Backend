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
/*const mongoose = require('mongoose');
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
                [`savyMqtt/trackers/${client_Id}/pull`]: { qos: 1 },
                
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
    console.log(message);
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
let i=0;
setInterval(() => {
    mqttclient.publish(`savyMqtt/trackers/${client_Id}/pull`,"num"+ i++);
},10)*/

var net = require('net');

// Create and return a net.Server object, the function will be invoked when client connect to this server.
var server = net.createServer(function(client) {

    console.log('Client connect. Client local address : ' + client.localAddress + ':' + client.localPort + '. client remote address : ' + client.remoteAddress + ':' + client.remotePort);

    client.setEncoding('utf-8');

    client.setTimeout(1000);

    // When receive client data.
    client.on('data', function (data) {

        // Print received client data and length.
        console.log('Receive client send data : ' + data + ', data size : ' + client.bytesRead);

        // Server send data back to client use client net.Socket object.
        client.end('Server received data : ' + data + ', send back to client data size : ' + client.bytesWritten);
    });

    // When client send data complete.
    client.on('end', function () {
        console.log('Client disconnect.');

        // Get current connections count.
        server.getConnections(function (err, count) {
            if(!err)
            {
                // Print current connection count in server console.
                console.log("There are %d connections now. ", count);
            }else
            {
                console.error(JSON.stringify(err));
            }

        });
    });

    // When client timeout.
    client.on('timeout', function () {
        console.log('Client request time out. ');
    })
});

// Make the server a TCP server listening on port 9999.
server.listen(process.env.PORT||80, function () {

    // Get server address info.
    var serverInfo = server.address();

    var serverInfoJson = JSON.stringify(serverInfo);

    console.log('TCP server listen on address : ' + serverInfoJson);

    server.on('close', function () {
        console.log('TCP server socket is closed.');
    });

    server.on('error', function (error) {
        console.error(JSON.stringify(error));
    });

});