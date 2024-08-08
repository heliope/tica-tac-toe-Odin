// JOGO - CRIA JOGADORES E MARCAS

// FACTORY FUNCTION
function Gameboard() {

    // DIMENSÕES DO TABULEIRO
    const rows = 3;
    const columns = 3;
    const board = [];

    // CONSTRUÇÃO DO TABULEIRO
    for (let i = 0; i < rows; i++) {

        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
    
    // CLOSURE -RETORNA VARIAVEL BOARD
    const getGameBoard = () => board

    // ADICIONA MARK DE UM JOGADOR NO TABULEIRO
    const placeMark = ( column, row, mark) => {

        // VERIFICA SE ESTÁ DISPONIVEL
        if ( board[column][row].getMark() === "") {

            if ( mark === "circle") {

                board[column][row].addMark("O");
            }

            else {

                board[column][row].addMark("X");
            }

        }
    }

    // RETORNA UM OBJETO
    return {getGameBoard, placeMark};
}

// CÉLULA QUE CONTROLA AS CÉLULAS DO TABULEIRO E VERIFICA O SEU PREENCHIMENTO
function Cell() {

    // INICIALMENTE O TABULEIRO NAO ESTÁ PREENCHIDO
    let mark = '';

    const addMark = (playerMark) => {

        mark = playerMark 
    };

    // DEVOLVE O VALOR DA CÉLULA - VARIAVEL PRIVADA
    const getMark = () => mark;

    return { addMark, getMark};
}

// CRIAÇÃO DOS JOGADORES
function checkPlayerName ( inputId, errorMessageId, buttonEnterId) {
        
    const input = document.getElementById(inputId);
    const errorMessage = document.getElementById(errorMessageId);
    
    // O NOME DO JOGADOR DEVE TER ENTRE 3 A 15 LETRAS
    const regexInput = /^[\p{L}\p{N}]{3,15}$/u;

    // CLOSURE - LÓGICA DE VALIDAÇÃO DO NOME DO JOGADOR
    const checkName = () => {
        
        const inputUserRegex = regexInput.test(input.value);

        if( input.value.length < 3 || input.value.length > 15 ) {

            errorMessage.textContent = "Your name should be between 3 and 15 characters";
            errorMessage.className = "errorMessageIncorrect";
        }

        else if( !inputUserRegex ) {

            errorMessage.textContent = "Incorrect characters! Please try again";
            errorMessage.className = "errorMessageIncorrect";
        }

        else {

            errorMessage.textContent= "Correct Names! Good Luck!";
            errorMessage.className = "errorMessageCorrect";
        }

        // INSTANCIA A FUNÇÃO DE DESBLOQUEAR O BOTÃO DE ENTRADA
        const validatorButton = checkButton(buttonEnterId);
        
        validatorButton.validateButton();
    }

    // EXECUTA A FUNÇÃO CHECKNAME
    function attachEventListener() {

        input.addEventListener("input",checkName);
    }

    function deleteEventListener() {

        input.removeEventListener("input",checkName);
    }

    // RETORNA O VALOR DO JOGADOR
    function getName() {

        return input.value;
    }

    return  {attachEventListener, deleteEventListener, getName};
}

// DESBLOQUEIA O BOTÃO DE ENTRADA
function checkButton( buttonEnterId) {

    const regexMessagePlayer1 = document.getElementById("regexMessagePlayer1");
    const regexMessagePlayer2 = document.getElementById("regexMessagePlayer2");
    const buttonEnter = document.getElementById(buttonEnterId);
      
    //  CLOSURE - LÓGICA DE VALIDAÇÃO
    const validateButton = () => {

        if( regexMessagePlayer1.classList.contains("errorMessageCorrect") && regexMessagePlayer2.classList.contains("errorMessageCorrect")) {

            buttonEnter.removeAttribute("disabled");
            buttonEnter.classList.remove("none");
            buttonEnter.classList.add("enter");
        }

        else {

            buttonEnter.setAttribute("disabled", "true");
            buttonEnter.classList.remove("enter");
            buttonEnter.classList.add("none");
        }
    }

    return {validateButton};
}

// FUNÇÃO QUE VERIFICA MARKS SELECIONADAS PELOS PLAYERS
function selectPlayerMarks( markPlayer1Id, markPlayer2Id) {

    const markPlayer1 = document.getElementById(markPlayer1Id);
    const markPlayer2 = document.getElementById(markPlayer2Id);

    // CLOSURE - GUARDA A LÓGICA DE VERIFICAÇÃO DAS MARCAS DOS PLAYERS
    const updateMarks = (e) => {
            
        if ( e.target === markPlayer1) {

            if( markPlayer1.value === "circle" ) {

                markPlayer2.value = "cross";
            }
    
            else if( markPlayer1.value === "cross" ) {
    
                markPlayer2.value = "circle";
            }
        }

        else if ( e.target === markPlayer2) {
                
            if( markPlayer2.value === "circle" ) {

                markPlayer1.value = "cross";
            }
    
            else if( markPlayer2.value === "cross" ) {
    
                markPlayer1.value = "circle";
            }
        } 
    }

    const markPlayer1Validate = () => markPlayer1;
    const markPlayer2Validate = () => markPlayer2;

    // INSTANCIACAO DAS CLOSURES
    markPlayer1.addEventListener("change", updateMarks);
    markPlayer2.addEventListener("change", updateMarks);

    return {markPlayer1Validate, markPlayer2Validate, updateMarks};
}

function GameController() {

    // VARIAVEIS JOGADORES E MARCAS
    let player1Name = checkPlayerName( "namePlayer1", "regexMessagePlayer1", "enter").getName();
    let player2Name = checkPlayerName( "namePlayer2", "regexMessagePlayer2", "enter").getName();
    let player1Mark = selectPlayerMarks("markPlayer1", "markPlayer2").markPlayer1Validate().value;
    let player2Mark = selectPlayerMarks("markPlayer1", "markPlayer2").markPlayer2Validate().value;

    const board = Gameboard();

    const players = [
        {
            name: player1Name,
            mark: player1Mark
        },
        {
            name: player2Name,
            mark: player2Mark
        }
    ]

    let activePlayer = players[0].name;
    let activePlayerMark  = players[0].mark;

    console.log(activePlayer);

    const switchPlayerTurn = () => {

        if ( activePlayer === players[0].name) {

            activePlayer = players[1].name;
            activePlayerMark = players[1].mark;
        }

        else {

            activePlayer = players[0].name;
            activePlayerMark = players[1].mark;
        }
    }

    const getActivePlayer = () => activePlayer;
    const getActivePlayerMark = () => activePlayerMark;

    const playRound = (column, row) => {

        board.placeMark(column, row, getActivePlayerMark());
        switchPlayerTurn();
    }


    return {getActivePlayer, getActivePlayerMark, playRound, getGameBoard: board.getGameBoard};

}

function ScreenController() {

    // INSTANICAÇÃO DA TABULEIRO
    const game = GameController();
    const gameboard = document.getElementById("gameboard");
    const leaderboard = document.getElementById("leaderboard");
    const buttons = document.getElementById("buttons");

    const updateScreen = () => {

        // GARANTE QUE NAO EXISTE NADA PREENCHIDO
        while( gameboard.firstChild) {
            gameboard.removeChild(gameboard.firstChild);
        }

        // MONTAR NOVAMNENTE O TABUELEIRO
        const board = game.getGameBoard();

        // RENDERIZAÇÃO DO TABULEIRO
        board.forEach( (row, rowIndex) => {
            
            row.forEach( ( cell, colIndex) => {
                
                const cellButton = document.createElement("button");
                cellButton.classList.add("cel");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;
                cellButton.textContent = cell.getMark();
                gameboard.appendChild(cellButton);
            })
        })

        gameboard.style.display="grid";
        leaderboard.style.display="flex";
        buttons.style.display="flex";
    }

    function clickHandlerBoard(e) {

        const selectCelColumn = e.target.dataset.column;
        const selectCelRow = e.target.dataset.row;

        if (!selectCelColumn || !selectCelRow) return;

        const selectCelColumnValue = parseInt(selectCelColumn);
        const selectCelRowValue = parseInt(selectCelRow);

        game.playRound(selectCelColumnValue,selectCelRowValue);
        updateScreen();
    }

    
    gameboard.addEventListener("click", clickHandlerBoard);

    updateScreen();
}

function StartGame() {

    const startButton = document.getElementById("enter");
    const formWelcome = document.getElementById("formWelcome");

    // Ativa a verificação de nomes
    const player1Checker = checkPlayerName("namePlayer1", "regexMessagePlayer1", "enter");
    const player2Checker = checkPlayerName("namePlayer2", "regexMessagePlayer2", "enter");

    player1Checker.attachEventListener();
    player2Checker.attachEventListener();

    selectPlayerMarks("markPlayer1","markPlayer2");
    
    startButton.addEventListener("click", () => {
        player1Checker.deleteEventListener();
        player2Checker.deleteEventListener();
        formWelcome.style.display = "none";
        ScreenController();
    });
}


document.addEventListener("DOMContentLoaded", StartGame);


/*



    // INICIA O JOGO
    function init() {

        const buttonEnter = document.getElementById("enter");

        // INSTANCIA O CLOSURE
        const player1Checker = checkPlayerName( "namePlayer1", "regexMessagePlayer1", "enter");
        const player2Checker = checkPlayerName( "namePlayer2", "regexMessagePlayer2", "enter");

        // VALIDAÇÃO DO NOME NO INPUT
        player1Checker.attachEventListener();
        player2Checker.attachEventListener();

        // INSTANCIA O CLOSURE
        const selectMarksPlayer = selectPlayerMarks("markPlayer1", "markPlayer2");

        // AÇÃO AO CLICAR NO BOTÃO DE ENTRAR
        buttonEnter.addEventListener("click", () => {

            // ATRIBUIÇÃO DE NOMES AOS JOGADORES
            player1Name = player1Checker.getName();
            player2Name = player2Checker.getName();

            // ATRIBUIÇÃO DAS MARCAS AO JOGADORES
            player1Mark = document.getElementById("markPlayer1").value;
            player2Mark = document.getElementById("markPlayer2").value;

            //REMOVER OS EVENTLISTENER DA VALIDAÇÃO DO NOME
            player1Checker.deleteEventListener();
            player2Checker.deleteEventListener();

            // REMOVER OS EVENTLISTENER DA VALIDAÇÃO DAS MARCAS
            selectMarksPlayer.markPlayer1.removeEventListener("change", selectMarksPlayer.updateMarks);
            selectMarksPlayer.markPlayer2.removeEventListener("change", selectMarksPlayer.updateMarks);
            
            // RENDERIZAÇÃO DO TABULEIRO
            startGame();

            // DISPONIBILIZA O JOGADOR ATUAL
            logicRound().getActivePlayer;
            logicRound().getActivePlayerMark;
        });
    }

    // PARTE VISUAL DA RENDERIZAÇÃO DO TABULEIRO
    function startGame() {

        const board = document.getElementById("gameboard");
        const leaderboard = document.getElementById("leaderboard");
        const buttons = document.getElementById("buttons");
        const formWelcome = document.getElementById("formWelcome");
        const playerName1 = document.getElementById("playerName1");
        const playerName2 = document.getElementById("playerName2");

        // NOVA INSTANCIA DA FUNCAO BOARDGAME
        const boardGame = createGameboard().getGameBoard();

        boardGame.forEach( element => {

            let cels = document.createElement("div");
            board.appendChild(cels);
            cels.classList.add("cel");
        })

        // RENDERIZA A INFORMAÇÃO NO HTML DO NOME DOS PLAYERS
        playerName1.textContent = player1Name;
        playerName2.textContent = player2Name;

        // MOSTRA TABULEIRO, LEADERBOARD E BUTTONS
        board.classList.remove("none");
        leaderboard.classList.remove("none");
        leaderboard.style.display = "flex";
        buttons.classList.remove("none");
        formWelcome.classList.add("none");

        // ADICIONA O EVENTLISTENER DE CLIQUE EM CADA CÉLULA
        const cels = document.querySelectorAll(".cel");

        cels.forEach( cel => {

            cel.addEventListener("click", clickHandlerBoard, {once: true}); //evento só é disparado uma vez 
        });

    }

    // LÓGICA DOS ROUNDS
    function logicRound() {

        let activePlayer = player1Name;
        let activePlayerMark = player1Mark;

        const switchPlayerTurn = () => {
            
            if ( activePlayer === player1Name ) {

                activePlayer = player2Name;
                activePlayerMark = player2Mark;
            }

            else {

                activePlayer = player1Name;
                activePlayerMark = player1Mark;
            }

        }
        
        const getActivePlayer = () => activePlayer;
        const getActivePlayerMark = () => activePlayerMark;

        return {getActivePlayer, getActivePlayerMark};
    }

    // CÉLULA PREENCHIDA
    function clickHandlerBoard () {

        return (e) => {

            const cell = e.target;

            if ( cell.textContent ===  "") {

                cell.textContent = logicRound().getActivePlayer;
                switchPlayerTurn()
            }
        }

    }
    return {init};
}

// INSTANCIA A FACTORY FUNCTION
const gameController = createGameController();
document.addEventListener("DOMContentLoaded", gameController.init());


*/
