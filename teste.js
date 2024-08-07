function createGameController() {
    let player1Name = '';
    let player2Name = '';
    let player1Mark = '';
    let player2Mark = '';

    function checkPlayerName(inputId, errorMessageId, buttonEnterId) {
        const input = document.getElementById(inputId);
        const errorMessage = document.getElementById(errorMessageId);
        const buttonEnter = document.getElementById(buttonEnterId);
        const regexInput = /^[\p{L}\p{N}]{3,15}$/u;

        const checkName = () => {
            const inputUserRegex = regexInput.test(input.value);

            if (input.value.length < 3 || input.value.length > 15) {
                errorMessage.textContent = "Your name should be between 3 and 15 characters";
                errorMessage.className = "errorMessageIncorrect";
            } else if (!inputUserRegex) {
                errorMessage.textContent = "Incorrect characters! Please try again";
                errorMessage.className = "errorMessageIncorrect";
            } else {
                errorMessage.textContent = "Correct names! Good Luck!";
                errorMessage.className = "errorMessageCorrect";
            }

            checkButtons(buttonEnter);
        };

        function attachEventListener() {
            input.addEventListener("input", checkName);
        }

        function removeEventListener() {
            input.removeEventListener("input", checkName);
        }

        function getName() {
            return input.value;
        }

        return { attachEventListener, removeEventListener, getName };
    }

    function selectMarksPlayer(markPlayer1Id, markPlayer2Id) {
        const markPlayer1 = document.getElementById(markPlayer1Id);
        const markPlayer2 = document.getElementById(markPlayer2Id);

        const updateMarks = () => {
            if (markPlayer1.value === "circle") {
                markPlayer2.value = "cross";
            } else if (markPlayer1.value === "cross") {
                markPlayer2.value = "circle";
            }
        };

        markPlayer1.addEventListener("change", updateMarks);
        markPlayer2.addEventListener("change", updateMarks);

        // AO INICIAR A PÁGINA
        updateMarks()

        const removeListeners = () => {
            
            markPlayer1.removeEventListener("change", updateMarks);
            markPlayer2.removeEventListener("change", updateMarks);
        };

        return { updateMarks, removeListeners};
    }

    function checkButtons(buttonEnter) {
        const regexMessagePlayer1 = document.getElementById("regexMessagePlayer1");
        const regexMessagePlayer2 = document.getElementById("regexMessagePlayer2");

        if (
            regexMessagePlayer1.classList.contains("errorMessageCorrect") &&
            regexMessagePlayer2.classList.contains("errorMessageCorrect")
        ) {
            buttonEnter.removeAttribute("disabled");
            buttonEnter.classList.remove("none");
            buttonEnter.classList.add("enter");
        } else {
            buttonEnter.setAttribute("disabled", "true");
            buttonEnter.classList.remove("enter");
            buttonEnter.classList.add("none");
        }
    }

    function init() {

        const buttonEnter = document.getElementById("enter");
        const player1Checker = checkPlayerName("namePlayer1", "regexMessagePlayer1", "enter");
        const player2Checker = checkPlayerName("namePlayer2", "regexMessagePlayer2", "enter");

        player1Checker.attachEventListener();
        player2Checker.attachEventListener();


        // DESCONSTRUIR UM OBJECTO
        const {updateMarks, removeEventListener} = selectMarksPlayer("markPlayer1", "markPlayer2");

        buttonEnter.addEventListener("click", () => {
            player1Name = player1Checker.getName();
            player2Name = player2Checker.getName();
            player1Mark = document.getElementById("markPlayer1").value;
            player2Mark = document.getElementById("markPlayer2").value;

            startGame( player1Name, player2Name, player1Mark, player2Mark);

            player1Checker.removeEventListener();
            player2Checker.removeEventListener();
            removeEventListener();
        });
    }

    function startGame() {
        const board = document.getElementById("gameBoard");
        const leaderboard = document.getElementById("leaderboard");
        const buttons = document.getElementById("buttons");
        const formWelcome = document.getElementById("formWelcome");
        const playerName1 = document.getElementById("playerName1");
        const playerName2 = document.getElementById("playerName2");

        playerName1.textContent = player1Name;
        playerName2.textContent = player2Name;

        board.classList.remove("none");
        leaderboard.classList.remove("none");
        buttons.classList.remove("none");

        formWelcome.classList.add("none");
    }

    return { init };
}

const gameController = createGameController();
document.addEventListener("DOMContentLoaded", gameController.init);