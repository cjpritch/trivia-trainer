//
// these two will be the information coming back from the dropdowns
var questionNumber = 50

var questionCategory = "artliterature"

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
        // we'll need to call the function to display the question here passing question and answer into it as arguments

        // console.log("NINJA")
        // console.log("Question: " + question)
        // console.log("Answer: " + answer)    
         
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
});
       
    }else {

    // openTDB request

     var openTDBRequest = fetch("https://opentdb.com/api.php?amount=1").then(function(openTDBRequest){
        openTDBRequest.json().then(function(data){
        question = (data.results[0].question)
        answer = (data.results[0].correct_answer)
        
    // add text to T/F questions
        if(answer == "True" || answer == "False"){
            question = "True or False? " + question
        }
    
         // we'll need to call the function to display the question here passing question and answer into it as arguments
        // console.log("OpenTDB")
        // console.log("Question: " + question)
        // console.log("Answer: " + answer)    
        
        categoryConverter(questionCategory)
            
            

         })
        .catch(function(error) {
            console.log("Houston we have a problem")
            
        })
    });
                            
     };
  
}
   
 }   

   // convert NinjaAPI categories to OpenTDB categories
   var categoryConverter = function(questionCategory) {
    switch(questionCategory) {
    case "general":
    questionCategory = "9"
    console.log(questionCategory)
    break;

    case "artliterature":
    questionCategory = "25"
    console.log(questionCategory)
    break;

    case "language":
    questionCategory = "10"
    console.log(questionCategory)
    break;
    
    case "sciencenature":
    questionCategory = "17"
    console.log(questionCategory)
    break;

    case "peopleplaces":
    questionCategory = "26"
    console.log(questionCategory)
    break;

    case "geography":
    questionCategory = "22"
    console.log(questionCategory)
    break;

    case "historyholidays":
    questionCategory = "23"
    console.log(questionCategory)
    break;

    case "entertainment":
    questionCategory = "14"
    console.log(questionCategory)
    break;

    case "toysgames":
    questionCategory = "16"
    console.log(questionCategory)
    break;

    case "music":
    questionCategory = "12"
    console.log(questionCategory)
    break;

    case "religionmythology":
    questionCategory = "20"
    console.log(questionCategory)
    break;

    case "sportsliesure":
    questionCategory = "21"
    console.log(questionCategory)
    break;         

    default: 
    console.log(questionCategory)
}}

questionRequest()
$('.dropdown-trigger').dropdown();
