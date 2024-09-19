arrayOfCrons = ["01 13 * * 3,4",
    "09 05 * * 1,3,5",
    "45 09 * * 2,4",
    null,
    "33 18 * * 0",
];
// output = []; // "At 12:30 on Monday and Thursday." // 'min hr * * day(s)'


/** solution */

// cron expression destructured 
// "* * * * *"
//  | | | | |
//  | | | | |
//  | | | | day of the week
//  | | | month
//  | | day of month
//  | hour
//  minute

const weekDays = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
]

/**
 * converts a cron expression into a human readble format
 *  
 * @param {Array} cronExpression - this is used for splitting or destructuring the single array item provided to this function by cronToDays function  
 * @returns returns a transformaed formatted string from the cron expression
 * **/
function findScheduledDay(cronExpression) {
    if (!cronExpression) return 'No expression found!!'

    // to access the values of cron expression into an individual components such as minute , hour dayOfMonth, month, dayOfTheWeek
    const [minute, hour, dayOfMonth, month, dayOfTheWeek] = cronExpression
    
    // this is formatting time with zero padding if needed
    const timeString = `At ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`

    // check for the re-occourence by identifying if * is present in the variable called as dayOfTheWeek
    if (dayOfTheWeek === '*') {
        return `${timeString} every day of the week`;
    }
    // split dayOfTheWeek string into an Array and map it to the weekDays and handle the invalid value nicely 
    const daysInExpression = dayOfTheWeek.split(',').map(day => weekDays[day] || 'Invalid Day Expression')
      
    // format the day in the correct way if there are multiple days present eg  "09 05 * * 1,3,5" -  1,3 &5 are the multiple days 
    const formattedDays = daysInExpression.length > 1 ? formatDays(daysInExpression) : daysInExpression[0]
    const output = `${timeString} on ${formattedDays}`

    return output
}

/**
 * helper function which formats days into a readable string 
 * 
 * @param {Array} days - accepts the arguments in the form of array which are a array of strings  
 * @returns return a formatted string which includes a comma & "and" " following with the last value of the array present in the array of days recieved in the arguments 
 * **/
function formatDays(days) {
    return days.slice(0, -1).join(', ') + ' and ' + days[days.length - 1]
}

/**
 * processes the array of cron expression supplied to the function named by cronToDays and return the array of string readable to humans 
 * 
 * @param {Array} args Array of cron expressions ( "09 05 * * 1,3,5", ["45 09 * * 2,4" ]) 
 * @returns {Array} array of formatted strings for each cron expression 
 * **/
function cronToDays(args) {
    const arrayOfCronExpressions = args
    
    //looping over array of arayOfCronExpression to find each element which is later to be processed into a human readable format
    //used optional chaining to safely handle the cases where args/arrayPfCornExpression or indivisual element is null or undefined
    const output = arrayOfCronExpressions?.map(element => {
        // spliting the cron expression i.e "01 13 * * 3,4" to indivisual array components for eg, [ '01', '13', '*', '*', '3,4' ]
        const expression = element?.split(' ')
        return findScheduledDay(expression)
    });
    return output
}

console.log(cronToDays(arrayOfCrons))

