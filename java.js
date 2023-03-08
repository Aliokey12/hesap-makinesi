const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null
let operator = null
let waitingForSecondValue = false
 


updateDisplay();

function updateDisplay(){
    display.value=displayValue
}

keys.addEventListener('click',function(e){
const element = e.target;
const value = element.value;


if (!element.matches('button')) return



if(element.classList.contains('operator')){
// console.log('operator',element.value);
handleOperator(element.value);
updateDisplay();
return
}


if(element.classList.contains('decimal')){
    console.log('decimal',element.value);
    inputDecimal();
    updateDisplay();
return;
}


if(element.classList.contains('clear')){
//    console.log('clear',element.value);
clear();
updateDisplay()
    return;
}
function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue= value;
    }else if (operator) {
        const result = calculate(firstValue,value,operator);
       
        displayValue = `${parseFloat(result.toFixed(7 ))}`;
        firstValue = result;
    }

    

    waitingForSecondValue = true;
    operator=nextOperator;
console.log(displayValue,firstValue,operator,waitingForSecondValue);
}





// console.log('number',element.value);

inputNumber(element.value)
updateDisplay()
});


function calculate(first,second,operator) {
    if (operator === '+') {
        return first+second;
    }else if (operator==='-') {
        return first - second;
    }else if (operator==='*') {
        return first*second;
    }else if (operator==='/') {
        return first/second
    }
return second;

}

function inputNumber(num) {
   if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false
   }else{
    displayValue = displayValue === '0'? num: displayValue + num;
  
   }
console.log(displayValue,firstValue,operator,waitingForSecondValue);
}

function inputDecimal() {

if (!displayValue.includes('.')) {
    displayValue += '.'; 
    
}    
}

 function clear() {
displayValue = '0';
 }

 function getTime(){
    var now = new Date();
    var hour= now.getHours();
    var minute = now.getMinutes();
var second = now.getSeconds()
    var day = now.getDate()
    var month = now.getMonth()+1;
    var year = now.getFullYear()
    
   if(hour<10){
    document.getElementById("hour").innerText='0'+hour;
   }
    
   
   
   
    document.getElementById("minute").innerText=minute;
    document.getElementById("second").innerText=second;
    
    document.getElementById("date").innerText=date;
    
    
    }


setInterval(function(){getTime()},1000)



const url = 'https://api.openweathermap.org/data/2.5/';
const key = '9709ee4dbe40843a2c8e1def5fb7e096';


const settQuery = (e) =>{
    if (e.keyCode == '13') 
    getResult(searchBar.value);
    }

    const getResult = (cityName) =>{
let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
fetch(query)
.then(weather => {
    return weather.json()
})
.then(displayResult)
    }

const displayResult =(result) => {
let city = document.querySelector('.city')
city.innerText = `${result.name},${result.sys.country}`

let temp = document.querySelector('.temp')
temp.innerText = `${Math.round(result.main.temp)}°C`


let desc = document.querySelector('.desc')
desc.innerText = result.weather[0].description


let minmax = document.querySelector('.minmax')
minmax.innerText = `${Math.round(result.main.temp_min)}`
}






const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress',settQuery);
