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
        const buttonEnter = document.getElementById(buttonEnterId);
        
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

            // CHAMA A FUNÇÃO DE DESBLOQUEAR O BOTÃOD E ENTRAR
            checkButton(buttonEnter)
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
    }

    // DESBLOQUEIA O BOTÃO DE ENTRADA
    function checkButton( buttonEnter) {

        const regexMessagePlayer1 = document.getElementById("regexMessagePlayer1");
        const regexMessagePlayer2 = document.getElementById("regexMessagePlayer2"); 

        //  CLOSURE - LÓGICA DE VALIDAÇÃO
        const validateButton = () => {

            if( regexMessagePlayer1.classList.contains("errorMessageCorrect") && regexMessagePlayer2.classList.contains("errorMessageCorrect")) {

                buttonEnter.removeAttribute("disabled");
                buttonEnter.classList.remove("none");
                buttonEnter.classList.add("enter");
            }

            else {

                buttonEnter.setAttribute("disabled", false);
                buttonEnter.classList.remove("enter");
                buttonEnter.classList.add("none");
            }
        }
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

        //  INSTANCIA O CLOSURE
        const selectMarksPlayer = selectPlayerMarks("markPlayer1", "markPlayer2");

        // AÇÃO AO CLICAR NO BOTÃO DE ENTRAR
        buttonEnter.addEventListener("click", () => {

            // ATRIBUIÇÃO DE NOMES AOS JOGADORES
            player1Name = player1Checker.getName();
            player2Name = player2Checker.getName();

            // ATRIBUIÇÃO DAS MARCAS AO JOGADORES
            selectMarksPlayer.updateMarks().value

            //REMOVER OS EVENTLISTENER DA VALIDAÇÃO DO NOME
            player1Checker.deleteEventListener();
            player2Checker.deleteEventListener();

            //REMOVER OS EVENTLISTENER DA VALIDAÇÃO DAS MARCAS
            removeEventListener()
           
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

        // RENDERIZA A INFORMAÇÃO NO HTML DO NOME DOS PLAYERS
        playerName1.textContent = playerName1;
        playerName2.textContent = playerName2;

        // MOSTRA TABULEIRO, LEADERBOARD E BUTTONS
        board.classList.remove("none");
        leaderboard.classList.remove("none");
        buttons.classList.remove("none");
        formWelcome.classList.remove("none");
    }

    return {init};
}

// INSTANCIA A FACTORY FUNCTION
const gameController = createGameController();
document.addEventListener("DOMContentLoaded", gameController.init());



