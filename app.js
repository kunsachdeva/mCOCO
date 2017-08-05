var express = require('express');
var TWILIO = require('./constants/twilio')
var conversation = require('./conversations/conversation')
var app = express();
var client = require('twilio')(TWILIO.accountSsid,TWILIO.authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;

app.get('/call/:num', function(req, res) {
    client.calls.create({  
        url:conversation(1),
        to:req.params.num,
        from:TWILIO.registeredNumber
    },function(err,call){
        if(err){
            console.log(err)
        }
        else console.log(call.sid)
    })
    res.send('Calling '+req.params.num)
});

app.get('/conversation/:step',function(req,res){
    console.log(req.params)
    res.send(conversation(2))
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!')
})