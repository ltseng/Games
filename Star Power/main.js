var dollars = 5;
var wormOnAString = 0;
var width=0;
var gameStart=false;
var GUIsReady=false;


//update this each time you add a category
var barStates = [0,0,0,0,0,0];

var speeds = [1,0.6,0.4,0.3,0.1,0.06,0.02];
var numStars = [0,0,0,0,0,0,0,0];
var costs = [5,100, 500, 1500,4000, 12000];
var earnings = [1,20,100,250,600, 2000,0];

var costGUIs;
var numGUIs;
var progressGUIs;
var buyButtonGUIs;

var saveData = {
  dollars: dollars,
  numStars: numStars,
  costs: costs,
  earnings: earnings,
  speeds: speeds,
  barStates: barStates
};

function prepGUIs(){
  //Populate all the arrays, keep displays up to date, and 
  //make sure the buttons are the appropriate colors.
  try{
    costGUIs = [
      document.getElementById('guitarCost'),
      document.getElementById('garageCost'),
      document.getElementById('mariachiCost'),
      document.getElementById('DJCost'),
      document.getElementById('musicalCost'),
      document.getElementById('vegasCost')
    ];

    numGUIs = [
      document.getElementById('numGuitars'),
      document.getElementById('numGarages'),
      document.getElementById('numMariachis'),
      document.getElementById('numDJs'),
      document.getElementById('numMusicals'),
      document.getElementById('numVegases')
    ];

    progressGUIs =[
      document.getElementById('guitarProgress'),
      document.getElementById('garageProgress'),
      document.getElementById('mariachiProgress'),
      document.getElementById('djProgress'),
      document.getElementById('musicalProgress'),
      document.getElementById('vegasProgress')
    ];

    buyButtonGUIs =[
      document.getElementById('buyGuitarButton'),
      document.getElementById('buyGarageButton'),
      document.getElementById('buyMariachiButton'),
      document.getElementById('buyDJButton'),
      document.getElementById('buyMusicalButton'),
      document.getElementById('buyVegasButton')
    ];

    //make sure that the buy buttons display the up-to-date numbers
    for (i=0; i<costGUIs.length; i++){
      costGUIs[i].innerHTML = costs[i];
      if (dollars>=costs[i]){
        buyButtonGUIs[i].style.backgroundColor = "#00de3b";
      } else{
        buyButtonGUIs[i].style.backgroundColor = "#94e3a9";
      }
    }

    GUIsReady = true;
    console.log("All lists initialized");
  } catch(err){
      console.log("Error: " + err);
  }
}

function save(){
  saveData.dollars = dollars;
  saveData.numStars = numStars;
  saveData.costs = costs;
  saveData.earnings = earnings;
  saveData.speeds = speeds;
  saveData.barStates = barStates;
  saveData.gameStart = gameStart;

  localStorage.setItem("saveData", JSON.stringify(saveData));
}

function load(){
  var savegame = JSON.parse(localStorage.getItem("saveData"));
  try{
    dollars=savegame.dollars;
    numStars=savegame.numStars;
    costs = savegame.costs;
    earnings = savegame.earnings;
    speeds = savegame.speeds;
    barStates = savegame.barStates;
    gameStart = savegame.gameStart;

    document.getElementById("dollars").innerHTML=prettify(dollars);

    for (i=0; i<costGUIs.length; i++){
      numGUIs[i].innerHTML = numStars[i];
      costGUIs[i].innerHTML = prettify(costs[i]);
      progressGUIs[i].style.width = barStates[i];

      if (dollars>=costs[i]){
        buyButtonGUIs[i].style.backgroundColor = "#00de3b";
      } else{
        buyButtonGUIs[i].style.backgroundColor = "#94e3a9";
      }
    }

  }catch(error){
    console.log(error)
  }
}

function buyStar(index){
  //buy the desired category, increment the costs
  //and other displayed numbers.
  if (dollars>=costs[index]){
    dollars = dollars - costs[index];
    numStars[index] = numStars[index]+1;
    costs[index] = prettify(1.1*costs[index]);
    updateDollars();
    costGUIs[index].innerHTML = costs[index];
    numGUIs[index].innerHTML = numStars[index];
    //start the game so that the progress bars know to update.
    gameStart=true;
  }
}

  function calcEarns(index){
    //calculate earnings by multiplying number of units of
    //a category by the earnings of that category, and update
    //the dollar display
    var tempEarnings = numStars[index] * earnings[index];
    dollars += tempEarnings;
    updateDollars();
  }

  function updateDollars(){
    document.getElementById('dollars').innerHTML = prettify(dollars);
  }

  function prettify(num){
    //make sure that all numbers are formatted with
    //two decimal points at maximum.
    return parseFloat(num.toFixed(2));
  }

  window.setInterval(function(){
    //console.log("gameStart: " + gameStart+ " GUIsReady: "+GUIsReady);

    if (!gameStart){
      if (!GUIsReady){
        prepGUIs();
      }
    }
    if (gameStart){
      for (i=0; i<barStates.length; i++){
        //calculate earnings from each category
        //once the progress bar hits 100% and reset
        //the progress bar.
        if (barStates[i]>=100){
          calcEarns(i);
          barStates[i]=0;
        }
        //otherwise, increment progress bar with
        //each category's custom speed increment.
        else{
          if (numStars[i]>0){
            barStates[i]=barStates[i]+speeds[i];
            if (i==3){
              console.log(barStates[i], speeds[i]);
            }
          }
        }
        //update progress bar GUI
        progressGUIs[i].style.width = barStates[i]+'%';
        //update button state
        if (dollars>=costs[i]){
          buyButtonGUIs[i].style.backgroundColor = "#00de3b";
        }else{
          buyButtonGUIs[i].style.backgroundColor = "#94e3a9";
        }
      }
    }
  },10);