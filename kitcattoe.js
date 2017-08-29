var currentPlayerElement = document.getElementById('current-player');
var currentPlayer = 1;
currentPlayerElement.innerHTML = currentPlayer;

var round = 1;
var masterClickedList = [];
var playerOneBoard = createVirtualBoard(3);  // future feature: add user option for board size
var playerTwoBoard = createVirtualBoard(3);


$(".cell").click(clickedBox);

function clickedBox() {
  clickedItem = $(this);
  clickedItemID = clickedItem.attr('id');

  if (theGameIsStillGoingOn() && aBlankBoxIsSelected() ) {
    updateTurnIndicator();
    updateGameboardWithCat();
    updateMasterClickedList();
    updateVirtualBoard();
    if (checkForWin(playerOneBoard)) {
      weHaveAWinner(playerOneBoard);
    } else if (checkForWin(playerTwoBoard)) {
      weHaveAWinner(playerTwoBoard);
    }
    checkForDraw();
    round++;
  }
}

function weHaveAWinner(playerBoard) {
  updateGameboardWithSpraypaint(playerBoard);
  notifyPlayerOfWin();
  exitAllLoops();
  playAgain();
}

function createVirtualBoard(rows) {
  var columns = rows;  // game board can only be square
  var virtualBoard = {};
  for (i = 0, boxNumber = 1; i < rows; i++) {
    for (j = 0; j < columns; j++, boxNumber++) {
      virtualBoard["box" + boxNumber] = false;
    }
  }
  return virtualBoard;
}

function theGameIsStillGoingOn() {
  return !isNaN(round);
}

function aBlankBoxIsSelected() {
  return !masterClickedList.includes(event.currentTarget.id);
}

function updateTurnIndicator() {
  currentPlayerElement.innerHTML = round%2 + 1;
}

function updateGameboardWithCat() {
  if (round%2 + 1 === 1) {  // if it is p1's turn, append player one's cat icon in box and update array of boxes p2 has clicked
    clickedItem.append('<img class="player1cat" src="playeronecat.png">');
  } else if (round%2 + 1 === 2) {  // if it is p2's turn, append player two's cat icon in box and update array of boxes p2 has clicked
    clickedItem.append('<img class="player2cat" src="playertwocat.png">');
  }
}

function updateMasterClickedList() {
  masterClickedList.push(event.currentTarget.id);  // update master list of tiles that have been selected

}

function updateVirtualBoard() {
  if (currentPlayer === 1) {
    playerOneBoard[clickedItemID] = true;
  } else if (currentPlayer === 2) {
    playerTwoBoard[clickedItemID] = true;
  }
  currentPlayer = round%2 + 1
}

function determineClickCoordinates(playerBoard) {
  var clickedItemIDNumber = clickedItemID.replace("box","");

  var row = Math.floor(clickedItemIDNumber/3 - 0.000001);
  var column = clickedItemIDNumber%3 - 1;

  if ( column === -1) {
    column = 2;
  }

  return [row, column];
}

function arraysEqual(array1, array2) {
  for(var i = array1.length; i--;) {
    if(array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

function checkForWin(playerBoard, rows) {
  clickCoordinates = determineClickCoordinates();

  if ( (clickCoordinates[0] === 0) && (playerBoard['box1'] === true) && (playerBoard['box2'] === true) && (playerBoard['box3'] === true) ) {
    return 1;
  } else if ( (clickCoordinates[0] === 1) && (playerBoard['box4'] === true) && (playerBoard['box5'] === true) && (playerBoard['box6'] === true) ) {
    return 2;
  } else if ( (clickCoordinates[0] === 2) && (playerBoard['box7'] === true) && (playerBoard['box8'] === true) && (playerBoard['box9'] === true) ) {
    return 3;
  } else if ( (clickCoordinates[1] === 0) && (playerBoard['box1'] === true) && (playerBoard['box4'] === true) && (playerBoard['box7'] === true) ) {
    return 4;
  } else if ( (clickCoordinates[1] === 1) && (playerBoard['box2'] === true) && (playerBoard['box5'] === true) && (playerBoard['box8'] === true) ) {
    return 5;
  } else if ( (clickCoordinates[1] === 2) && (playerBoard['box3'] === true) && (playerBoard['box6'] === true) && (playerBoard['box9'] === true) ) {
    return 6;
  } else if ( ( arraysEqual(clickCoordinates, [0,0] ) || arraysEqual(clickCoordinates, [1,1]) || arraysEqual(clickCoordinates, [2,2]) ) && (playerBoard['box1'] === true) && (playerBoard['box5'] === true) && (playerBoard['box9'] === true) ) {
    return 7;
  } else if ( ( arraysEqual(clickCoordinates, [0,2] ) || arraysEqual(clickCoordinates, [1,1]) || arraysEqual(clickCoordinates, [2,0]) ) && (playerBoard['box3'] === true) && (playerBoard['box5'] === true) && (playerBoard['box7'] === true) ) {
    return 8;
  } else {
    return false;
  }
}

function updateGameboardWithSpraypaint(playerBoard) {
  if (checkForWin(playerBoard) === 1) {
    $('.pink').css("visibility", "visible");
  } else if (checkForWin(playerBoard) === 2) {
    $('.orange').css("visibility", "visible");
  } else if (checkForWin(playerBoard) === 3) {
    $('.purple').css("visibility", "visible");
  } else if (checkForWin(playerBoard) === 4) {
    $('.yellow').css("visibility", "visible");
  } else if (checkForWin(playerBoard) === 5) {
    $('.blue').css("visibility", "visible");
  } else if (checkForWin(playerBoard) === 6) {
    $('.red').css("visibility", "visible");
  } else if (checkForWin(playerBoard) === 7) {
    $('.hotpink').css("visibility", "visible");
  } else if (checkForWin(playerBoard) === 8) {
    $('.green').css("visibility", "visible");
  }
}

function notifyPlayerOfWin() {
  document.querySelector('.turn-indicator').innerHTML = "Player " +  (3-currentPlayer) + " Wins!";  // notify player of win
}

function exitAllLoops() {
  round = NaN;
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
    // round = 1;
  })
}

function checkForDraw() {
  if ((round) && (masterClickedList.length === 9)) {
    document.querySelector('.turn-indicator').innerHTML = "It's a Draw :\(";
    $(".player1cat").css("-webkit-animation", "rotation 2s infinite linear");
    $(".player2cat").css("-webkit-animation", "rotation 2s infinite linear");
    playAgain();
  }
}
