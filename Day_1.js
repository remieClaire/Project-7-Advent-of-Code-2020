// get filestream module
const fs = require('fs');

/* 
 * To solve this puzzle, I first stored the expense report in a file input
 * to read from. I converted the buffer data into a string (str) and then split the string
 * based on the delimiter "\r\n" which is carriage return & newline. I stored that input
 * into an array (strArr) and looping through each value, I converted each string into an int
 * and stored it in another array (reportArr). I sorted the array from greatest to least
 * and used a nested for loop to find both operands. The first loop holds one number at a time
 * and determines the second number I need for both to equal 2020. The second loop loops through
 * the entire array and if it finds the target number, it computes the result and logs it.
 * 
 * Cited Sources:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 
 */

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
            // if the target has been found while looping again
            if (reportArr[i] == target) {
                // hold the result
                op2 = reportArr[i];
                // multiply together
                result = op1 * op2;
                // log result to console
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
