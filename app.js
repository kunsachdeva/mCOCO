var express = require('express');
var TWILIO = require('./constants/twilio')
var CONSTANTS = require('./constants/constants')
var outgoing = require('./conversations/outgoing')
const bodyParser = require('body-parser');
var app = express();
var client = require('twilio')(TWILIO.accountSsid,TWILIO.authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;
var db = require('./constants/firebase')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var consolere = require('console-remote-client').connect('console.re','80','moafarmsms');
console.re.log({a:true})

app.get('/call/:num', function(req, res) {
    console.log(req.params.num)
    client.calls.create({  
        url:outgoing(1,true,null,req.params.num),
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

app.post('/incoming',function(req,res){
    setTimeout(function(){
        client.calls.create({  
            url:outgoing(1,true,null,req.body.From),
            to:req.body.From,
            from:TWILIO.registeredNumber
        },function(err,call){
            if(err){
                console.log(err)
            }
            else console.log(call.sid)
        })
    },CONSTANTS.waitTime)//1 minute(s)
    res.writeHead(200,{'Content-Type':'text/xml'})
    const response = new VoiceResponse();
    response.hangup();
    res.end(response.toString())
})

app.post('/conversation/:num/:step',function(req,res){
    res.send(outgoing(Number(req.params.step),false,req.body.Digits,req.params.num))
})

app.listen((process.env.PORT)?process.env.PORT:3000, function () {
  console.log('Example app listening on port 3000!')
})