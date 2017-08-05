var express = require('express');
var TWILIO = require('./constants/twilio')
var conversation = require('./conversations/conversation')
const bodyParser = require('body-parser');
var app = express();
var client = require('twilio')(TWILIO.accountSsid,TWILIO.authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/call/:num', function(req, res) {
    client.calls.create({  
        url:conversation(1,true,null),
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

app.post('/conversation/:step',function(req,res){
    res.send(conversation(Number(req.params.step),false,req.body.Digits))
})

app.listen((process.env.PORT)?process.env.PORT:3000, function () {
  console.log('Example app listening on port 3000!')
})