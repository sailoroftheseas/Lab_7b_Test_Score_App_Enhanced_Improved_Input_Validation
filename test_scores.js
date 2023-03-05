
let namesArr = ['Ben', 'Joel', 'Judy', 'Anne'];
let scoresArr = [88, 98, 77, 88];
let validated = true;
let pattern = /[^A-Za-z ]/;

function getAvgScore() {
    let i = 0,
        sum = 0,
        len = scoresArr.length;
    let name = '';
    for (i; i < len; i++) {
        sum += scoresArr[i];
    }
    return sum / len;
}

function getHighScore() {
    let i = 0,
        max = 0,
        len = scoresArr.length;
    let name = '';
    for (i; i < len; i++) {
        if (scoresArr[i] > max) {
            max = scoresArr[i];
            name = namesArr[i];
        }
    }
    return name + ' with score of ' + max;
}

function initializeResults() {
    let results = $('#results');
    let high = getHighScore();
    let avg = getAvgScore().toFixed(1);
    $('#highScore').html(high);
    $('#avgScore').html(avg);
}


function displayScores() {
    let results = $('#scores');
    results.toggle();
}



function displayResults() {
    let results = $('#results');
    results.toggle();
}

function insertNewTableElement(newName, newScore) {
   // Add your code here
}

function initializeScoresTable() {
    // Remove header row from table
    $('#scores_table tr').slice(1).remove();
    for (let i = 0; i < scoresArr.length; i++) {
        insertNewTableElement($('#scores_table tr:last').after('<tr> <td>' + namesArr[i] + '</td><td>' + scoresArr[i] + '</td></tr>'));
    }
}

 // register jQuery extension

    // used for changing focus on enter ekey
    jQuery.extend(jQuery.expr[':'], {
        focusable: function(el, index, selector) {
            return $(el).is('a, button, :input, [tabindex]');
        }
    });

    //  Changes focus to next input on enter key
    $(document).on('keypress', 'input,select', function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            // Get all focusable elements on the page
            let $canfocus = $(':focusable');
            let index = $canfocus.index(this) + 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
        }
    });
    

function insertTableElement(scoresTable, index) {
    $('scoresTable tr:last').after('<tr> <td>' + namesArr[index] + '</td><td>' + scoresArr[index] + '</td></tr>');
}

function insertNewTableElement(newName, newScore) {
    let rowCount = document.getElementById("scores_table").getElementsByTagName("tr").length;
    $('#scoresTable tr:last').append('<tr> <td>' + newName + '</td><td>' + newScore + '</td></tr>');
    rowCount = document.getElementById("scores_table").getElementsByTagName("tr").length;
}



function addScore() {
    resetInputs();

    let score = $('#score');
    let name = $('#name');

    if ( name.val() === '' || pattern.test(name.val())) {
        if (name.val() === '') {
           $("#name_span").text(" Required"); 
        }
        else {
         $("#name_span").text(" Invalid"); 
        }
        validated = false;
     }
     if (score.val() === '' || isNaN(score.val()) || score.val() > 100 || score.val() < 0) {
        if (isNaN(score.val()) || score.val() > 100 || score.val() < 0) {
            $("#score_span").text(" Invalid");
        }
        else
        {
            $("#score_span").text(" Required");
        }   
        validated = false; 
    }

    if (!validated) {
        return;  
    }
    
    if (validated == true) {

    scoresArr.push(parseInt(score.val()));
    namesArr.push($("#name").val());
    initializeScoresTable();
    score.val('');
    name.val('');
    name.focus();
    initializeResults();
    $('#scores').show();
    $('#results').show();

    }

    
    
    // if (score.val() === '' || name.val() === '' || score.val() > 100 || score.val() < 0) {
    //     alert('Name and score must have values, and score must be between 0 and 100');
    //     return;
    // }

    
}

function resetInputs() {
    $("#name_span").text(" *"); 
    $("#score_span").text(" *");
    validated = true; 
}

window.onload = function () {
    $('#display_results').on('click',  function() {
        displayResults();
    });

    $('#display_scores').on('click',  function() {
        displayScores();
    });
    $('#add').on('click',  function() {
        addScore();
    });

    let name = $('#name');
    let score = $('#score');

    name.focus();
    initializeResults();
    initializeScoresTable();
}