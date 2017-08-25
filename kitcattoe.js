var round = 1;
var currentPlayer = document.getElementById('current-player');
currentPlayer.innerHTML = round%2;

var theseHaveBeenClicked = [];
var theseHaveBeenClickedByPlayerOne = [];
var theseHaveBeenClickedByPlayerTwo = [];
var winningCombinations = [
  // rows
  [box1, box2, box3],
  [box4, box5, box6],
  [box7, box8, box9],
  // columns
  [box1, box4, box7],
  [box2, box5, box8],
  [box3, box6, box9],
  // diagonals
  [box1, box5, box9],
  [box3, box5, box7]
];


$(".cell").click(clickedBox);

function clickedBox() {
  if (theGameIsStillGoingOn() && aBlankBoxIsSelected() ) {
    updateTurnIndicator();

    if (round%2 === 0) {  // if it is p1's turn, append player one's cat icon in box and update array of boxes p2 has clicked
      $(this).append('<img class="player1cat" src="playeronecat.png">');
      theseHaveBeenClickedByPlayerOne.push(event.currentTarget.id);
    } else if (round%2 === 1) {  // if it is p2's turn, append player two's cat icon in box and update array of boxes p2 has clicked
      $(this).append('<img class="player2cat" src="playertwocat.png">');
      theseHaveBeenClickedByPlayerTwo.push(event.currentTarget.id);
    }

    updateMasterClickedList();

    for (var aLineOfBoxes = 0; aLineOfBoxes < 8; aLineOfBoxes++) {
      resetTally();
      for (var aBox = 0; aBox < 3; aBox++) {
        updateTally();
        if (weHaveAWinner() ) {
          updateGameboardWithSpraypaint();
          notifyPlayerOfWin();
          exitAllLoops();
          playAgain();
        }
      }
    }
    checkForDraw();
    round++;
  }




  function updateGameboardWithSpraypaint() {
    if (aLineOfBoxes === 0) {
      $('.pink').css("visibility", "visible");
    } else if (aLineOfBoxes === 1) {
      $('.orange').css("visibility", "visible");
    } else if (aLineOfBoxes === 2) {
      $('.purple').css("visibility", "visible");
    } else if (aLineOfBoxes === 3) {
      $('.yellow').css("visibility", "visible");
    } else if (aLineOfBoxes === 4) {
      $('.blue').css("visibility", "visible");
    } else if (aLineOfBoxes === 5) {
      $('.red').css("visibility", "visible");
    } else if (aLineOfBoxes === 6) {
      $('.hotpink').css("visibility", "visible");
    } else if (aLineOfBoxes === 7) {
      $('.green').css("visibility", "visible");
    }
  }

  function resetTally() {
    threeInARowPlayerOne = 0;
    threeInARowPlayerTwo = 0;
  }

  function updateTally() {
    currentBox = String(winningCombinations[aLineOfBoxes][aBox].id);  // the ID of the current box we are looking at
    if ((theseHaveBeenClickedByPlayerOne.length >= 3) && (theseHaveBeenClickedByPlayerOne.includes(currentBox))) {  // if at least three tiles have been selected by one player, and one of those tiles includes the current box,
      threeInARowPlayerOne++; //  then increment counter.
    } else if ((theseHaveBeenClickedByPlayerTwo.length >= 3) && (theseHaveBeenClickedByPlayerTwo.includes(currentBox))) {
      threeInARowPlayerTwo++;
    }
  }

  function weHaveAWinner() {
    return (threeInARowPlayerOne === 3) || (threeInARowPlayerTwo === 3);
  }
}

function updateMasterClickedList() {
  theseHaveBeenClicked.push(event.currentTarget.id);  // update master list of tiles that have been selected
}

function theGameIsStillGoingOn() {
  return !isNaN(round);
}

function aBlankBoxIsSelected() {
  return !theseHaveBeenClicked.includes(event.currentTarget.id);
}

function updateTurnIndicator() {
  currentPlayer.innerHTML = round%2 + 1;
}

function checkForDraw() {
  if ((round) && (theseHaveBeenClicked.length === 9)) {
    document.querySelector('.turn-indicator').innerHTML = "It's a Draw :\(";
    $(".player1cat").css("-webkit-animation", "rotation 2s infinite linear");
    $(".player2cat").css("-webkit-animation", "rotation 2s infinite linear");
    playAgain();
  }
}

function exitAllLoops() {
  aBox = aLineOfBoxes = round = NaN;
}

function notifyPlayerOfWin() {
  document.querySelector('.turn-indicator').innerHTML = "Player " +  currentPlayer.innerHTML + " Wins!";  // notify player of win
}

function playAgain () {
  setTimeout( function() { $('.play-again').css("visibility", "visible"); }, 1000);
  $('.play-again').mouseenter( function () {
    $(this).css("opacity", "0.7");
  })
  $('.play-again').mouseleave( function () {
    $(this).css("opacity", "0.3");
  })
  $('.play-again').click( function () {
    location.reload();
    // $('.spraypaint').css("visibility", "hidden");
    // $('.player1cat').css("visibility", "hidden");
    // $('.player2cat').css("visibility", "hidden");
    // $('.play-again').css("visibility", "hidden");
  })
}
