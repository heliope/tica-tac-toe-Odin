
// 1 -Definir o tabuleiro de Jogo

// 1.1 - Factory Function para criação do tabuleiro
function GameBoard() {
    
    // 1.1.1 - Dimensões do tabuleiro
    const rows = 3;
    const columns = 3;

    // 1.1.2 - Construção do Tabuleiro
    const board = [];

    for (let i = 0; i < rows; i++) {
        
        board[i] = [];
        for ( let j = 0; j < columns; j++) {
            
            board[i] = [];
        }
    }
    
    // 1.1.3 - Closure - neste caso retorna a variavel board
    const getBoard = () => board;

    return {getBoard}
}

console.log(GameBoard().getBoard());

// 1.2 - Cria uma instância do tabuleiro utilizando Factory Function
const gameBoard = GameBoard();

// 2 - Define Jogadores, Símbolo de Jogo e Regras de quem começa cada ronda

// 2.1 - Jogadores e Símbolo
function GameEntities( playerOneName = "player1", playerTwoName = "player2") {
    
    const players = [
        {
            name: playerOneName,
            mark: "X"
        },
        {
            name: playerTwoName,
            mark: "O"
        }
    ]
    
    // 2.1.1 - Define o jogador Atual
    let activePlayer = players[0];

    // 2.2.2 - Closure para definir quem começa cada jogada
    const switchPlayerTurn = () => {

        if (activePlayer === players[0]) {

            activePlayer = players[1];
        
        } else {

            activePlayer = players[0];
        }
    }

    // 2.2.3 - Função para devolver qual é o jogador atual - closure
    const getActivePlayer = () => activePlayer;

    return {players, activePlayer}
}

// 3 - Regras de jogo

// 3.1 - Regras Gerais de Jogo
function GameController() {

    // 3.1.1 - Instancar novo tabuleiro
    const board = GameBoard();

    // 3.1.2 - Instancia os jogadores
    const players = GameEntities();

    //3.1.3 - Controlo de cada jogada
    const roundMark = (position) => {
        
        const avalaiblePosition = board.filter
    }
    

}

//----------------------------- PARTE VISUAL ----------------------------------------------//

function renderBoard() {

    const board = gameBoard.getBoard();
    const boardElementParent = document.getElementById("gameboard");

    boardElementParent.innerHTML
}

