function getDayName(i){
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[i];
}

function calculatePickupDateFromDay(day){
    var date=new Date()
    var today=(new Date()).getDay();
    if(today==day)date.setDate(date.getDate()+7)
    else if(today>day)date.setDate(date.getDate()+7-day-today)
    else if(today<day)date.setDate(date.getDate()+day-today)
    return date
}

module.exports.getDayName=getDayName
module.exports.calculatePickupDateFromDay=calculatePickupDateFromDay