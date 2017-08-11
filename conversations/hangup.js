const VoiceResponse = require('twilio').twiml.VoiceResponse;
var url=require('./../constants/twilio').url
var formatter=require('./../utils/formatter')

function hangup(){
    const response = new VoiceResponse();
    response.hangup();
    return response.toString()
}

module.exports=hangup