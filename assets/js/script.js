var questionNumber = 10
var questionCategory


var questionRequest = function() {

    // loop through this function for each question
    for(i=0; i < questionNumber; i++){

    // generate a random positive or negative number
    var plusOrMinus = (Math.random() - 0.5) * 2

    //if number is positive use API-Ninja if negative use Jservice

    if(plusOrMinus>0) {
        //API-Ninja request
        console.log("APININJA")
       
    }else {
        // JService request
        console.log("Jservice")
    }
    
 }   
}

questionRequest()