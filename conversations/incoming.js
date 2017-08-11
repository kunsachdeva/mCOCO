const VoiceResponse = require('twilio').twiml.VoiceResponse;
var url=require('./../constants/twilio').url
var formatter=require('./../utils/formatter')
var db = require('../constants/firebase')

function incoming(req){
    var key=db.ref().child('test').push({
        farmer: req
    }).key;
    const response = new VoiceResponse();
    response.hangup();
    return response.toString()
}

module.exports=incoming