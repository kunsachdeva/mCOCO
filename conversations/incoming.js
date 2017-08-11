const VoiceResponse = require('twilio').twiml.VoiceResponse;
var url=require('./../constants/twilio').url
var formatter=require('./../utils/formatter')

function incoming(){
    const response = new VoiceResponse();
    response.hangup();
    return response.toString()
}

module.exports=incoming