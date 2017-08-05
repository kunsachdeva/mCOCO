const VoiceResponse = require('twilio').twiml.VoiceResponse;
var url=require('./../constants/twilio').url
function conversation(step,isUrl,input){
    const response = new VoiceResponse();
    let gather = null
    switch(step){
        case 1:
            gather = response.gather({
                input: 'speech dtmf',
                timeout: 90,
                numDigits: 1,
                action:url+'conversation/2'
            });
            gather.say('Welcome!');
            gather.say('Press one if you have coconuts to sell');
        case 2:
            response.say('You pressed '+input);
    }
    if(isUrl) return 'http://twimlets.com/echo?Twiml='+encodeURI(response.toString());
    else return response.toString()
}
module.exports=conversation