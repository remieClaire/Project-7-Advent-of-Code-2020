// get filestream module
const fs = require('fs');

/*
 * While I was able to complete the first part of Day 3,
 * I was unable to complete the second part. Nonetheless,
 * here is my logic for the following functions:
 * For part 1, I converted the text input into an array called "grid";
 * from there, I was able to access individual elements the same way
 * I would access elements from a 2D array (grid[row][col]). Since at some point,
 * the number of columns I would need to traverse would far exceed the width of the 
 * map given to me, I made two while loops: the first dealt with data that remained
 * within the ranges of the map, while the second dealth with data that went past that.
 * The logic for the first loop was easy- if the point I landed had a tree, I noted it and 
 * I continued the loop by simply going to the next row and incrementing how far we needed to
 * go by 3. 
 * The logic for the second loop was a little harder- first, I used mod to wrap the column value
 * around. My logic was mostly similar to that in the first loop, with the differences being that
 * I had to use another variable to keep track of the columns:
 * > col determined which column I would end up at (i.e. loop back and end at col 2)
 * > colEnd was used to keep track of my actual place (i.e. col 900+)
 *
 * I was unable to finish Part 2 because I could not figure out where my logic was wrong:
 * I don't think my error came from partOne() because it worked for the slope right 3, down 1, so 
 * it should be correct for the slopes that follow the same pattern. My error probably came from 
 * partTwo(), but I have no clue where my bug would be since it does the same thing as partOne(),
 * with the only difference that it increments the rows differently (for slope right 1, down 2).
 * 
 */


function partOne(right) {
    // read the toboggan map txt file
    fs.readFile('toboggan_map.txt', (err, data) => {

        // string variable to hold data
        let str = '';

        // convert map into a grid
        let grid = [];

        // if error occurred, log it to the console
        if (err) {
            console.error(err);
        }

        // convert buffer object into string
        str += data.toString();

        // store input into a temporary array
        grid = str.split('\r\n');

        // row should start at 1 since our first spot is 3 spaces over from here
        let row = 1;
        // cap how far we traverse a given row
        let colEnd = right;

        // keep track of how many trees we run into
        let trees = 0;

        // start looping through the map just until we run out of space horizontally
        while (colEnd < grid[0].length) {

            // if the point we land on is a tree, mark it
            if (grid[row][colEnd] == '#') {
                trees++;
            }

            // go to the next row
            row++;
            // increment how far we need to go
            colEnd = colEnd + right;
        }

        // use another var to keep track of the column
        // since if we mod colEnd, we lose the width of the row
        let col = colEnd;

        // we know that col is bigger than the width, so we mod it now
        col = colEnd % grid[0].length;

        // this loop handles colEnd becoming bigger than the given width of the map
        while (row < grid.length) {

            // check if there is a tree in our spot
            if (grid[row][col] == '#') {
                trees++;
            } 

            // go to the next row
            row++; 
            // increment how far we need to go
            colEnd = colEnd + right;
            // mod column immediately since we know it always be greater than the width of the grid
            col = colEnd % grid[0].length;

        }
        
        // print out result
        console.log(trees)

    })
    
}

function partTwo(right, down) {
    // read the toboggan map txt file
    fs.readFile('toboggan_map.txt', (err, data) => {

        // string variable to hold data
        let str = '';

        // convert map into a grid
        let grid = [];

        // if error occurred, log it to the console
        if (err) {
            console.error(err);
        }

        // convert buffer object into string
        str += data.toString();

        // store input into a temporary array
        grid = str.split('\r\n');

        // row should start at 1 since our first spot is 3 spaces over from here
        let row = 0;
        // cap how far we traverse a given row
        let colEnd = right;

        // keep track of how many trees we run into
        let trees = 0;

        // start looping through the map just until we run out of space horizontally
        while (colEnd < grid[0].length) {

            // if the point we land on is a tree, mark it
            if (grid[row][colEnd] == '#') {
                trees++;
            }

            // go to the next row
            row = row + down;
            // increment how far we need to go
            colEnd = colEnd + right;
        }

        // use another var to keep track of the column
        // since if we mod colEnd, we lose the width of the row
        let col = colEnd;

        // we know that col is bigger than the width, so we mod it now
        col = colEnd % grid[0].length;

        // this loop handles colEnd becoming bigger than the given width of the map
        while (row < grid.length) {

            // check if there is a tree in our spot
            if (grid[row][col] == '#') {
                trees++;
            } 

            // go to the next row
            row = row + down; 
            // increment how far we need to go
            colEnd = colEnd + right;
            // mod column immediately since we know it always be greater than the width of the grid
            col = colEnd % grid[0].length;

        }
        
        // print out result
        console.log(trees)

    })
    
}
