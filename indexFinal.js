// FACTORY FUNCTION -> CRIAÇÃO DO GAMEBOARD
function Gameboard() {

    // DIMENSÕES DO TABULEIRO
    const rows = 3;
    const columns = 3;
    const board = [];

    // CONSTRUÇÃO DO TABULEIRO
    for ( let i = 0; i < rows; i++) {

        board[i] = [];

        // CADA CÉLULA COMEÇA COMO VAZIA
        for ( let j = 0; j < columns; j++) {

            board[i][j] = [];
        }
    }

    // CLOSURE - VARIÁVEL PRIVADA
    const getGameboard = () => board;

    console.log(board);

    return {getGameboard}
}

// FACTORY FUNCTION -> CRIAÇÃO DOS JOGADORES
function Player( name, mark) {

    let hasWon = false;
    let isActive = false;

    const players = [
        {
            name:name,
            mark: mark,
            hasWon: () => hasWon,
            isActive: () => isActive,
            setActive: (active) => {
                isActive = active
            },
            setWon: () => {
                hasWon = true;
            }
        }
    ]
    
    const getPlayers = () => players;

    return {getPlayers}
}

function CheckPlayerName( inputId, errorMessageId, buttonEnterId) {

    const input = document.getElementById(inputId);
    const errorMessage = document.getElementById(errorMessageId);

    // O NOME DO JOGADOR DEVE TER ENTRE 3 A 15 LETRAS
    const inputRegex = /^[\p{L}\p{N}]{3,15}$/u;

    // CLOSURE - VALIDAÇÃO DO NOME DO JOGADOR
    const checkPlayerName = () => {

        const inputRegexValidate = inputRegex.test(input.value);

        if (input.value.length <3 || input.value.length > 15) {

            errorMessage.textContent = "Your name should be between 3 and 15 characters";
            errorMessage.className = "errorMessageIncorrect";
        }

        else if (!inputRegexValidate) {

            errorMessage.textContent = "Incorrect characters! Please try again";
            errorMessage.className = "errorMessageIncorrect";
        }

        else {

            errorMessage.textContent = "Correct Names! Good Luck!";
            errorMessage.className = "errorMessageCorrect";
            Player(input.value, "teste");
        }

        const validatonButton = UnlockButtonEnter(buttonEnterId);

        validatonButton.validateButtonEnter();
    }

    // EXECUTA A FUNÇÃO CHECKPLAYERNAME
    function checkPlayerNameEventAdd() {

        input.addEventListener("input", checkPlayerName);
    }

    function checkPlayerNameEventRemove() {
        
        input.removeEventListener("input", checkPlayerName);
    }

    return {checkPlayerNameEventAdd, checkPlayerNameEventRemove};
}

// DESBLOQUEAR O BOTÃO DE ENTRADA
function UnlockButtonEnter(buttonEnterId) {

    const regexMessagePlayer1 = document.getElementById("regexMessagePlayer1");
    const regexMessagePlayer2 = document.getElementById("regexMessagePlayer2");
    const buttonEnter = document.getElementById(buttonEnterId);

    // CLOSURE -> LÓGICA DE VALIDAÇÃO

    const validateButtonEnter = () => {

        if (regexMessagePlayer1.classList.contains("errorMessageCorrect") && regexMessagePlayer2.classList.contains("errorMessageCorrect")) {

            buttonEnter.removeAttribute("disabled");
            buttonEnter.classList.add("enter");
            buttonEnter.classList.remove("none");
        }

        else {   

            buttonEnter.setAttribute("disabled", "true");
            buttonEnter.classList.remove("enter");
            buttonEnter.classList.add("none");
        }
    }

    return {validateButtonEnter}
}

//***************************** PARTE VISUAL **********************************************************************************************************/

function StartGame() {

    const startButton = document.getElementById("enter");
    const formWelcome = document.getElementById("formWelcome")

    // ATIVAÇÃO DA VERIFICAÇÃO DOS NOMES
    const player1Checker = CheckPlayerName("namePlayer1","regexMessagePlayer1","enter");
    const player2Checker = CheckPlayerName("namePlayer2","regexMessagePlayer2","enter");

    player1Checker.checkPlayerNameEventAdd();
    player2Checker.checkPlayerNameEventAdd();

    startButton.addEventListener("click", () => {

        player1Checker.checkPlayerNameEventRemove();
        player2Checker.checkPlayerNameEventRemove();
        formWelcome.style.display="none";
        ScreenControllerPlayers();
        ScreenControllerGameBoard();
    })
}

function ScreenControllerGameBoard() {

    // INSTANCIAÇÃO DO TABULEIRO
    const gameboard = Gameboard();
    const board = gameboard.getGameboard();
    const gameBoardHtml = document.getElementById("gameboard");

    // VERIFICA SE O TABULEIRO JÁ EXISTE E REMOVE TODOS OS FILHOS
    while ( gameBoardHtml.firstChild) {

        gameBoardHtml.removeChild(gameBoardHtml.firstChild)
    }

    // RENDERIZAÇÃO DO TABULEIRO

    for ( let i = 0; i < board.length; i++) {

        for ( let j = 0; j < board[i].length; j++) {

            const cellButton = document.createElement("button");
            cellButton.classList.add("cel");
            gameBoardHtml.appendChild(cellButton);
        }

        gameBoardHtml.style.display="grid";
    }
}

function ScreenControllerPlayers() {

    // INSTANCIAÇÃO DOS JOGADORES
    const leaderboard = document.getElementById("leaderboard");
    const players = Player().getPlayers();
    const player1 = document.getElementById("playerName1");
    const player2 = document.getElementById("playerName1");

console.log(players);
   player1.textContent = players[0].name;
   player2.textContent = players[1].name;    
}

document.addEventListener("DOMContentLoaded",StartGame);