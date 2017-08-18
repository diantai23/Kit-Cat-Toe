$(".cell").click(clickedBox);

var round = 0;
document.getElementById('current-player').innerHTML = round%2 + 1;
var theseHaveBeenClicked = [];
var theseHaveBeenClickedByPlayerOne = [];
var theseHaveBeenClickedByPlayerTwo = [];

function clickedBox() {
  if (!isNaN(round) && !theseHaveBeenClicked.includes(event.currentTarget.id)) {  // makes sure only blank tiles can be selected. Only allows loop to execute if we are in a valid round of the game
    document.getElementById('current-player').innerHTML = round%2 + 1;  // change turn indicator to reflect current player's number
    if (round%2 === 0) {  // if it is player one's turn, use player one's cat icon
      $(this).append('<img id="player1cat" src="/Users/diantai/Desktop/firehose-vagrant/src/kit-cat-toe/playeronecat.png">');
      theseHaveBeenClickedByPlayerOne.push(event.currentTarget.id);
    } else if (round%2 === 1) {  // if it is player two's turn, use player two's cat icon
      $(this).append('<img id="player2cat" src="/Users/diantai/Desktop/firehose-vagrant/src/kit-cat-toe/playertwocat.png">');
      theseHaveBeenClickedByPlayerTwo.push(event.currentTarget.id);
    }
    theseHaveBeenClicked.push(event.currentTarget.id);  // update master list of tiles that have been selected

    //  check for any wins
    var aLineOfBoxes = 0;
    while (aLineOfBoxes < 8) {  // go thru each row of winning combinations
      var aBox = 0;
      var threeInARowPlayerOne = 0;
      var threeInARowPlayerTwo = 0;
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

      while (aBox < 3) {  // within each winning combination, go thru each of three boxes
        currentBox = String(winningCombinations[aLineOfBoxes][aBox].id);  // the ID of the current box we are looking at
        if ((theseHaveBeenClickedByPlayerOne.length >= 3) && (theseHaveBeenClickedByPlayerOne.includes(currentBox))) {  // if at least three tiles have been selected by one player, and one of those tiles includes the current box,
          threeInARowPlayerOne++; //  then increment counter.
        } else if ((theseHaveBeenClickedByPlayerTwo.length >= 3) && (theseHaveBeenClickedByPlayerTwo.includes(currentBox))) {
          threeInARowPlayerTwo++;
        }

        if ((threeInARowPlayerOne === 3) || (threeInARowPlayerTwo === 3)) {  // if there is an exact match for a winning combination of three,
          //console.log("YOU WIN");  // you win !!!!
          document.querySelector('.turn-indicator').innerHTML = "Player Wins";  // change turn indicator to reflect current player's number

          aBox = aLineOfBoxes = round = NaN;  // set all variables to NaN to exit all loops
        }
        aBox++;
      }
      aLineOfBoxes++;
    }
    round++;
  }
}
