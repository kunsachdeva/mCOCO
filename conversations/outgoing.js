const VoiceResponse = require('twilio').twiml.VoiceResponse;
var url=require('./../constants/twilio').url
var formatter=require('./../utils/formatter')
var db = require('../constants/firebase')

function conversation(step,isUrl,input,id){
    const response = new VoiceResponse();
    let gather = null
    switch(step){
        case 1:
            var key=db.ref().child('pickup').push({
                farmer: id,
                status:'Incomplete'
            }).key;
            id=key;
            gather = response.gather({
                input: 'speech dtmf',
                timeout: 90,
                numDigits: 1,
                action:url+'conversation/'+id.toString()+'/'+(step+1)
            });
            gather.say('Welcome!');
            gather.say('Press one if you have coconuts to sell');
            break;
        case 2:
            if(input=='1'){
                gather = response.gather({
                    input: 'speech dtmf',
                    timeout: 5,
                    numDigits: 10,
                    action:url+'conversation/'+id.toString()+'/'+(step+1)
                });
                gather.say("How many coconuts do you have?")
            }
            else {
                response.say("Thank You, Please call us later");
                response.hangup();
            }
            break;
        case 3:
            var updates = {};
            updates['/pickup/' + id+'/coconutCount'] = Number(input);
            db.ref().update(updates);
            gather = response.gather({
                input: 'speech dtmf',
                timeout: 90,
                numDigits: 1,
                action:url+'conversation/'+id.toString()+'/'+(step+1)
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
                    action:url+'conversation/'+id.toString()+'/'+(step+1)
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
            else return conversation(2,isUrl,'1',id)
            break;
        case 5:
            var day=Number(input)-1
            var dayName=formatter.getDayName(day)
            var updates = {};
            updates['/pickup/' + id+'/pickupDate'] = formatter.calculatePickupDateFromDay(day)
            updates['/pickup/' + id+'/status'] = 'Awaiting Driver'
            db.ref().update(updates);
            response.say("Congratulations!")
            response.say("Your order has been placed for upcoming "+dayName)
            break;
    }
    if(isUrl) return 'http://twimlets.com/echo?Twiml='+encodeURI(response.toString());
    else return response.toString()
}
var outgoing=conversation
module.exports=outgoing