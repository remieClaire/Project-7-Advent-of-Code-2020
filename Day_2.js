// get filestream module
const fs = require('fs');

/*
 * For this puzzle, I again stored the password policy into a text file.
 * Since this advent of code had two parts, I used two separate functions to store my logic.
 * The only difference between part one and part two are the conditions for adding to the total.
 * In part 1, I split the string holding the password into an array based on the target letter;
 * this would return just those letters in the string and based on the length of the array, that
 * was how many of that letter appeared in the string. If that count was between the given range,
 * it passed.
 * In part 2, I also split the string password into an array, but this time, I put in each letter. 
 * I made my own XOR function that checked whether the target letter was at one of the positions mentioned,
 * and if it did, the function would return true, prompting the total counter in the main function
 * to increment by one. 
 * 
 * Cited Sources:
 * https://www.geeksforgeeks.org/javascript/javascript-string-split-example-with-regex/  
*/

function partOne() {
    // read the password and policies text file
    fs.readFile('password_policies.txt', (err, data) => {

        // declare string to temporarily hold inputs
        let str = '';
        // declare array to place string inputs into
        let strArr = [];

        // if error occurred, log it to the console
        if (err) {
            console.error(err);
        }

        // convert data from buffer object to string
        str += data.toString();

        // push inputs into array based on delimiters space, newline, & colon
        // + means it will match one or more whitespace characters
        // *note that split() already returns an array
        strArr = str.split(/[ :\r\n]+/);

        let index = 0; 
        // keep track of how many passwords pass
        let total = 0;
        
        while (index + 2 < strArr.length) {
            let rangeArr = [];

            // range will always be the "first" value
            let range = strArr[index];
            // the "policy" will always be the "second" value
            let letter = strArr[index+1];
            // the password will always be the last value
            let password = strArr[index+2];

            // convert range to int to get max & min
            rangeArr = range.split("-");
            let min = parseInt(rangeArr[0]);
            let max = parseInt(rangeArr[1]);

            // use split to return array containing target characters
            let count = password.split(letter).length - 1;
            // if count is between range
            if (count >= min && count <= max) {
                // add to total
                total++;
            }

            // increment by 3
            index += 3;
        }
        console.log(total);

    })


}

function partTwo() {
    // read the passwords and policies text file
    fs.readFile("password_policies.txt", (err, data) => {
        // declare string to temporarily hold inputs
        let str = '';
        // declare array to place string inputs into
        let strArr = [];

        // if error occurred, log it to the console
        if (err) {
            console.error(err);
        }

        // convert data from buffer object to string
        str += data.toString();

        // push inputs into array based on delimiters space, newline, & colon
        // + means it will match one or more whitespace characters
        // *note that split() already returns an array
        strArr = str.split(/[ :\r\n]+/);

        let index = 0; 
        // keep track of how many passwords pass
        let total = 0;
        
        // loop through array
        while (index + 2 < strArr.length) {
            let positions = [];

            // positions will always be the "first" value
            let pos = strArr[index];
            // the "policy" will always be the "second" value
            let letter = strArr[index+1];
            // the password will always be the last value
            let password = strArr[index+2];

            // positions are split by a dash
            positions = pos.split("-");
            // store the positions the letter should be in
            let pos1 = parseInt(positions[0]);
            let pos2 = parseInt(positions[1]);

            // convert string password into array to make position checking easier
            // split based on any lowercase letter
            let passwordArr = password.split(/(?=[a-z])/)
           
            // store boolean pass or fail variable 
            let pass = XOR(pos1, pos2, letter, passwordArr);

            if (pass) {
                total++;
            }
            // increment by 3
            index += 3;
        }
        console.log(total);
    })
    
}

// use XOR (since its only valid if one of them is true, not both)
function XOR(pos1, pos2, char, passwd) {
    // if letter at position 1 but not at position 2, pass
    if (passwd[pos1 - 1] == char && !(passwd[pos2 - 1] == char)) {
        return true;
    }
    // if letter at position 2 but not at position 1, pass
    else if (!(passwd[pos1 - 1] == char) && passwd[pos2 - 1] == char) {
        return true;
    }
    // if none of the conditions are met (i.e. both occur or none occur), fail
    else {
        return false;
    }
}


