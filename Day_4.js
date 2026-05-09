// get filestream module
const fs = require('fs');

/*
 * Since this puzzle has two parts, I again split my code into two functions. 
 * For part 1, I noticed that each entry in the text file was separated by one
 * giant newline- so, I separated each entry based on that using the split() method
 * and stored each entry in an array. However, even after doing that, entries 
 * were split via just an empty space ''. Fortunately, I was able to use this
 * empty space to my advantage by marking it as a separator between entries. So in my loop,
 * whenever I hit an empty space, I sent my entire entry into a check function. Using the functions
 * every() and includes() together, the entry would pass so long as every field was in it. 
 * If this function returned true, then the total would be incremented. 
 * 
 * For part two, I tried implementing the same solution but using regex. Unfortunately, I wasn't
 * able to recreate it using regex for reasons I couldn't figure out in time. I had to switch out
 * includes() with test() since a quick google search told me that includes() didn't work with regex
 * functions. 
 *
 * 
 * Cited Sources:
 * https://www.js-craft.io/blog/javascript-includes-multiple-values/ 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
*/

function partOne() {
    // read the passports file
    fs.readFile('passports.txt', (err, data) => {

        // if error occurred, log it to the console
        if (err) {
            console.error(err);
        }

        // will hold text file input as a string
        let str = '';

        // will hold each entry as an array entry
        let pass = [];

        // convert buffer object to a string
        str += data.toString();

        // add into array by splitting based on newline
        pass = str.split("\r\n");

        // keep track of the total amount of valid passports
        let total = 0;
        
        // string for appending entries together since 
        // not all entries are together on the same line in the array
        let entry = '';

        // loop through all of the entries
        for (index = 0; index < pass.length; index++) {
            // append entries together 
            entry += pass[index];

            // if we hit the separator, check for keywords
            if (pass[index] == '') {
                let valid = check(entry);
                // if true, that means we have found a valid passport
                if (valid) {
                    // add to count
                    total++;
                }

                // reset entry
                entry = '';

            }
            
        }
        // print out the total
        console.log(total)

    })
}

// function to check if all fields are present in the entry
function check(entry) {
    // fields to check for in each entry
    const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl','ecl', 'pid'];

    // when used on an array, every() returns false if it finds
    // an element that does not satisfy the testing function
    return pass = fields.every( (f) => entry.includes(f));

}
    
function partTwo() {
    // read the passports file
    fs.readFile('passports.txt', (err, data) => {
        // if error occurred, log it to the console
        if (err) {
            console.error(err);
        }

         // will hold text file input as a string
        let str = '';

        // will hold each entry as an array entry
        let pass = [];

        // convert buffer object to a string
        str += data.toString();

        // add into array by splitting based on newline
        pass = str.split("\r\n");

        //console.log(pass)

        // keep track of the total amount of valid passports
        let total = 0;
        
        // string for appending entries together since 
        // not all entries are together on the same line in the array
        let entry = '';

        // loop through all of the entries
        for (index = 0; index < pass.length; index++) {
            // append entries together, putting spaces in between
            entry += (" " + pass[index]);

            // if we hit the separator, check for keywords
            if (pass[index] == '') {

                // check to make sure all the fields are there first
                let valid = checkContents(entry); 

                // if true, that means we have found a valid passport
                if (valid) {
                    
                    // add to count
                    total++;
                }

                // reset entry
                entry = '';

            }
        }

        // print out total
        console.log(total)

    })
}

// use regex
function checkContents(entry) {
    const fieldReqs = [/^byr:(19[2-9]\d|200[0-2])$/, /^iyr:(201\d|2020)$/, /^eyr:(202\d|2030)$/, /^hgt:(1([5-8]\d|9[0-3])cm|(59|6\d|7[0-6])in)$/, /^hcl:#[a-f0-9]{6}$/, /^ecl:(amb|blu|brn|gry|grn|hzl|oth)$/, /^pid:[0-9]{9}$/]

    // when used on an array, every() returns false if it finds
    // an element that does not satisfy the testing function
    return fieldReqs.every((f) => f.test(entry));
}

partTwo()
