function getDayName(i){
    var weekday = new Array(7);
    weekday[0] = "Monday";
    weekday[1] = "Tuesday";
    weekday[2] = "Wednesday";
    weekday[3] = "Thursday";
    weekday[4] = "Friday";
    weekday[5] = "Saturday";
    weekday[6] =  "Sunday";

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