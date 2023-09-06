function initialize(){
  inputContainer = document.getElementById("inputform");
  table = document.getElementById("dicetable");
  firstRow = document.getElementById("firstrow");
  takeMean = document.getElementById("mean");
  takeMedian = document.getElementById("median");
  takeMode = document.getElementById("mode");
  takeDouble = document.getElementById("doubleamount");
  takeTriple = document.getElementById("tripleamount");

  diceArr = [];
  numDice = "";
  numTimes = "";
}

function clearTable(){
  let rowCount = table.rows.length;
  let tableHeaderCount = 1;
  for (let j = tableHeaderCount; j < rowCount; j++) {
    table.deleteRow(tableHeaderCount);
  }
  let i = 1;
    while(i <= numDice){
    firstRow.deleteCell(1);
    i++;
  }
  document.getElementById("mean").deleteCell(1);
  document.getElementById("median").deleteCell(1);
  document.getElementById("mode").deleteCell(1);
  document.getElementById("doubleamount").deleteCell(1);
  document.getElementById("tripleamount").deleteCell(1);

  initialize();
}

function rollDice(){
  let numRolls = parseInt(inputContainer.rolltimes.value);
  numDice = parseInt(inputContainer.dices.value);
  makeColumn(numDice);
        
for(let i = 0; i < numRolls; i++){
  let newRow = table.insertRow();
  let newCell = newRow.insertCell();
  newCell.innerHTML = "Roll: " + (i+1);

  for(let j = 1; j <=numDice; j++){
    let dieRoll = getRandomInteger(1,6);
    newCell = newRow.insertCell();
    newCell.innerHTML = dieRoll;
    diceArr.push(dieRoll);
  }
}
makeTable2(diceArr);
}

      
function makeColumn(num){
  for(let i = 1; i <= num; i++){
    let newCol = document.getElementById("firstrow").insertCell();
    newCol.innerHTML = "Dice" + i + " Result";
  }
}

function makeTable2(arr){
  theDouble = doubles(arr);
  let doubleResult = takeDouble.insertCell();
  doubleResult.innerHTML = theDouble;

  theTriple = triples(arr);
  let tripleResult = takeTriple.insertCell();
  tripleResult.innerHTML = theTriple;
  
  theMean = mean(arr);
  let meanResult = takeMean.insertCell();
  meanResult.innerHTML = theMean;
  
  theMedian = median(arr);
  let medianResult = takeMedian.insertCell();
  medianResult.innerHTML = theMedian;

  theMode = mode(arr);
  let modeResult = takeMode.insertCell();
  modeResult.innerHTML = theMode;
}

function median(arr) {
  arr.sort((a, b) => a - b); // sorts the array
  const midpoint = Math.floor(arr.length / 2); // find the middle point/value
  const median = arr.length % 2 === 1 ?
    arr[midpoint] : // if odd length, just take midpoint
    (arr[midpoint - 1] + arr[midpoint]) / 2; // if even length, take mean of midpoints
  return median;
}

function mode(arr){
  let maxValue = 0, maxCount = 0;

  for(let i = 0; i < arr.length; i++){
    let count = 0;
    for(let j = 0; j < arr.length; j++){
      if(arr[j]==arr[i]){
        count++;
      }
    }
    if(count > maxCount){
      maxCount = count;
      maxValue = arr[i];
    }
  }
  return maxValue; //first mode
}

function mean(arr){
  let sum = 0;
  for(let i = 0; i< arr.length; i++){
    sum += arr[i];
  }
  sum /= arr.length;
  sum = Math.round(sum * 100.0)/100.0;
  return sum;
}

function doubles(arr){
  let count = 0;
  if(numDice == 2){
    for (let i = 0; i < arr.length; i+=2) {
      if(arr[i]==arr[i+1]){
        count++;
      }
    }
  }
  else{
    return 0;
  }
  return count;
}

function triples(arr){
  let count = 0;
  if(numDice == 3){
    for (let i = 0; i < arr.length; i+=3) {
      if(arr[i]==arr[i+1] && arr[i+1]==arr[i+2]){
        count++;
      }
    }
  }
  else{
    return 0;
  }
  return count;
}
      
let getRandomInteger = (lower,upper) => parseInt(Math.random() * upper - (lower - 1)) + lower;