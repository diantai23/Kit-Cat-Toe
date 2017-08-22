$(".cell").click(clickedBox);

var round = 1;
var currentPlayer = document.getElementById('current-player');
currentPlayer.innerHTML = round%2;

var theseHaveBeenClicked = [];
var theseHaveBeenClickedByPlayerOne = [];
var theseHaveBeenClickedByPlayerTwo = [];

function clickedBox() {
  if (!isNaN(round) && !theseHaveBeenClicked.includes(event.currentTarget.id)) {  // makes sure only blank tiles can be selected. Only allows loop to execute if we are in a valid round of the game
    currentPlayer.innerHTML = round%2 + 1;  // change turn indicator to reflect current player's number
    if (round%2 === 0) {  // if it is p1's turn, append player one's cat icon in box and update array of boxes p2 has clicked
      $(this).append('<img class="player1cat" src="playeronecat.png">');
      theseHaveBeenClickedByPlayerOne.push(event.currentTarget.id);
    } else if (round%2 === 1) {  // if it is p2's turn, append player two's cat icon in box and update array of boxes p2 has clicked
      $(this).append('<img class="player2cat" src="playertwocat.png">');
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
          //  determine which paint splatter effect to make visible
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
          document.querySelector('.turn-indicator').innerHTML = "Player " +  currentPlayer.innerHTML + " Wins!";  // notify player of win
          playAgain();
          aBox = aLineOfBoxes = round = NaN;  // set all variables to NaN to exit all loops
        }
        aBox++;
      }
      aLineOfBoxes++;
    }
    //  in case of a draw
    if ((round) && (theseHaveBeenClicked.length === 9)) {
      document.querySelector('.turn-indicator').innerHTML = "It's a Draw :\(";
      $(".player1cat").css("-webkit-animation", "rotation 2s infinite linear");
      $(".player2cat").css("-webkit-animation", "rotation 2s infinite linear");
      playAgain();
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
        })
      }
    round++;
  }
}
