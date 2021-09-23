
    'use strict';
   //Player factory function
   const Player = function(name, move, marker, winStatus, score){
    
    return {name, move, marker, winStatus, score}
}   


    //Tic-Tac-Toe board pieces and DOM elements
    let ticTacToeBoard = (function(){

            let board = document.querySelectorAll('.game-square')
            let gameBoard = [...board]

            let winningCombination= [
                                  [gameBoard[0], gameBoard[1], gameBoard[2]],
                                  [gameBoard[3], gameBoard[4], gameBoard[5]],
                                  [gameBoard[6], gameBoard[7], gameBoard[8]],
                                  [gameBoard[1], gameBoard[4], gameBoard[7]],
                                  [gameBoard[2], gameBoard[5], gameBoard[8]],
                                  [gameBoard[0], gameBoard[4], gameBoard[8]],
                                  [gameBoard[2], gameBoard[4], gameBoard[6]]
                                ]
                      
        return {board, gameBoard, winningCombination} 
            
})()
      
        //Logic that creates player moves for both players
        let displayController = (function(){

            //Object that stores components of the game
            const gameObj = {
            displayWinner: document.querySelector('#winner-display'),
            playerOneScore: document.querySelector('#p1-score'),
            playerTwoScore: document.querySelector('#p2-score'),
            isGameOver: false,
            turn: true,
            playerOne: Player('player-one', 1, 'X', false, 0),
            playerTwo: Player('player-two', 2, 'O', false, 0)
            }


            //Logic that displays the current player

            let currentPlayer = () => {
                if (gameObj.turn) {
                  gameObj.displayWinner.textContent = "X's Turn"
                  return gameObj.turn
                } else if (!gameObj.turn) {
                  gameObj.displayWinner.textContent = "O's Turn"
                  return gameObj.turn
                }
            }
            
            //Logic that checks for three in a row
            let checkWin = () => {
                for (let x of ticTacToeBoard.winningCombination) {
                    if (x.every(i => i.textContent === gameObj.playerOne.marker)) {
                        gameObj.isGameOver = true;
                        gameObj.playerOne.winStatus = true;
                        gameObj.playerOne.score += 1
                        gameObj.displayWinner.textContent = 'Player 1 Wins!'
                        gameObj.playerOneScore.textContent = gameObj.playerOne.score
                        return gameObj.isGameOver
                    } else if (x.every(i => i.textContent === gameObj.playerTwo.marker)) {
                        gameObj.isGameOver = true;
                        gameObj.playerTwo.winStatus = true;
                        gameObj.playerTwo.score += 1
                        gameObj.displayWinner.textContent = 'Player 2 Wins!'
                        gameObj.playerTwoScore.textContent = gameObj.playerTwo.score
                        return gameObj.isGameOver
                    } 
                  }
                }

            // let drawGame = () => {
            //   for (let x of ticTacToeBoard.board) {
            //     if (x.every(m => m.textContent = gameObj.playerOne.marker)) {
                   
            //     } 
            //   }
            // }
                      

            //Function that alternates players turns
            let markBoard = () => {
                ticTacToeBoard.winningCombination;  
                for (let place of ticTacToeBoard.gameBoard) {
                    place.addEventListener('click', function(e){
                      if (e.target.textContent == '' && !gameObj.isGameOver){
                        if (gameObj.turn) {
                          gameObj.turn = false; 
                          e.target.textContent = gameObj.playerOne.marker
                          currentPlayer()
                          checkWin()
                          // drawGame()
                          return gameObj.turn;
                        } else if (!gameObj.turn){
                          gameObj.turn = true;
                          e.target.textContent = gameObj.playerTwo.marker 
                          currentPlayer()
                          checkWin()
                          // drawGame()
                          return gameObj.turn;
                        }
                      } 
                    })
                }
                
            }

            currentPlayer()
            markBoard()

            return {markBoard,
                    checkWin,
                    gameObj,
                    currentPlayer}
        })()


        let gameOver = (function(){
            let resetButton = document.querySelector('#reset-game')
            let nextRound = document.querySelector('#next-round')
            let board = ticTacToeBoard.gameBoard

            let restartGame = () => {
                for (let square of board){
                  square.textContent = ''
                }
                displayController.gameObj.playerOne.winStatus = false;
                displayController.gameObj.playerTwo.winStatus = false;
                displayController.gameObj.playerOne.score = 0;
                displayController.gameObj.playerTwo.score = 0;
                displayController.gameObj.playerOneScore.textContent = displayController.gameObj.playerOne.score
                displayController.gameObj.playerTwoScore.textContent = displayController.gameObj.playerTwo.score
                displayController.gameObj.isGameOver = false;
                displayController.gameObj.displayWinner.textContent = ''
            }

            let nextRd = () => {
                for (let square of board) {
                  square.textContent = ''
                }
                displayController.gameObj.isGameOver = false;
                displayController.gameObj.playerOne.winStatus = false;
                displayController.gameObj.playerTwo.winStatus = false;
                displayController.gameObj.displayWinner.textContent = ''
            }

              resetButton.addEventListener('click', restartGame)
              nextRound.addEventListener('click', nextRd)

              return {restartGame,
                     resetButton,
                     nextRound}
            
        })()
