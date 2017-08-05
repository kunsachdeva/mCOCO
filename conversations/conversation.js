const VoiceResponse = require('twilio').twiml.VoiceResponse;
var url=require('./../constants/twilio').url
function conversation(step){
    const response = new VoiceResponse();
    let gather = null
    switch(step){
        case 1:
            gather = response.gather({
                input: 'speech dtmf',
                timeout: 90,
                numDigits: 1,
                action:url+'/conversation/2'
            });
            gather.say('Welcome!');
            gather.say('Press one if you have coconuts to sell');
        case 2:
            gather = response.gather({
                input: 'speech dtmf',
                timeout: 90,
                numDigits: 1,
                action:'/conversation/2'
            });
            response.play('http://www.sample-videos.com/audio/mp3/india-national-anthem.mp3');
    }
    return 'http://twimlets.com/echo?Twiml='+encodeURI(response.toString());
}
module.exports=conversation