var testname = "woo"
var testscore = 87
highScoreArray = []
var newItem = { player: testname, score: testscore}
highScoreArray.push(newItem)

console.log(newItem)
console.log(highScoreArray)

var obj2 = {player: "drew", score: 77}
var obj3 = {player: "shelly", score: 66}

highScoreArray.push(obj2)

console.log(highScoreArray)


highScoreArray.push(obj3)

console.log(highScoreArray)
