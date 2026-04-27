// get filestream module
const fs = require('fs');
const { report } = require('process');

// read the expense report file
fs.readFile('expense_report.txt', (err, data) => {

    // declare string to temporarily hold inputs
    let str = '';
    // declare array to temporarily place string inputs into
    let strArr = [];
    // declare array to hold converted ints
    let reportArr = [];

    // if error occurred, log it to the console
    if (err) {
        console.error(err);
    }

    // attach inputs to string
    str += data.toString();

    // push inputs into array based on delimiter 
    // *note that split() already returns an array
    strArr = str.split("\r\n");

    strArr.forEach( (n) => {
        // get converted value
        let num = parseInt(n);
        // push into report array
        reportArr.push(num);
    })

    // sort the report array into numerical order, from highest to lowest
    reportArr.sort(compareNums);

    // hold operands
    let op1 = 0;
    let op2 = 0; 

    // hold result
    let result = 0;

    for (index = 0; index < reportArr.length; index++) {
        // hold first value
        op1 = reportArr[index];
        // determine target
        target = 2020 - op1;

        // loop through array and try to find target
        for (i = 0; i < reportArr.length; i++) {
            if (reportArr[i] == target) {
                op2 = reportArr[i];
                result = op1 * op2;
                console.log(result);
                return;
            }
        }

    }
    
})

// supply as arg in JS sort() method to sort numbers 
// from smallest to largest
function compareNums(a, b) {
    return b - a;
}
