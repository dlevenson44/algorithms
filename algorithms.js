// Linear Search Example
function linearSearch(array, targetValue) {
  // run for length of array
  for (let i = 0; i < array.length; i ++) {
    // if the value of the iteration equal the target value, return message
    if (array[i] === targetValue) {
      return "Target can be found at array index:  " + i;
    }
  }
  // if the value isn't in the array return -1
  return -1;
}

var array = ([1, 4, 6, 12, 18, 22, 27, 33, 35, 38, 40, 44, 49, 50, 52] 52)


// Example of Binary Search on Array

/* Returns either the index of the location in the array,
  or -1 if the array did not contain the targetValue */
// function takes in an array and a targetValue
// targetValue represents the number we want to pull from the array
var binarySearch = function(array, targetValue) {
    // the lowest value is in the first element
    var min = 0;
    // the highest value is the last element
    var max = array.length - 1;
    // guess will be used later on
    var guess;
    // we have had 0 total guesses to start
    var totalGuesses = 0;
    
    // as long as the min value is less than or equal to the max value
    while (min <= max) {
        // the guess is equal to the midway point of the array
        guess = Math.floor(min + (max - min)/2);
        // print the midway point for each loop
        console.log(guess);
        // for each guess, add 1 to the totalGuesses
        totalGuesses += 1;
        // if the midway element is equal to the targetValue input
        if (array[guess] === targetValue) {
            console.log(totalGuesses);
            // end the loop and return the element position
            return guess;
        // if midway element is less than the targetValue
        } else if (array[guess] < targetValue) {
            // set the new min element value to 1 element over the midway point
            min = guess + 1;
        } else {
          // otherwise set the new max value to 1 element less than the midway point
            max = guess - 1;
        }
    }

    // if targetValue isn't found in array return -1
    return -1;
};

var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 
        41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

var result = binarySearch(primes, 73);
console.log("Found prime at index " + result);


// Example of Mergesort
// Takes in an array that has two sorted subarrays,
//  from [p..q] and [q+1..r], and merges the array

// p is first element in original array, q is midpoint, r is last element in array
var merge = function(array, p, q, r) {
    // arrays to store first and second halves of array
    var lowHalf = [];
    var highHalf = [];

    // k is the starting location in the original array that we copy into
    var k = p;

    // i iterates for lowhalf, j iterates for highhalf
    var i;
    var j;

    // loop from start of lowhalf array until midway point in original array
    for (i = 0; k <= q; i++, k++) {
        // set the lowhalf value to the same value as its position in the original array
        lowHalf[i] = array[k];
    }
    
    // loop from start of highalf array until end of original array
    for (j = 0; k <= r; j++, k++) {
        // set highalf value to same value as its position in original array
        highHalf[j] = array[k];
    }

    // reset variable values
    k = p;
    i = 0;
    j = 0;
    
    // run while there is still an element in both of the arrays
    while (i < lowHalf.length && j < highHalf.length) {
        // if the lowhalf value is less than highalf value
        if (lowHalf[i] < highHalf[j]) {
            // set the array position to the lowhalf iteration
            array[k] = lowHalf[i];
            // add one iteration to the lowhalf array
            i += 1;
        } else {
            // otherwise set the array position to highhalf iteration
            array[k] = highHalf[j];
            // add one iteration to highhalf array
            j += 1;
        }
        // always add one iteration to original array counter
        k++;
    }

    // below while loops are used when one half array is empty but a second is not
    // while there is only elements in the lowhalf
    while (i < lowHalf.length) {
        // set original array position to lowhalf iteration
        array[k] = lowHalf[i];
        // iterate lowhalf and original arrays
        i += 1;
        k++;
    }
    
    // while there is only elements in highhalf
    while (j < highHalf.length) {
        // set original array position to highalf iteration
        array[k] = highHalf[j];
        // iterate highalf and original arrays
        j += 1;
        k++;
    }
    
};


// below lines test Merge function
var array = [3, 7, 12, 14, 2, 6, 9, 11];
merge(array, 0,
    Math.floor((0 + array.length-1) / 2),
    array.length-1);
console.log("Array after merging: " + array);

// Takes in an array and recursively merge sorts it
// takes in array, start position, and end position
var mergeSort = function(array, p, r) {
    // as long as the start index is less than the end index
    if (p < r) {
        // set Q to the midway point
        var q = Math.floor((p + r) / 2);
        // run mergesort on first element to midpoint
        mergeSort(array, p, q);
        // run merge sort on position after midpoint to end
        mergeSort(array, q+1, r);
        // merge based on start, mid, and end points
        merge(array, p, q, r);
    }
};

// below tests mergesort
var array = [14, 7, 3, 12, 9, 11, 6, 2];
mergeSort(array, 0, array.length-1);
console.log("Array after sorting: " + array);

var array = [51, 24, 14, 33, 92, 48, 30, 11];
mergeSort(array, 0, array.length-1);
console.log("Array after sorting: " + array);



// Quicksort Example
// swap function switches the position of the first and second position passed
var swap = function(array, firstIndex, secondIndex) {
    // assign the first index to the temp variable
    var temp = array[firstIndex];
    // assign the first index the second index's value
    array[firstIndex] = array[secondIndex];
    // assign the second index the first index's value via the temp variable
    array[secondIndex] = temp;
};


var partition = function(array, p, r) {
    // q set to hold opening element position
    var q = p;
    // loop from the start position through the end point
    for (var j = p; j < r; j ++) {
        // if the iterated value is less than or equal to the last element in the array
       if (array[j] <= array[r]) {
            // swap the position of the two values
           swap(array, j, q);
           // increment the q variable to move to the next element in array
           q ++;
       }
    }
    // once we finish iterating through the array
    // swap the last element in the array with the element in position q
    swap(array, r, q);
    // return the q position
    return q;
};

var quickSort = function(array, left, right) {
    
    var leftIndex = partition(array, left, right);

    if (left < leftIndex - 1) {
        quickSort(array, left, leftIndex - 1);
    }

    if (right > leftIndex) {
        quickSort(array, leftIndex, right);
    }

    return array;
}



var array = [9, 7, 5, 11, 12, 2, 14, 3, 10, 4, 6];
// console.log(array)

var q = partition(array, 0, array.length-1);
console.log("Array after partitioning: " + array);

var m = quickSort(array, 0, array.length - 1);
console.log("Array after sorting:   " + array);



// BFS Implemented
/* A Queue object for queue-like functionality over JavaScript arrays. */
var Queue = function() {
    this.items = [];
};
Queue.prototype.enqueue = function(obj) {
    this.items.push(obj);
};
Queue.prototype.dequeue = function() {
    return this.items.shift();
};
Queue.prototype.isEmpty = function() {
    return this.items.length === 0;
};


var doBFS = function(graph, source) {
    var bfsInfo = [];

    for (var i = 0; i < graph.length; i++) {
        bfsInfo[i] = {
            distance: null,
            predecessor: null };
    }

    bfsInfo[source].distance = 0;

    var queue = new Queue();
    queue.enqueue(source);
    
    while (!queue.isEmpty()) {
        var vertex = queue.dequeue();
        for (var j = 0; j < graph[vertex].length; j ++) {
            var neighbor = graph[vertex][j];
            if (bfsInfo[neighbor].distance === null){
                bfsInfo[neighbor].distance = bfsInfo[vertex].distance + 1;
                bfsInfo[neighbor].predecessor = vertex;
                queue.enqueue(neighbor);
            }
        }
    }

    return bfsInfo;
};


var adjList = [
    [1],
    [0, 4, 5],
    [3, 4, 5],
    [2, 6],
    [1, 2],
    [1, 2, 6],
    [3, 5],
    []
    ];
var bfsInfo = doBFS(adjList, 3);
for (var i = 0; i < adjList.length; i++) {
    console.log("vertex " + i + ": distance = " + bfsInfo[i].distance + ", predecessor = " + bfsInfo[i].predecessor);
}