
    'use strict';
    
    //Tic-Tac-Toe board pieces and DOM elements
    let ticTacToeBoard = (function(){
        let topLeft = document.querySelector('#top-left')
        let topMid = document.querySelector('#top-mid')
        let topRight = document.querySelector('#top-right')
        let midLeft = document.querySelector('#mid-left')
        let midMid = document.querySelector('#mid-mid')
        let midRight = document.querySelector('#mid-right')
        let botLeft = document.querySelector('#bot-left')
        let botMid = document.querySelector('#bot-mid')
        let botRight = document.querySelector('#bot-right')
        let gameBoard = [topLeft, topMid, topRight,
                        midLeft, midMid, midRight,
                        botLeft, botMid, botRight]

        let winningCombination = 
                        [[topLeft, topMid, topRight],
                        [midLeft, midMid, midRight],
                        [botLeft, botMid, botRight],
                        [topLeft, midLeft, botLeft],
                        [topMid, midMid, botMid],
                        [topRight, midRight, botRight],
                        [topLeft, midMid, botRight],
                        [topRight, midMid, botLeft]];
            

        return {gameBoard, winningCombination} 
            
})()
        //Player factory function
        const Player = function(name, move, marker, winStatus, score){
    
            return {name, move, marker, winStatus, score}
        }

        //Logic that creates player moves for both players
        let playerMoves = (function(){
            let isGameOver = false;
            let turn = true;
            let playerOne = Player('player-one', 1, 'X', false)
            let playerTwo = Player('player-two', 2, 'O', false)
            let checkWin = () => {
                for (let x of ticTacToeBoard.winningCombination) {
                    if (x.every(i => i.textContent === playerOne.marker)) {
                        console.log('player one wins!');
                        isGameOver = true;
                        playerOne.winStatus = true;
                        console.log(isGameOver)
                        return isGameOver
                    } else if (x.every(i => i.textContent === playerTwo.marker)) {
                        console.log('player two wins!');
                        isGameOver = true;
                        playerTwo.winStatus = true;
                        console.log(isGameOver)
                        return isGameOver
                    }
                    }
                }

            //Function that alternates players turns
            let markBoard = () => {
                ticTacToeBoard.winningCombination;  
                for (let place of ticTacToeBoard.gameBoard) {
                    place.addEventListener('click', function(e){
                    //   let p = e.target.parentElement
                    //   let index = Array.prototype.indexOf.call(p.children, e.target)
                      if (e.target.textContent == '' && !checkWin()){
                        if (turn) {
                          turn = false; 
                          e.target.textContent = playerOne.marker
                          return turn;
                        } else if (!turn){
                          turn = true;
                          e.target.textContent = playerTwo.marker 
                          return turn;
                        }
                      }
                    })
                }
                
            }

            markBoard()

            return {playerOne, 
                    playerTwo, 
                    markBoard,
                    turn,
                    isGameOver,
                    checkWin}

        
        })()


        let game = (function(){
            let endGame = false
            let board = ticTacToeBoard.gameBoard

            function restartGame() {
                for (squares of board){
                    board.textContent = ''
                }
            }
            
            function winnerAnnouncement() {
                playerMoves.playerOne.score = 0
                playerMoves.playerTwo.score = 0
                if (playerMoves.playerOne.winStatus = true){
                    playerMoves.playerOne.score += 1
                } if (playerMoves.playerTwo.winStatus = true){
                    playerMoves.playerTwo.score += 1
                }
            }

            winnerAnnouncement()

            return {winnerAnnouncement}
            
        })()
