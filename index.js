
// REGRA PARTICIPANTES----------------------------------------------------------------

// CRIAÇÃO E VALIDAÇÃO DO NOME DOS JOGADORES
function checkPlayerName( regexInput, input, errorMessage , buttonEnter) {
        
    // FUNÇÃO QUE RETORNA O ADD EVENT LISTENER
    return function (e) {
            
        const inputUserRegex = regexInput.test(e.target.value);
            
        if (input.value.length < 3 || input.value.length > 15) {
            errorMessage.textContent = "Your name should be between 3 and 15 characters";
            errorMessage.className = "errorMessageIncorrect";
        }

        else if (!inputUserRegex) {
            errorMessage.textContent = "Incorrect characters! Please try again";
            errorMessage.className = "errorMessageIncorrect";
        }

        else {
            errorMessage.textContent = "Correct names! Good Luck!";
            errorMessage.className = "errorMessageCorrect";
        }

        checkButtons(buttonEnter);
    }
}

// FUNÇÃO QUE VERIFICA QUE DESBLOQUEIA O BOTÃO PARA ENTRAR
function checkButtons(buttonEnter) {

    const regexMessagePlayer1 = document.getElementById("regexMessagePlayer1");
    const regexMessagePlayer2 = document.getElementById("regexMessagePlayer2");

    if ( regexMessagePlayer1.classList.contains("errorMessageCorrect") && regexMessagePlayer2.classList.contains("errorMessageCorrect")) {
        
        buttonEnter.removeAttribute("disabled");
        buttonEnter.classList.remove("none");
        buttonEnter.classList.add("enter");
    }

    else {
        buttonEnter.setAttribute("disabled","false");
        buttonEnter.classList.remove("enter");
        buttonEnter.classList.add("none");
    }
}

// FUNÇÃO PARA VERFICAR MARKS SELECIONADAS PELOS JOGADORES
function selectMarksPlayer(markPlayer1Id, markPlayer2Id) {

    return function() {

        const markPlayer1 = document.getElementById(markPlayer1Id);
        const markPlayer2 = document.getElementById(markPlayer2Id);

        console.log("markPlayer1 value:", markPlayer1.value);
        console.log("markPlayer2 value:", markPlayer2.value);

        if ( markPlayer1.value === "circle") {

            markPlayer2.value="cross";
        }
    
        else if ( markPlayer1.value === "cross") {
    
            markPlayer2.value = "circle";
        }
    
        else if ( markPlayer2.value === "circle") {
    
            markPlayer1.value = "cross";
        }

    }
}

// FUNÇÃO DO MENU QUE INICIALIZA
function initCheckPlayerName () {

    // VALIDAÇÃO DO INPUT
    const regexInput = /^[\p{L}\p{N}]{3,15}$/u; // \p{L} qualquer letra incluíndo as acentuadas, \p{N}, qualquer numero, /u flag para unicode
    const inputPlayer1 = document.getElementById("namePlayer1");
    const inputPlayer2 = document.getElementById("namePlayer2");
    const regexMessagePlayer1 = document.getElementById("regexMessagePlayer1");
    const regexMessagePlayer2 = document.getElementById("regexMessagePlayer2");
    const markPlayer1 = document.getElementById("markPlayer1");
    const markPlayer2 = document.getElementById("markPlayer2");
    const buttonEnter = document.getElementById("enter");
    
    // FACTORY FUNCTION - INSTANCIAR OBJETO
    const inputUserCheckPlayer1 = checkPlayerName(regexInput, inputPlayer1, regexMessagePlayer1, buttonEnter);
    const inputUserCheckPlayer2 = checkPlayerName(regexInput,inputPlayer2,regexMessagePlayer2, buttonEnter);

    //  MOSTRA MENSAGEM
    regexMessagePlayer1.classList.remove("none");
    regexMessagePlayer2.classList.remove("none");

    // ADICIONA UM EVENTO LISTENER NO CAMPO DE ENTRADA
    inputPlayer1.addEventListener("input",inputUserCheckPlayer1);
    inputPlayer2.addEventListener("input", inputUserCheckPlayer2);

    // FACTORY FUNCTION - INSTANCIAR OBJETO
    const selectMarksPlayerTotal = selectMarksPlayer(markPlayer1,markPlayer2);
    markPlayer1.addEventListener("change", selectMarksPlayerTotal);
    markPlayer2.addEventListener("change", selectMarksPlayerTotal);

    //INICIAR O JOGO
    buttonEnter.addEventListener("click", startGame);
}

// INCIALIZAR O JOGO
function startGame() {
    
    const board = document.getElementById("gameBoard");
    const leaderboard = document.getElementById("leaderboard");
    const buttons = document.getElementById("buttons");
    const formWelcome = document.getElementById("formWelcome");
    const playerName1 = document.getElementById("playerName1");
    const playerName2 = document.getElementById("playerName2");
    const inputPlayer1 = document.getElementById("namePlayer1");
    const inputPlayer2 = document.getElementById("namePlayer2");

    // ATRIBUI NOME DOS JOGADORES NO LEADERBOARD
    playerName1.textContent = inputPlayer1.value;
    playerName2.textContent = inputPlayer2.value;

    // MOSTRA VISIVEIS O LEADERBOARD, TABULEIRO DE JOGO E BUTTONS

    board.classList.remove("none");
    leaderboard.classList.remove("none");
    buttons.classList.remove("none");

    // OCULTA FORMULÁRIO
    formWelcome.classList.add("none");

}

document.addEventListener("DOMContentLoaded",initCheckPlayerName);

/*
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


