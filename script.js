const gameBoard = (() => {
    let markers = ['','','','','','','','',''];

    const cells = document.querySelectorAll('div[data-cell]')

    // display markers onto gameboard
    const display = () => {
        for(let i=0; i < markers.length; i++){
            cells[i].textContent = markers[i]
        }
    }
    
    // resest board to all blanks for new game
    const clear = () => {
        markers = ['','','','','','','','','']
    }

    // makes arrays for all possible win rows of 3
    // loops through each of those arrays looking to see if there is a win
    const checkForWin = () => {
        const row1 = [markers[0], markers[1], markers[2]]
        const row2 = [markers[3], markers[4], markers[5]]
        const row3 = [markers[6], markers[7], markers[8]]

        const col1 = [markers[0], markers[3], markers[6]]
        const col2 = [markers[1], markers[4], markers[7]]
        const col3 = [markers[2], markers[5], markers[8]]

        const diag1 = [markers[0], markers[4], markers[8]]
        const diag2 = [markers[2], markers[4], markers[6]]

        const winRows = [row1, row2, row3, col1, col2, col3, diag1, diag2]

        for (let i=0; i < winRows.length; i++){
            // skip check if row has a blank
            if (winRows[i].includes('')){
                continue
            }

            // check if every element is the same value (aka a win)
            if (winRows[i].every((val, i, arr) => val == arr[0])){
                return winRows[i][0]
            }
        } 
        
        // if no empty markers and no win - return draw
        // else returns false if no win and game no finished
        if (!markers.includes('')) return 'draw'
            return false
        }

    const setPlayerNames = () => {
        const player1Name = document.querySelector('#player1-name')
        const player2Name = document.querySelector('#player2-name')

        game.player1 = prompt("What is Player 1's name?", game.player1)
        game.player2 = prompt("What is Player 2's name?", game.player2)

        player1Name.textContent = game.player1 
        player2Name.textContent = game.player2
    }

    // set event listeners to game cells
    const setPlayerMoveEvents = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', fillCell)
        })
    }

    const removePlayerMoveEvents = () => {
        cells.forEach( cell => {
            cell.removeEventListener('click', fillCell)
        })
    }

    // set marker to cell depending on player or if already marked
    const fillCell = (e) => {
        const cellIndex = e.target.getAttribute('data-cell')
        if (!(markers[cellIndex] == '')) {
            return            
        } else{
            markers[cellIndex] = game.activePlayer ? 'O' : 'X'

            // swtich players and start next round
            game.toggleActivePlayer()
            game.playRound()
        }
    }

    return {markers, display, clear, checkForWin, setPlayerNames, setPlayerMoveEvents, removePlayerMoveEvents}
})()

const Game = () => {
    // track active player - toggles between 0 and 1 (player1: 0, player2: 1)
    let activePlayer = 0;
    let player1 = 'Player 1'
    let player2 = 'Player 2'

    const setNewGameButton = () => {
        const newGameButton = document.querySelector('#new-game-button')
        newGameButton.addEventListener('click', game.newGame)
    }

    // wipe board, set playernames and display board
    const newGame = () => {
        const winBox = document.querySelector('.winner-box')
        if (winBox) winBox.remove()

        gameBoard.clear()
        gameBoard.display()
        gameBoard.setPlayerNames()
        
        // styling to show active player
        const player1Display = document.querySelector('#player1')
        player1Display.classList.add('active')
    
        gameBoard.setPlayerMoveEvents()
        game.playRound()
    }

    // toggles back and forth - also gives styling via css
    const toggleActivePlayer = () => {
        game.activePlayer = 1 - game.activePlayer;
        
        
        const player1Display = document.querySelector('#player1')
        player1Display.classList.toggle('active')
        
        const player2Display = document.querySelector('#player2')
        player2Display.classList.toggle('active')
    }

    const playRound = () => {
        switch(gameBoard.checkForWin()){
            case 'X':
                gameBoard.display()
                endGame(`${game.player1} Wins!`)
                break
            
            case 'O':
                gameBoard.display()
                endGame(`${game.player2} Wins!`)
                break

            case 'draw':
                gameBoard.display()
                endGame('Game is a Draw!')
                break
        }

        gameBoard.display()
    }

    function endGame(winCase){
        gameBoard.removePlayerMoveEvents()
        // alert(winCase)

        const winBox = document.createElement('div')
        winBox.classList.add('winner-box')
        winBox.textContent = winCase

        const infoBoard = document.querySelector('#game-info')
        infoBoard.appendChild(winBox)

        // reset css styles for next game
        const player1Display = document.querySelector('#player1')
        player1Display.classList.remove('active')
        
        const player2Display = document.querySelector('#player2')
        player2Display.classList.remove('active')

        game.activePlayer = 0
    }

    return {newGame, playRound, toggleActivePlayer, activePlayer, setNewGameButton}
}


game = Game()
game.setNewGameButton()

