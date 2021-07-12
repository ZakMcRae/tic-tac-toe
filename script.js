const gameBoard = (() => {
    let markers = ['X','O','X','O','X','X','O','X','O'];
    // let markers = ['','','','','','','','',''];

    // display markers onto gameboard
    const display = () => {
        const cells = document.querySelectorAll('div[data-cell]')
        
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

        player1Name.textContent = prompt("What is Player 1's name?", 'Player 1')
        player2Name.textContent = prompt("What is Player 2's name?", 'Player 2')
    }

    return {markers, display, clear, checkForWin, setPlayerNames}
})()

const Game = () => {
    let activePlayer = 0;

    // wipe board, set playernames and display board
    const newGame = () => {
        gameBoard.clear()
        gameBoard.display()
        gameBoard.setPlayerNames()
        
        // styling to show active player
        const player1Display = document.querySelector('#player1')
        player1Display.classList.add('active')
    }

    const toggleActivePlayer = () => {
        activePlayer = 1 - activePlayer;
        
        const player1Display = document.querySelector('#player1')
        player1Display.classList.toggle('active')
        
        const player2Display = document.querySelector('#player2')
        player2Display.classList.toggle('active')
    }

    const playRound = () => {
        gameBoard.display()
    }

    return {newGame, playRound, toggleActivePlayer, activePlayer}
}


game = Game()
gameBoard.display()

const newGameButton = document.querySelector('#new-game-button')
newGameButton.addEventListener('click', game.newGame)
