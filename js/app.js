var player = "X"; 
var ai = "O";
var winner, gameboard, playing;

//toggle player symbol based on button clicked
$("#symbol-X").click(function() {
  player = "X";
  ai = "O";
  $("#symbol-O").removeClass("glow");
  console.log("player: " + player);
  reset();
});

$("#symbol-O").click(function() {
  player = "O";
  ai = "X";
  $("#symbol-X").removeClass("glow");
  console.log("player: " + player);
  reset();
});

function reset() {
  setTimeout(function() {
    start();
    $('.square').removeClass("glow");
    console.log("game reset");
    $('.square').html("");
  }, 1000);
};

function start() {
  $('#symbol-' + player).addClass('glow');
  gameboard = ["", "", "", "", "", "", "", "", ""];
  playing = true;
  winner = "none";

}

function getEmptySpaces(board) {
  return board.reduce(function(results, square,index) {
    if(square !== "") {
      return results;
    } else {
      return results.concat(index);
    }
  }, []);
}

function aiTurn() {
  console.log("computer's turn");
  var available = getEmptySpaces(gameboard);
  console.log(available);
  //temporary stop if tie game
  if(available.length === 0) {
    return;
  }
  var aiIndex = available[Math.floor(Math.random() * available.length)];
  console.log(aiIndex);
  gameboard[aiIndex] = ai;
  $("#sq" + aiIndex).html(ai);
};


function checkForWinner(board) {
  // Check for win conditions 
  var winCon = [
    // Horizontal
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(var i=0; i<winCon.length; i++) {
    var cond = winCon[i];
    // If all three are equal and not blank
    if(board[cond[0]] !== ""  && board[cond[0]] === board[cond[1]] && board[cond[1]] === board[cond[2]]) {
      winner = board[cond[0]];
      playing = false;
      $('#sq'+ cond[0]).addClass('glow');
      $('#sq'+ cond[1]).addClass('glow');
      $('#sq'+ cond[2]).addClass('glow');
      console.log(winner + " Wins!");
      reset();
      break;
    }
  }
  if(getEmptySpaces(gameboard).length === 0 && winner === "none") {
    console.log("Game tie!");
    reset();
  }
};


$("#gameboard").click(function(e) {
  //end game when winner delcared 
  if(!playing) return;
  console.log("players's turn");
  var playerPick = (e.target.id).slice(2);
  console.log(playerPick);
  var playerSelector = "#sq" + playerPick;
  if(gameboard[playerPick] != "") {
     //player doesn't lose turn if invalid entry 
    return;
  };
  if(gameboard[playerPick] == "") {
    gameboard[playerPick] = player;
    console.log(gameboard);
    $(playerSelector).html(player);
  }; 

  checkForWinner(gameboard); 
  if(playing) {
    aiTurn(); 
    checkForWinner(gameboard);
  }
});



start();
      
