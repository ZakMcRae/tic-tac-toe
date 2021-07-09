const gameBoard = (() => {
    let markers = ['X','X','O','O','O','X','X','O','X'];
    const display = () => {
        const cells = document.querySelectorAll('div[data-cell]')
        
        for(let i=0; i < markers.length; i++){
            cells[i].textContent = markers[i]
        }
    }
    

    return {markers, display}
})()

const Player = (name) => {
    const getName = () => name;
    return {name, getName}
}

const Game = () => {
    let round = 1;
    const playRound = () => {
    }
}

gameBoard.display()