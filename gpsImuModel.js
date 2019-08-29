

const mongoose = require('mongoose');
const gpsSchema = mongoose.Schema({
    trackerId: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    imu: [
        {
            accelx: { type: Number },
            accely: { type: Number },
            accelz: { type: Number },
            gyrox: { type: Number },
            gyroy: { type: Number },
            gyroz: { type: Number }
        }
    ]

});


module.exports = mongoose.model('GpsImuData', gpsSchema);