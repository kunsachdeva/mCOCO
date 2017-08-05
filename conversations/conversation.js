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
                action:url+'conversation/'+(step+1)
            });
            gather.say('Welcome!');
            gather.say('Press one if you have coconuts to sell');
            break;
        case 2:
            if(input=='1'){
                gather = response.gather({
                    input: 'speech dtmf',
                    timeout: 15,
                    numDigits: 10,
                    action:url+'conversation/'+(step+1)
                });
                gather.say("How many coconuts do you have?")
            }
            else {
                response.say("Thank You, Please call us later");
                response.hangup();
            }
            break;
        case 3:
            gather = response.gather({
                input: 'speech dtmf',
                timeout: 90,
                numDigits: 1,
                action:url+'conversation/'+(step+1)
            });
            gather.say("You entered "+Number(input)+" coconuts.")
            gather.say("Press One if that is correct")
            gather.say("Otherwise press Two.")
            break;
        case 4:
            if(input=="1"){
                gather = response.gather({
                    input: 'speech dtmf',
                    timeout: 90,
                    numDigits: 1,
                    action:url+'conversation/'+(step+1)
                });
                gather.say("Which day would you prefer for collection?")
                gather.say("Press One for Monday")
                gather.say("Press Two for Tuesday")
                gather.say("Press Three for Wednesday")
                gather.say("Press Four for Thursday")
                gather.say("Press Five for Friday")
                gather.say("Press Six for Saturday")
                gather.say("Press Seven for Sunday")
            }
            else return conversation(2,isUrl,'1')
            break;
    }
    if(isUrl) return 'http://twimlets.com/echo?Twiml='+encodeURI(response.toString());
    else return response.toString()
}

function handleStep2(input){
    if(input=='1'){

    }
}

module.exports=conversation