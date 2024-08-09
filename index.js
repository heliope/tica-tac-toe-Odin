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
    const placeMark = ( row, column, mark) => {

        // VERIFICA SE ESTÁ DISPONIVEL
        if ( board[row][column].getMark() === "") {

            if ( mark === "circle") {

                board[row][column].addMark("O");
            }

            else {

                board[row][column].addMark("X");
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
            mark: player1Mark,
        },
        {
            name: player2Name,
            mark: player2Mark,
        }
    ]

    const getPlayers = () => players

    let activePlayer = players[0].name;   
    let activePlayerMark  = players[0].mark;

    const switchPlayerTurn = () => {

        if ( activePlayer === players[0].name) {

            activePlayer = players[1].name;
            activePlayerMark = players[1].mark;
        }

        else {
            activePlayer = players[0].name;
            activePlayerMark = players[0].mark;

        }
    }

    const getActivePlayer = () => activePlayer;
    const getActivePlayerMark = () => activePlayerMark;

    const playRound = (column, row) => {

        board.placeMark(column, row, getActivePlayerMark());

    }


    return {getActivePlayer, getActivePlayerMark, playRound, getGameBoard: board.getGameBoard, getPlayers, switchPlayerTurn};

}

function ScreenController() {

    // INSTANCIAÇÃO DA TABULEIRO
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

    function createClickHandler(updateScreenColorMark) {

        //CLOSURE 
        function clickHandlerBoard(e) {
            
            const selectCelColumn = e.target.dataset.column;
            const selectCelRow = e.target.dataset.row;
        
                if (!selectCelColumn || !selectCelRow) return;
        
                const selectCelColumnValue = parseInt(selectCelColumn);
                const selectCelRowValue = parseInt(selectCelRow);
                
                game.playRound(selectCelRowValue,selectCelColumnValue);
    
                updateScreenColorMark(selectCelRowValue, selectCelColumnValue);
        }
    
        return clickHandlerBoard
    }

    function createUpdateScreenColorMark() {

        const playerColors = {
            
            player1: "#121f31",
            player2: "#154e94"
        }
    
        function updateScreenColorMark(row, column) {
    
            const activePlayer = game.getActivePlayer();
            const players = game.getPlayers();
            const buttonSelect = document.querySelector(`[data-row='${row}'][data-column='${column}']`);
            const board = game.getGameBoard();

            if (buttonSelect.textContent !== "") {

                buttonSelect.textContent = board[row][column].getMark();
                return
            }

            else  if (activePlayer === players[0].name) {

                color = playerColors.player1;
            }

            else {

                color = playerColors.player2;
            }

            if (buttonSelect) {

                buttonSelect.style.color = color;
                buttonSelect.textContent = board[row][column].getMark();
                game.switchPlayerTurn();
            }
        }

        return updateScreenColorMark;
    }

    gameboard.addEventListener("click", createClickHandler(createUpdateScreenColorMark()));

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

