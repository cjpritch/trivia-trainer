//
// these two will be the information coming back from the dropdowns
var questionNumber = 10
var questionCategory = "general"

// create variables to be used below
var question
var answer

var questionRequest = function() {

    // loop through this function for each question
    for(i=0; i < questionNumber; i++){

    // generate a random positive or negative number
    var plusOrMinus = (Math.random() - 0.5) * 2

    //if number is positive use API-Ninja if negative use OpenTDB

    if(plusOrMinus>0) {

        //API-Ninja request  

        $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/trivia?category=' + questionCategory,
        headers: { 'X-Api-Key': 'XcAWug1QbeEZJbZVbAue5Q==DQVhnSjAbT4PKToj'},
        contentType: 'application/json',
        success: function(result) {       
        question = (result[0].question)
        answer = (result[0].answer)
        console.log("Question: " + question)
        console.log("Answer: " + answer)
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
});
       
    }else {

        // openTDB request
        var openTDBRequest = fetch("https://opentdb.com/api.php?amount=1").then(function(openTDBRequest){
            openTDBRequest.json().then(function(data){
                console.log(data.results[0].question)
                console.log(data.results[0].correct_answer)
            })
        });
       
        

                        
    };

    }
    // we'll need to call the function to display the question here passing question and answer into it as arguments
 }   


questionRequest()