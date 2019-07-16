# Simon Game Web version

Simon Game web version is a one page application containing a brief explanaition of the game, its history and the game itself

Entirely developed in HTML5 Canvas, the game is not made by using multiple images 

but rather every canvas "piece" is a path encoded in the project by using Canvas API

The game itself it is the one from the 80s, sounds included and a scoreboard has been added to allow the player

1) to keep track of his game
2) to beat himself :)

Simon Game web version has 20 levels.

Every time the player will repeat "Simon combination" a bar underneath the game will be partially filled 
once reached the 5th combination the current level will end.

Simon Game web version has currently 20 levels to be played. 

Every time Player repeats a "combination" current game will be saved

It is possible to load an existing game 

the "score" is based on how many "Simon combination" 
User can repeat plus a bonus every level reached minus the times player will load the same game

 ----------------------------------
## UX
 
This website is a game application, Players will be able to store their games and come back later to play again

### user stories

As a Simon player, I want to review the game discalimer.
I want then click on rules and review the game rules.
as a player I want to click on game and open the game page which will launch an intro with sounds
I want to be able to check the current scoreboard and return to home if needed.
I want to click on start at the center of simon game and insert a name or load a previous game
I want to click on Simon's buttons and be aware if i fail or get it right.
at the end of the game I want to be scored based on my performance 

### website mockup
website mockup png are available in the mockup folder of this repository

## Features

This website is a one page application, 

Feature 1, Simon Game has been developed using HTML5 canvas

Feature 2, player will be advised if an "intro" is being played by Simon interface

Feature 3, player can set up their name 

Feature 4, player can load previous games 

Feature 5, player can see a bar that will be filled every time they get all simon choiches correctly

Feature 6, every 5 "correct combination" player will see game level going up

Feature 7, Player name will be displayed at the center of Simon game interface while playing

Feature 8, player will know if they lose or win via alerts on the page

### Existing Features

- Feature 1 - every single part of Simon game is an object with his own path, this garantees that user clicks will always be                    tracked correclty by the app, using Canvas api.
- Feature 2 - does not allow Users to click on other features/buttons/links while intro is playing.
              User will see "intro" in red at the cednter of Simon's game interface  
- Feature 3 - By clicking start at the center of Simon's game onterface, this will show a modal and user can choose if create a                 new game or load one
              Create a new game via filling the new game input, maximum ten charachters
- Feature 4 - User can load a game from the new game modal by selecting "load game" button, it will display all games currently                 saved on the same machine. User can click on one of these to get their game loaded and start from where they left
- Feature 5 - While playing user can see a bar at the base of the game page that will be filled every time he gets Simon's moves                correctly, at 100% will be reset to 0.
- Feature 6 - every time the bar is completely filled game level will increse of 1, every time it happens player will get a bonus               at their score.
- Feature 7 - player name will always be shown at the center of Simon's game interface, whereas if player name is not selected it               will be shown as "Player" plus a number that depends on how many game where saved before: if game has been played                 by someone who chose a name and the second player won't chose a name they will get "Player 2" as a name
- Feature 8 - an alert will let player know if the move is wrong or if they have won

Additional feature may be implemented in the future as follows:
 
- Canvas background changing based on level, success or fail
- when player is created will store his games in his own "state" and show saved games only they can access - this will ensure       that two players on same webpage won't play same games.
- clicking on Simon Game during a game will show a "game paused" modal 


### Features Left to Implement
- Game to work on Edge and Edge "Chromium" 
- android native Mobile integration
- Help page will be a form eventually sent to developer via email
- clicking on feedback "faces" will send the response to "server" - in the form of: I.E.: 200 happy, 30 not happy not sad, 10 sad

## Technologies Used


- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.
- [Bootstrap 3.3.7](https://getbootstrap.com/docs/3.3/getting-started/)
    - The project uses **Bootstrap** to simplify CSS3 usage.
- [Jasmine 3.4.0](https://jasmine.github.io/pages/docs_home.html)
    - The project uses Jasmine to test Javascript where possible.

## Testing

- HTML tested with [W3 validator](https://validator.w3.org)
- CSS tested with 
    1 error: scrollbar-width: thin/none doesn't exist, this is an experimental feature currently working and documented as correct though by [Mozilla developer website](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width)
- Javascript tested with [Jasmine 3.4.0](https://jasmine.github.io/pages/docs_home.html)

specifically with Jasmine: 
1) tested the canvas class with a mock and tested its methods were possible
2) tested Canvas create function by mocking its functionalities
3) tested local storage CRUD
4) tested function that highlights buttons when an array of buttons is passed to it

For every case tested, if necessary, its "timeout" has been tested as well considering a different result after the set delay
All Jasmine tests run in [simon-gameSpec.html](https://salvatorefiengo.github.io/simon-game/assets/tests/simon-gameSpec.html)


-------------------------------------------------------------------------------------------------------

manually tested game: 

- I a had several users testing the game functionality;
- Testing "new game" fixed a bug in which player name was bigger than Simon's interface space in which is displayed
- Testing on Edge is not possible due to Edge limitation with Local storage  

Tested save load functionality:
1. save/load game:
    1. clcked on canvas (start);
    2. submit an empty new game will start game with player name "player" plus an identifier number
    3. not possible to fill the input with more than 10 carachters 
    4. Player name will show in scoreboard
    5. next game: loaded previous game, scoreboard updated correctly
    6. if no game has been played yet, scoreboard and load game will show a "no saved game" warning


---
Simon game website looks and works the same on all screen browser, 

Canvas will be drawn smaller if screen height is bigger than width so to provide a better result on mobile

On Rotated screens for smaller devices user may not have the progress bar visible unless they scroll. not yet addressed

bug fixed: modal contained a for with method "get", only the first time page is loaded and when submitted with play button

page will reload as soon as code will read settimeout. I could not find much on the web about this behaviour

fix: remove method from "form" selector

## Deployment

All game files are hosted on GitHub "Simon-game" repository
This website has been developed using Visual Studio Code 
Several branches have been created, merged and once manually/jasmin tested deleted:
- Landing page
- Canvas
- Jasmine-test
- LocalStorage
- Canvas__events_and_intro
- Simon_game_basic_logic
- Scoreboard


## Credits
Thanks to my friend Andrew Grime for providing me with the sounds

### Content
- The text for section Y was copied from the [Wikipedia article on Simon Game](https://en.wikipedia.org/wiki/Simon_(game));
- Sounds were provided by a very good friend of mine: Andrew Grime and are not associated with any copyrights;

### Media
- The photos used in this site were obtained from [flicker](https://www.flickr.com/photos/toywhirl/8050771631/in/photostream/)


