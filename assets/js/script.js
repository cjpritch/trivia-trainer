
// these two variables are placeholders for the information coming back from the dropdowns (category & # of questions)
var questionNumber 
var questionCategory 

// create global variables to be used below
var question
var answer
var categoryCounter
var questionCounter = 0
var questionArray = []

var questionRequest = function(questionCategory,questionNumber) {

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

        //send question to questionArray
        dataObj = {
            question: question,
            answer: answer
        }    
        
        pushToArray(dataObj)     
       
        // console.log("NINJA")
        // console.log("Question: " + question)
        // console.log("Answer: " + answer)    
                 
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
});
       
    }else {

    // convert NinjaAPI category query values to OpenTDB query values
    categoryConverter(questionCategory)    

    // openTDB request
     var openTDBRequest = fetch("https://opentdb.com/api.php?amount=1&category="+categoryCounter).then(function(openTDBRequest){
        openTDBRequest.json().then(function(data){
        question = (data.results[0].question)
        answer = (data.results[0].correct_answer)
        
    // add text to T/F questions
        if(answer == "True" || answer == "False"){
            question = "True or False? " + question       
         }

    //fix unicode formatting
        answer = answer.replaceAll(/&quot;/g,"'")
        question = question.replaceAll(/&quot;/g,"'")

        answer = answer.replaceAll(/&amp;;/g,"&")
        question = question.replaceAll(/&amp;;/g,"&")

        answer = answer.replaceAll(/&#039;/g,"'")
        question = question.replaceAll(/&#039;/g,"'")

    //send question to questionArray
        dataObj = {
            question: question,
            answer: answer
        }    
        pushToArray(dataObj)       
          
        // console.log("OpenTDB")
        // console.log("Question: " + question)
        // console.log("Answer: " + answer)                         
        })

        .catch(function(error) {
            console.log("Houston we have a problem")            
        })
    });                            
   };    
  }  
}   


// we'll call the function to display the question here. I had to add a delay so that there is time
// for the results to return and so that it's not looking at an empty array
// we'll need to link this to a questionCounter 

   
    
// initialize select dropdowns
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    });

// initialize intructions 
$(document).ready(function(){
    $('.modal').modal();
  });
  
   
// when there is a change to the select dropdowns record the selection
var selectedCategory = document.querySelector("#category-menu").addEventListener("change", (event) => {
  questionCategory = event.target.value 
})

var selectedNumber = document.querySelector("#question-number").addEventListener("change", (event) => {
  questionNumber = event.target.value 
})

// start button event listener
document.querySelector("#start-btn").addEventListener("click", function() {
  console.log("click")
  questionRequest(questionCategory,questionNumber)
  console.log(questionCategory)
  console.log(questionNumber)
  questionRequest()
  
var test = function() {
   {        console.log(questionArray[questionCounter].question)
            console.log(questionArray[questionCounter].answer)
            console.log(questionArray)
            questionArray = []
    }  
}
delayThis = setTimeout(test, 1000);


})

// this function converts NinjaAPI categories to OpenTDB categories
var categoryConverter = function(questionCategory) {
  switch(questionCategory) {
  case "":
  categoryCounter = ""    
  break;
  
  case "general":
  categoryCounter = "9"    
  break;

  case "artliterature":
  categoryCounter = "25"    
  break;

  case "language":
  categoryCounter = "10"
  break;
  
  case "sciencenature":
  categoryCounter = "17"
  break;

  case "peopleplaces":
  categoryCounter = "26"
  break;

  case "geography":
  categoryCounter = "22"
  break;

  case "historyholidays":
  categoryCounter = "23"
  break;

  case "entertainment":
  categoryCounter = "14"
  break;

  case "toysgames":
  categoryCounter = "16"
  break;

  case "music":
  categoryCounter = "12"
  break;

  case "religionmythology":
  categoryCounter = "20"
  break;

  case "sportsliesure":
  categoryCounter = "21"
  break;         

  default: console.log("no category")
  };
}

var pushToArray = function(dataObj) {
  questionArray.push(dataObj)

}