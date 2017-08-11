const VoiceResponse = require('twilio').twiml.VoiceResponse;
var url=require('./../constants/twilio').url
var formatter=require('./../utils/formatter')
var db = require('../constants/firebase')
var consolere = require('console-remote-client').connect('console.re','80','mcoco');

function incoming(req){
    const response = new VoiceResponse();
    response.hangup();
    return response.toString()
}

module.exports=incoming