const GameBoard = (() => {
     let board = ['','','','','','','','','']
     return {board}
     
})();


const DisplayController = (() => {
     const cell = document.querySelectorAll('.cell');
     
                                 
     const displayArray = () => {
          GameBoard.board.forEach((value, index) => cell[index].textContent = value);
     };
     
     const addDOMMark = (e) => {
          GameState.playRound(e.target.id);
          e.target.style.pointerEvents = "none";
          displayArray();
     }
    
     cell.forEach(cell => cell.addEventListener('click', addDOMMark));
     
     return { displayArray}
})();


const Player = (name, mark) => {
     const getName = () => name;
     return {getName, mark}
};


const GameState = (() => {
     const player1 = Player('Player 1', 'X');
     const player2 = Player('Player 2', 'O');
     let aWinner = false;
     let currentPlayer = player1;
     
     const winningCombinations = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]];

     const getCurrentPlayer = () => currentPlayer;
     
     const changePlayer = () => {
          currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
     }

     const announce = document.querySelector('.announce');

     const announceCurrPlayer = () => {
          announce.textContent = `${currentPlayer.getName()}, your turn.`
     }
    
     const announceWinner = () => {
          announce.textContent = `${currentPlayer.getName()} WON !`
          aWinner = true;
          
     }
     const checkWinner = () => {
          winningCombinations.forEach((combination) => {
               if (GameBoard.board[combination[0]] != '' && GameBoard.board[combination[0]] === GameBoard.board[combination[1]] && GameBoard.board[combination[0]] === (GameBoard.board[combination[2]])) 
               { announceWinner();}
     });
     }
     
     const checkTie = () => {
     function notEmpty(element) { return (element!='');}
     return GameBoard.board.every(notEmpty);
     }

     const playRound = (cell) => { 
          GameBoard.board[cell] = getCurrentPlayer().mark;
          checkWinner()
          if (aWinner == true) { return}
          changePlayer();
          announceCurrPlayer();
     };

     
     return { playRound, checkTie, checkWinner, getCurrentPlayer}

})();


/// add in a module ?
