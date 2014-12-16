(function(){"use strict";}());
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
 

function finChk(a){
  var k = a.length;
  for(var x=0;x<a.length;x++){
    for (var y=0;y<x;y++){
      if(a[x]%a[y]===0){
        a.remove(a.indexOf(a[x]));
      }
    }
  }
  return k===a.length?a:finChk(a);
}
 

function isPr(num){
  while (isNaN(num)||num===0||num===null){
    num=prompt('Make sure you enter a valid number');
  }
  var nArr = [];
  var ourNum = num; 
  if(num%2===0){
    nArr.push(2);
    num = num/2;
  }
  for (var i = 3; i<=num; i+=2){
    if(num%i===0){
      num = num/i;  
      nArr.push(i);
    }
  }
  finChk(nArr);
  console.log(nArr);
}

function timer(n){
var start = Date.now();
isPr(n);
var stop = Date.now();
console.log("The time it took was: " +(stop - start)+ " milliseconds");
}