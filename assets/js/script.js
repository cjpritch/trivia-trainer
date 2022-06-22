
// these two variables are placeholders for the information coming back from the dropdowns (category & # of questions)
var questionNumber 
var questionCategory 
var startCard = document.querySelector(".start-card")
var answerCard = document.querySelector("#display-area")
var seeAnswerBtn = document.querySelector("#see-answer")
var seeAnswer = document.querySelector(".answer-btn-toggle")
var nextBtn = document.querySelector("next-btn-toggle")

// create global variables to be used below
var question
var answer
var categoryCounter
var questionCounter = 0
var questionArray = []

var displayArea = document.querySelector("#display-area")

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
var displayQuestions = function () {
  question = questionArray[questionCounter].question
  answer = questionArray[questionCounter].answer
   $("#Q").text(question);
  setTimeout(() => {
      console.log("Delayed for 6 seconds.");
      $("#A").text(answer);
  }, "6000")
}
//event listener for "lets play" button
$("#next").on("click", function () {
  //remove previous question
  $("#Q").text("");
  $("#A").text("");
  displayQuestions();
})   
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
  console.log(questionCategory)
})

var selectedNumber = document.querySelector("#question-number").addEventListener("change", (event) => {
  questionNumber = event.target.value 
  console.log(questionNumber)
})

// start button event listener
document.querySelector("#start-btn").addEventListener("click", function() {

  console.log("click")

  if(!questionCategory || !questionNumber) {
     return;
  }

  startCard.classList.add("hide")
  answerCard.classList.remove("hide")
  console.log("click")
  questionRequest(questionCategory,questionNumber)
  console.log(questionCategory)
  console.log(questionNumber)
  questionRequest()

  



//  var createElements = function() {
//   for (i=0; i<questionNumber; i++){
//       console.log("createElement called");
//       const newQ = document.createElement("div");
//       newQ.setAttribute("id", "Q"+i);
//       // newQ.setAttribute("class", "question");
//       const newA = document.createElement("div");
//       newA.setAttribute("id", "A"+i);
//       //newA.setAttribute("class", "answer");
//       const newButton = document.createElement("button");
//       newButton.textContent = "Play Question";
//       newButton.setAttribute("class", "waves-effect waves-light btn");
//       newButton.setAttribute("id", "button"+i)
//       displayArea.appendChild(newQ);
//       displayArea.appendChild(newA);
//       document.body.appendChild(newButton);
//   }};
  
//   delayThis = setTimeout(createElements, 1000);

 })


 // see answer button event listener

seeAnswerBtn.addEventListener("click", function() {
  console.log("see answer clicked")
  seeAnswer.classList.toggle("hide")
  nextBtn.classList.toggle("hide")
  questionCounter++
  console.log(questionCounter)
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
  questionRequest()

















