var express = require('express');
var TWILIO = require('./constants/twilio')
var conversation = require('./conversations/conversation')
var hangup = require('./conversations/hangup')
const bodyParser = require('body-parser');
var app = express();
var client = require('twilio')(TWILIO.accountSsid,TWILIO.authToken);

console.log(hangup())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/call/:num', function(req, res) {
    client.calls.create({  
        url:conversation(1,true,null,req.params.num),
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

app.post('/voice',function(req,res){
    res.writeHead(200,{'Content-Type':'text/xml'})
    res.end(hangup())
})

app.post('/conversation/:num/:step',function(req,res){
    res.send(conversation(Number(req.params.step),false,req.body.Digits,req.params.num))
})

app.listen((process.env.PORT)?process.env.PORT:3000, function () {
  console.log('Example app listening on port 3000!')
})