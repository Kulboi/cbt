

/* @compareStrings method: returns lexical similarity value in the range [0,1] */
function compareStrings(a, b) {
    a = a.trim().toUpperCase();
    b = b.trim().toUpperCase();

    // identical strings
    if (a === b) return 1;
    // one empty string
    if (!a || !b) return 0;
    // both one char
    if (a.length === 1 && b.length === 1) return 0;

    // one string is one char
    if (a.length === 1) return b.indexOf(a) > -1 ? 1 / b.length : 0;
    if (b.length === 1) return a.indexOf(b) > -1 ? 1 / a.length : 0;

    var pairs1 = wordLetterPairs(a);
    var pairs2 = wordLetterPairs(b);

    var union = pairs1.length + pairs2.length;

    var intersection = pairs1.filter(function (pair1) {
        var match = pairs2.indexOf(pair1);
        if (match > -1) {
            pairs2.splice(match, 1); 
            return true;
        }
    }).length;

    return (2 * intersection) / union;
}

/* @wordLetterPairs method: returns an ArrayList of 2-character Strings */
function wordLetterPairs(str) {
    return flatten(str.split(/\s+/).map(function (word) {
        return letterPairs(word);
    }));
}

function flatten(arrays) {
    return Array.prototype.concat.apply([], arrays);
}

/* @letterPairs method: returns an array of adjacent letter pairs contained in the input string */
function letterPairs(str) {
    var numPairs = str.length - 1;
    var pairs = new Array(numPairs);
    for (var i = 0; i < numPairs; i++) {
        pairs[i] = str.substring(i, i + 2);
    }
    return pairs;
}


var answers = {
    "ans1": "an electronic device which is capable of receiving information in a particular form and of performing a sequence of operations in accordance with a predetermined but variable set of procedural instructions program to produce a result in the form of information or signals.",
}

function getAnswer() {
    var a = document.getElementById("question-one").value;
    var b = answers.ans1;
    var test = compareStrings(a, b);
    var rounded = test.toFixed(1);
    document.getElementById("approximation").innerHTML = rounded;
    if(rounded >= 0.4) {
        document.getElementById("answer-div").innerHTML = "Congrats! your answer is correct";
    }else if(rounded < 0.4 ) {
        document.getElementById("answer-div").innerHTML = "Sorry your answer is wrong";
    }
}



