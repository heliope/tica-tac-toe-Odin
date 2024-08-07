// JOGO - CRIA JOGADORES E MARCAS

// FACTORY FUNCTION
function createGameController() {

    // VARIAVEIS JOGADORES E MARCAS
    let player1Name = "";
    let player2Name = "";
    let player1Mark = "";
    let player2Mark = "";


    // VALIDAÇÃO DO NOME DOS JOGADORES
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

        // INSTANCIACAO DAS CLOSURES
        markPlayer1.addEventListener("change", updateMarks);
        markPlayer2.addEventListener("change", updateMarks);

        return {markPlayer1, markPlayer2, updateMarks};
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

    // CRIACAO DO TABULEIRO
    function createGameboard() {

        // DIMENSÕES DO TABULEIRO
        const cels = 9;
        const board = [];

        // CONSTRUÇÃO DO TABULEIRO
        for (let i = 0; i < cels; i++) {

            board[i] = [];
        }

        // CLOSURE -RETORNA VARIAVEL BOARD
        const getGameBoard = () => board

        // RETORNA UM OBJETO
        return {getGameBoard};
    }

    // INCIA O JOGO
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

            console.log(player1Checker.getName());

            // ATRIBUIÇÃO DAS MARCAS AO JOGADORES
            player1Mark = document.getElementById("markPlayer1").value;
            player2Mark = document.getElementById("markPlayer2").value;

            //REMOVER OS EVENTLISTENER DA VALIDAÇÃO DO NOME
            player1Checker.deleteEventListener();
            player2Checker.deleteEventListener();

            //REMOVER OS EVENTLISTENER DA VALIDAÇÃO DAS MARCAS
            selectMarksPlayer.markPlayer1.removeEventListener("change", selectMarksPlayer.updateMarks);
            selectMarksPlayer.markPlayer2.removeEventListener("change", selectMarksPlayer.updateMarks);
           
            startGame( player1Name, player2Name, player1Mark, player2Mark );
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
    }

    return {init};
}

// INSTANCIA A FACTORY FUNCTION
const gameController = createGameController();
document.addEventListener("DOMContentLoaded", gameController.init());



