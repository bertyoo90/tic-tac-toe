
    'use strict';
    
    //Tic-Tac-Toe board pieces and DOM elements
    let ticTacToeBoard = (function(){

            topLeft= document.querySelector('#top-left'),
            topMid= document.querySelector('#top-mid'),
            topRight= document.querySelector('#top-right'),
            midLeft= document.querySelector('#mid-left'),
            midMid= document.querySelector('#mid-mid'),
            midRight= document.querySelector('#mid-right'),
            botLeft= document.querySelector('#bot-left'),
            botMid= document.querySelector('#bot-mid'),
            botRight= document.querySelector('#bot-right'),
            gameBoard= [topLeft, topMid, topRight,
                        midLeft, midMid, midRight,
                        botLeft, botMid, botRight],

            winningCombination=
                        [[topLeft, topMid, topRight],
                        [midLeft, midMid, midRight],
                        [botLeft, botMid, botRight],
                        [topLeft, midLeft, botLeft],
                        [topMid, midMid, botMid],
                        [topRight, midRight, botRight],
                        [topLeft, midMid, botRight],
                        [topRight, midMid, botLeft]]
        
        
            

        return {gameBoard, winningCombination} 
            
})()
        //Player factory function
        const Player = function(name, move, marker, winStatus, score){
    
            return {name, move, marker, winStatus, score}
        }

        //Logic that creates player moves for both players
        let playerMoves = (function(){
            //Object that stores components of the game
            const gameObj = {
            isGameOver: false,
            turn: true,
            playerOne: Player('player-one', 1, 'X', false),
            playerTwo: Player('player-two', 2, 'O', false)
            }
            
            let checkWin = () => {
                for (let x of ticTacToeBoard.board.winningCombination) {
                    if (x.every(i => i.textContent === gameObj.playerOne.marker)) {
                        alert('player one wins!');
                        gameObj.isGameOver = true;
                        gameObj.playerOne.winStatus = true;
                        console.log(gameObj.isGameOver)
                        return gameObj.isGameOver
                    } else if (x.every(i => i.textContent === gameObj.playerTwo.marker)) {
                        alert('player two wins!');
                        gameObj.isGameOver = true;
                        gameObj.playerTwo.winStatus = true;
                        console.log(gameObj.isGameOver)
                        return gameObj.isGameOver
                    }
                  }
                }
           
            
            //Function that alternates players turns
            let markBoard = () => {
                ticTacToeBoard.board.winningCombination;  
                for (let place of ticTacToeBoard.board.gameBoard) {
                    place.addEventListener('click', function(e){
                    //   let p = e.target.parentElement
                    //   let index = Array.prototype.indexOf.call(p.children, e.target)
                      if (e.target.textContent == '' && !gameObj.isGameOver){
                        if (gameObj.turn) {
                          gameObj.turn = false; 
                          e.target.textContent = gameObj.playerOne.marker
                          checkWin()
                          return gameObj.turn;
                        } else if (!gameObj.turn){
                          gameObj.turn = true;
                          e.target.textContent = gameObj.playerTwo.marker 
                          checkWin()
                          return gameObj.turn;
                        }
                      } 
                    })
                }
                
            }

            markBoard()

            return {markBoard,
                    checkWin,
                    gameObj}

        
        })()


        // let game = (function(){
        //     let endGame = false
        //     let board = ticTacToeBoard.gameBoard

        //     function restartGame() {
        //         for (squares of board){
        //             board.textContent = ''
        //         }
        //     }
            
        //     function winnerAnnouncement() {
        //     //     playerMoves.playerOne.score = 0
        //     //     playerMoves.playerTwo.score = 0
        //     //     if (playerMoves.playerOne.winStatus = true){
        //     //         playerMoves.playerOne.score += 1
        //     //     } if (playerMoves.playerTwo.winStatus = true){
        //     //         playerMoves.playerTwo.score += 1
        //     //     }
        //     // }

        //     winnerAnnouncement()

        //     return {winnerAnnouncement}
            
        // })()
