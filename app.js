const app = {

    // get all DOM elements we'll need
    'home': document.querySelector(".game_home"),
    'startButton': document.querySelector(".game_home_start-btn"),
    'ingame': document.querySelector(".game_ingame"),
    'question': document.querySelector(".game_ingame_question"),
    'playerInput': document.querySelector(".game_ingame_form_player-input"),
    'playerSubmit': document.querySelector(".game_ingame_form_player-submit"),
    'higher': document.querySelector(".game_ingame_higher-msg"),
    'lower': document.querySelector(".game_ingame_lower-msg"),
    'win': document.querySelector(".game_ingame_win-msg"),
    'loose': document.querySelector(".game_ingame_loose-msg"),
    'replay': document.querySelector(".game_ingame_replay-btn"),

    'randomNumber': null,
    'guessCount': 0,

    /**
     * initiates the app
     */
    init: function () {
        
        console.log('init...')

        app.startButton.addEventListener("click", app.startGame);
        app.playerSubmit.addEventListener("click", app.getPlayerGuess);
        app.replay.addEventListener("click", app.startGame);

    },

   /**
    * displays the game view and calls the function that generates a random number
    * @param  e 
    */
    startGame: function (e) {
        app.guessCount = 0;
        app.loose.textContent = "Dommage, tu n'as pas réussi à retrouver mon nombre : ";
        app.playerInput.value = "";

        app.question.classList.remove('none');
        app.playerInput.classList.remove('none');
        app.playerSubmit.classList.remove('none');
        app.ingame.classList.remove('none');
        
        app.win.classList.add('none');
        app.replay.classList.add('none');
        app.loose.classList.add('none');
        app.home.classList.add('none');
        

        app.randomNumber = app.getRandomNumber(100);
    },

    /**
     * @param max  
     * @returns a random number between 0 and 100 included
     */
    getRandomNumber: function (max) {
        return Math.floor(Math.random() * max);
    },

    /**
     * get the player guess and calls the function to compare it to the randomNumber
     */
    getPlayerGuess: function () {
        app.lower.classList.add('none');
        app.higher.classList.add('none');

        let playerGuess = parseInt(app.playerInput.value);
        
        app.checkPlayerGuess(playerGuess);
    },

    /**
     * compares player's guess with the random number
     * @param playerGuess 
     */
    checkPlayerGuess: function (playerGuess) {

        app.guessCount++;
        
        playerGuess === app.randomNumber ? app.winMessage() : "";
        app.guessCount > 10 ? app.looseMessage() : "";
        playerGuess > app.randomNumber ? app.higherMessage() : "";
        playerGuess < app.randomNumber ? app.lowerMessage() : "";
            
        app.playerInput.value = "";
    },

    /**
     * Displays the Win message and add the possibility to replay the game
     */
    winMessage: function () {
        app.lower.classList.add('none');
        app.higher.classList.add('none');

        app.question.classList.add('none');
        app.playerInput.classList.add('none');
        app.playerSubmit.classList.add('none');
        app.win.classList.remove('none');
        app.replay.classList.remove('none');
    },

    /**
     * Displays the Loose message and add the possibility to replay the game
     */
    looseMessage: function () {
        app.lower.classList.add('none');
        app.higher.classList.add('none');
        app.question.classList.add('none');
        app.playerInput.classList.add('none');
        app.playerSubmit.classList.add('none');
        app.replay.classList.remove('none');
        app.loose.classList.remove('none');

        app.loose.textContent += app.randomNumber;
        
    },

    /**
     * Displays a message to help the player 
     */
    higherMessage: function () {
        app.higher.classList.remove('none');
    },

    /**
     * Displays a message to help the player 
     */
    lowerMessage: function () {
        app.lower.classList.remove('none');
    }

}

document.addEventListener('DOMContentLoaded', app.init())