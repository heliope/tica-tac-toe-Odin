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
    let player1Pontuation = document.getElementById("resultPlayer1");
    let player2Pontuation = document.getElementById("resultPlayer2");

    const board = Gameboard();

    const players = [
        {
            name: player1Name,
            mark: player1Mark,
            pontuation: player1Pontuation
        },
        {
            name: player2Name,
            mark: player2Mark,
            pontuation: player2Pontuation
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

        const gameStatus = CheckGameStatus(getActivePlayer(), getActivePlayerMark())(board.getGameBoard());
        const buttonsGameBoard = document.querySelectorAll(".cel");
        let player1Pontuation = document.getElementById("resultPlayer1");
        let player2Pontuation = document.getElementById("resultPlayer2");
        

        if ( gameStatus.status === "win") {

            console.log(`${gameStatus.player} wins!`);
            buttonsGameBoard.forEach(button => button.classList.add("buttons-disabled"));
            const players = GameController().getPlayers();

            console.log(players[0].name);

            if ( gameStatus.player === players[0].name) {

                players[0].pontuation = parseInt(players[0].pontuation.textContent) +1 ;

                player1Pontuation.textContent = players[0].pontuation
            }

            else if ( gameStatus.player === players[1].name) {

                players[1].pontuation = parseInt(players[1].pontuation.textContent) +1 ;

                player2Pontuation.textContent = players[1].pontuation
            }
        }

        if ( gameStatus.status === "tie") {

            console.log("tie!");
            return; 
        }
    }
    return {getActivePlayer, getActivePlayerMark, playRound, getGameBoard: board.getGameBoard, getPlayers, switchPlayerTurn};
}

function CheckGameStatus(activePlayer, activePlayerMark) {

    return function(board) {

        // CheckWinner para verificar se existe próxima ronda ou não    
        const winner = checkWinner(board);

        let markSymbol = '';

        if (winner) {

            if ( activePlayerMark === "circle") {

                markSymbol= 'O';
            }

            else {

                markSymbol = 'X';
            }

            return {status: "win", player: activePlayer, mark: activePlayerMark};
        }

        if (isBoardFull(board)) {

            console.log("It´s a tie");
            return { status: "tie"};
        }

        return { status: "continue"};
    }
}


function checkWinner(board) {

    const size = board.length;

    for ( let i = 0; i < size; i++ ) {

        // VENCEDOR EM LINHA
        if ( board[i][0] !== "" && board[i][0].getMark() === board[i][1].getMark() && board[i][1].getMark() ===  board[i][2].getMark() ) {

            console.log(board[i][0].getMark());
            return board[i][0].getMark();

        }

        // VENCEDOR EM COLUNA

        if ( board[0][i] !== "" && board[0][i].getMark() === board[1][i].getMark() && board[1][i].getMark() ===  board[2][i].getMark() ) {

            return board[0][i].getMark();;
        }

    }

    // VENCEDOR NA DIAGONAL

    if ( board[0][0].getMark() !== "" &&  board[0][0].getMark() === board[1][1].getMark() && board[1][1].getMark() === board[2][2].getMark()) {

        return board[0][0].getMark();
    }

    
    if ( board[0][2].getMark() !== "" &&  board[0][2].getMark() === board[1][1].getMark() && board[1][1].getMark() === board[2][0].getMark()) {

        return board[0][2]. getMark();
    }

    return null; // SEM VENCEDOR EMPATE
}

function isBoardFull(board) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col].getMark() === '') {
                return false; // Ainda há células vazias, o jogo não está empatado
            }
        }
    }
    return true; // Todas as células estão preenchidas, o jogo está empatado
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


function NewRound() {

    const newRoundButton = document.getElementById("newRoundButton");


        if( newRoundButton) {

            newRoundButton.addEventListener("click", () => {

                const screenController = ScreenController();
                const gameController = GameController();


                const playerActive = gameController.getActivePlayer;
                const playerMark = gameController.getActivePlayerMark;
                const board = Gameboard();


                const gameStatus = CheckGameStatus(playerActive, playerMark, (board.getGameBoard()));

                gameStatus.status ="";

                ScreenController()

                console.log(gameStatus.status="")
            });
        }
    


}

document.addEventListener("DOMContentLoaded", () => {
    StartGame();
    NewRound();
});

