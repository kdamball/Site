//main function to check on the prime factors
(function isPr(num){
  num = prompt('Please enter your number');
  while (isNaN(num)||num===0||num===null){
    num=prompt('Make sure you enter a valid number');
  }
  var nArr = [];//emptying the array before any calculation.
  var ourNum = num; //for reporting purposes at the end of our function
  if(num%2===0){
    nArr.push(2);
    num = num/2;
  }
  for (var i = 3; i<=num; i+=2){
    if(num%i===0){
      num = num/i;  //to make the function efficient, we remove redundancy by dividing the number by its factor
      nArr.push(i);
    }
  }
  
  console.log(ourNum+": "+ nArr);
})()

