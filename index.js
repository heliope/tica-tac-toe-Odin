
//REGRA PARTICIPANTES----------------------------------------------------------------

//IIFE DE ENTRADA NO JOGO
(function() {
    
    const entryForm = document.getElementById("formWelcome");
    entryForm.classList.remove("none");
})();


function createPlayer(name, mark) {

    // VARIVAEIS PRIVADAS
    let _name = name
    let _mark = mark;

    // ACESSAR E MODIFICAR AS VARIAVEIS
    const getName = () => _name;
    const getMark = () => _mark;
    const setName = (newName) => {_name = newName};
    const setMark = (newMark) => {_mark = newMark};

    return { getName, getMark, setName, setMark}
}

function checkPlayerName( input, regexInput) {

    // RETORNA UM ADD EVENT LISTENER
    return function (e) {
        // VALIDA SE O INPUT VAI DE ENCONTRO COM O REGEX ASSOCIADO
        const regexInput = e.target.value.match(input);

        
    }
    
    // VARIVAEIS PRIVADAS
    let _input = input
    
    // VALIDAÇÃO DO INPUT
    const regexInput = /^[\p{L}\p{N}]+$/u; // \p{L} qualquer letra incluíndo as acentuadas, \p{N}, qualquer numero, /u flag para unicode

    // ACESSAR E MODIFICAR AS VARIAVEIS


    const getInput = () => _input;

}

const player1 = createPlayer("Hélio", "X");

console.log(player1);



























/*
// FACTORY FUNCTION - TABULEIRO

function GameBoard() {

    // DIMENSÕES DO TABULEIRO
    const cels = 9;
    const board = [];
    
    // CONSTRUCÃO DO TABULEIRO
    for( let i = 0; i < cels; i++) {
        board[i] = [];
    }

    // CLOSURE - RETORNA A VARIAVEL BOARD
    const getBoard = () => board

    // RETORNA O OBJETO
    return {getBoard} 
}

// CRIAR UMA INSTANCIA DA FACTORY FUNCTION
const boardInstance = GameBoard()

//DEFINIÇÃO DO TABULEIRO VISUAL ----------------------------------------------------------------

function renderBoard() {

    // NOVA INSTANCIA DO GAMEBOARD
    const board = boardInstance.getBoard();
    const boardElementParent = document.getElementById("gameBoard");

    board.forEach(element => {
        let cels = document.createElement("div");
        boardElementParent.appendChild(cels);
        cels.classList.add("cel")
    });
}

document.addEventListener("DOMContentLoaded", renderBoard());


// RENDERIZAÇÃO DO TABULEIRO





/*
// 1 - Renderiza o tabuleiro
function renderBoard() {
    
    // 1.1 - Cria uma instância do tabuleiro utilizando Factory Function
    const board = gameBoard.getBoard();

    console.log(board);

    const boardElementParent = document.getElementById("gameBoard");

    //boardElementParent.removeChild(1);

    board.forEach((row) => {
        
        let cel = document.createElement("div");
        boardElementParent.appendChild(cel);
        cel.classList.add("cel");
    })
}

*/












/*
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

*/


