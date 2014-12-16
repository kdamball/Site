// function to create a numbered div and append it to the main div 'x'
var biggerDiv = document.getElementById('x');
function create(num){
  for (var i = 0; i<num; i++){
    var divs = document.createElement("div");
    divs.appendChild(document.createTextNode(i+1));
    divs.setAttribute('id',i+1); 
    divs.setAttribute('class', 'number');
    biggerDiv.appendChild(divs);
  }
}

create(100); //creating our 100 numbered divs

$(document).ready(function(){
  var tries = 0; // for measuring tries
  var guess = (Math.floor(Math.random()*100+1)); // creating our random number
  
  $(".number").click(function() {
    var inp = Number($(this).attr('id'));
    if(inp > guess){
	  $(this).css('background', 'yellow').text("");
	  $('#y').text("Lower ↓").fadeIn(100).fadeOut(1000);
    }else if(inp < guess){
	  $(this).css('background', 'red').text("");
	  $('#y').text("Higher ↑").fadeIn(100).fadeOut(1000);
    }else{
      alert("YOU GOT IT!! It took you " +(tries+1)+ " tries.");
      $(this).css('background', 'white').text();
	  location.assign("http://www.youtube.com/watch?v=wDajqW561KM"); // the PRIZE
    }
	
    ++tries;//measures the number of attempts
	$('#attempts').text('Attempt(s): ' +tries); //writes the number of attempts.
    if(tries == 7 && inp != guess){
      alert("Game over, those were too many attempts");
	  location.reload(); // reloads page after failure
    }
  });
});