var fish = 0;
var wormOnAString = 0;

function fishClick(increment){
	fish = fish + increment;
	document.getElementById("fish").innerHTML = fish;
  console.log("fish: " + fish);

}

  var width = 0;
  window.onload = function(e){ 
    setInterval(function () {
        width = width >= 100 ? 0 : width+5;  
        document.getElementById('progress-bar').style.width = width + '%'; }, 200);            
  }

  function buyWormOnAString(){
  	var wormOnAStringCost = 10*Math.pow(1.1, wormOnAString);
    wormOnAStringCost = prettify(wormOnAStringCost)
  	if (fish>=wormOnAStringCost){
  		wormOnAString += 1;
  		fish = fish - wormOnAStringCost;
 	  	wormOnAStringCost = prettify(wormOnAStringCost*1.1);
  		document.getElementById('wormOnAString').innerHTML = wormOnAString
  		document.getElementById('wormOnAStringCost').innerHTML = wormOnAStringCost;
  		document.getElementById('fish').innerHTML = fish;
  	}
  }

  function prettify(num){
    return Math.round((num*1000)/1000);
  }

  window.setInterval(function(){
    fishClick(wormOnAString)
  },1000);