// to get mouse position based on canvas hence with offset
// added scaleY and scaleY due to canvas not being 1:1 bitmap 


function getMousePos(canvas,event){
    var rect = canvas.getBoundingClientRect();
    scaleX = canvas.width / rect.width;
    scaleY = canvas.height / rect.height;
    return {
        x: parseInt(event.clientX-rect.left) * scaleX,
        y: parseInt(event.clientY-rect.top) * scaleY
    };
}

//Local storage CRUD
//known issues in Edge/IE as it access "local" and not from server

function storage (){
    if (window.localStorage && typeof(window.localStorage) != undefined){
        return {

            setItem: (key, value) => {
                window.localStorage.setItem(key, value);
            },
            getItem: (key) => {
                return window.localStorage.getItem(key);
            },
            removeItem: (key) => {
                window.localStorage.removeItem(key);
            },
            clear: () => {
                window.localStorage.clear();
            },
            getLenght: () => {
                return window.localStorage.length;
            }
        };
    }else{
        alert("save game not possible due to browser version");
    }
}

// check if element is clicked and returns its "kind" of type string

function canvasElementIsClicked(item, event){
    var pos = getMousePos(simon.myCanvas, event);

    if(simon.ctx.isPointInPath(item.path, pos.x, pos.y)){
        item.clicked = true;
        item.setColor();
        return item.kind;
    }else{

        return false;
    }

}


var index = 0;
// given an array of canvas button paths will highlight them and set the color back to its default

function showHighlightedButtons(arr, speed){
    var next = arr[index];
    if(index < arr.length){
        
        next.clicked = true;
        next.setColor();

    }else{
        index = 0;
        return;
    }
    index++;
    setTimeout(()=>showHighlightedButtons(arr, speed), speed+index);
} 



// game basic logic

//get current saved games from Storage
//set new Player with id = array in storage lenght
//push new Player to array

function getNewPlayer(){
    simon.currentSavedGames=JSON.parse(storage().getItem("0")); 

    $("#lvl").text(simon.player.currentLevel); 

    simon.player.name = $("#name:text").val();

    if(simon.player.name == ""){

        if(simon.currentSavedGames == null){
            simon.player.name = "Player 0";
        }else{
        simon.player.name = "Player "+simon.currentSavedGames.length;
        }

    }else if(simon.currentSavedGames !== null){

        let count=0;
        playerName = simon.player.name.split(" ");

        simon.currentSavedGames.forEach((item)=>{
            selected = item.name.split(" ");

            if(item.name.toLowerCase() == simon.player.name.toLowerCase() || selected[0].toLowerCase() == playerName[0].toLowerCase()){
                count+=1;
            } 

        });

        simon.player.name = simon.player.name+" ("+count+")";
    }   

    if(simon.currentSavedGames == null ){simon.currentSavedGames = [];}

    simon.player.id = simon.currentSavedGames.length;
    simon.currentSavedGames.push(simon.player);
}

//Load player from Storage by clicking on a table in the "load game modal"
function loadPlayer(){
    $("#saved-games tbody tr").click(function(){

        let id=$(this).attr("id");
                
        let simonSavedMoves=[];

        //updating game variables with item got from storage
        simon.player.id = simon.currentSavedGames[id].id;
        simon.player.name = simon.currentSavedGames[id].name;
        simon.player.count = simon.currentSavedGames[id].count;
        simon.player.score = simon.currentSavedGames[id].score;
        simon.player.currentLevel = simon.currentSavedGames[id].currentLevel;
        simon.player.numberOfGames++;

        //clone array if game "simon moves" are less in lenght of loaded "Simon moves"
        //then for each button in game "simon moves" cloned array push object button into game "simon moves" array
        //once got saved game from storage objects will not be able to call methods due to JSON.stringify/parse

        if(simon.level.length < simon.currentSavedGames[id].simonLevel.length){

            simonSavedMoves=[...simon.currentSavedGames[id].simonLevel];

            simonSavedMoves.forEach((button)=>{
                for(i=0; i<simon.buttonBaseArr.length; i++){

                    if(button.kind == simon.buttonBaseArr[i].kind){
                        simon.level.push(simon.buttonBaseArr[i]);
                    }
                }
            });
        }

        //setting game level to loaded player level

        $("#lvl").text(simon.player.currentLevel);
        $("#game-paused").modal("hide");

        // starting game
        simonGame(simon.player);
    });
}

//Updates Player stat every game cycle and if quit

function updateSavedGame(count, player){

    date = new Date();
    dd = date.getDate();
    mm = date.getMonth()+1;
    hr = date.getHours();
    min = date.getMinutes();

    if(dd<10){dd="0"+dd;}
    if(mm<10){mm="0"+mm;}
    currentDate = dd+"/"+mm+" "+hr+":"+min;

    // get timestamp, updating counter, current level and "simon moves"
    player.lastRecordedGame = currentDate;
    player.count = count;
    player.currentLevel = simon.player.currentLevel;
    player.simonLevel = simon.level;
    
    //updating score based on current level "count" and number of times player reloads game

    player.score = (player.currentLevel*10) + player.count - (player.numberOfGames*2);
     
    simon.currentSavedGames[player.id]=player;

    storage().setItem(0,JSON.stringify(simon.currentSavedGames));
    
}

function getRandomButton() {
    return Math.floor((Math.random()*4));
    
}

// during simon turn all table buttons are disabled
// simon will choose 1 random color and push it to simon.level
// will turn on those buttons
// then based on how many times runs will update progress bar up to 5 times 
// eventually add 1 level and start player turn 
// at lvl 20 Player wins 

function simonTurn (player){
    $("#scoreboard").unbind("click").click(()=>{

        $("#scoreboard").text("Disabled while playing").addClass("red");
            setTimeout(() => {
            $("#scoreboard").removeClass("red").text("Scoreboard");
        }, 500);
    });
    
    if(!simon.isPlayerTurn){
        simon.isPlayerTurn = true;
        }

    let buttons = simon.buttonBaseArr;
    index=0;
 
    k= getRandomButton();
    simon.level.push(buttons[k]);

    showHighlightedButtons(simon.level, simon.speed);
    
    if(simon.player.currentLevel<=20){
        
        let percentage = player.count*20;
        
        if(player.count <= 5){
            updateProgressBar(percentage); 
        }else{
            percentage = 0;
            simon.player.currentLevel++; 
            updateProgressBar(percentage);
            $("#lvl").text(simon.player.currentLevel);
            player.count = 0;
        }
        playerChoice(player);
        player.count++;
    }else{
        setTimeout(() => {
            alert("You Win!"); 
        }, simon.speed); 
    }
}


// playerChoiche/playerChosenbutton: when Player clicks the start button gets "Your Move" warning
// if Player clicks a button this will be pushed in player moves array and checked
// function will run every 2 secs until check clear it

function playerChoice(player){   
    let playerMove;
    playerChosenButton(playerMove, player);     
}

function playerChosenButton(move, player){

        $("canvas").unbind("click").click(function(){
            if(canvasElementIsClicked(simon.smallCircle,event)){ 
                simon.smallCircle.draw();
                simon.canvasText("Yellow", "Your move");
                return;
            }
            else{
                for(k=0; k<simon.buttonBaseArr.length;k++){
                    let item = simon.buttonBaseArr[k];
                    move=canvasElementIsClicked(item,event);
                    
                    if (move){
                        simon.playerCoiches.push(move);
                        
                            if(simon.playerCoiches.length>0){
                                checkchoice(choice,simon.playerCoiches,player);
                                return;
                            }
                        }
                    }
                }
        });
        
        let choice = setInterval(()=>{
            playerChosenButton(move);
        }, 2000);
        
        clearInterval(choice);
      
}

// funciton called in playerChosenButton 
// sets Scoreboard button in case Player wants to review the scores
// clears the interval: choice from playerChosenButton just in case
// if player moves are same number of Simon's is simon turn
// if are less is player turn
// if move is wrong game over

function checkchoice(choice, playerChoices,player){

    setScoreboardButton();
    clearInterval(choice);

    let simonChoices= simon.level.map((item)=>item.kind);
    
    for(i=0; i<playerChoices.length; i++){
    
        if(playerChoices[i] == simonChoices[i] && i==playerChoices.length-1 && i == simonChoices.length-1){
            
            simon.playerCoiches = [];
           
            updateSavedGame(player.count, player);
            setTimeout(() => {
                simonTurn(player);
            }, simon.speed);    
        }
        else if(playerChoices[i] == simonChoices[i] && i==playerChoices.length-1 && i < simonChoices.length-1){
            
            playerChoice(player);
        }
        else if(playerChoices[i] != simonChoices[i] && playerChoices.length>0){

            simon.playerCoiches = [];
            
            setTimeout(() => {

                alert("Game Over");
                updateSavedGame(player.count, player);
                setScoreboardButton();
                updateProgressBar(100);

                simon.level = [];

                simon.smallCircle.draw();
                simon.canvasText("green", "Start");

                $("#canvas").unbind("click").click(function(){
                    if(canvasElementIsClicked(simon.smallCircle,event)){ 
                        simon.smallCircle.draw();
                        simon.canvasText("green, Start");
                        $("#game-paused").modal("show");
                    }
                }); 
            }, simon.speed); 

            return;
        }
    }
  
}

// progress bar will be updated in simon turn based on player.count = how many times Player got it right
// every 5 times it resets to 0 and lvl badge increments of 1
function updateProgressBar(percentage){
    
    $("#next-lvl-bar").attr("aria-valuenow", percentage+" ").attr("style", "width:"+percentage+"%");
    $("#next-lvl-bar span").text(percentage + "% Complete");
}

// disables quit and scoreboard "links" before the start of the game
// sets a time out for the game itself and reset player stats with a small delay
function simonGame(player){

    $("#scoreboard").unbind("click").click(()=>{});

    setTimeout(()=>{
        setTimeout(()=>{
            simonTurn(player);
            
        },simon.speed+50);
        
    },simon.speed+100); 
}

function quitGame(){
    simon.currentSavedGames = JSON.parse(storage().getItem("0"));
    if(simon.currentSavedGames !== null){
        updateSavedGame(simon.player.count, simon.player);
    }
    resetPlayer(simon.player);
    simon.level = [];

    simon.smallCircle.draw();
    simon.canvasText("green", "Start");

    updateProgressBar(100);

    $(".canvas-cell").fadeIn();

    $("#game-wrap").fadeOut(200);
   
    $("#main-page").slideDown(200);
}
// reset scoreboard click, as it will be disabled during game

function setScoreboardButton(){

    $("#scoreboard").unbind("click").click(function(){
           
            $(".canvas-cell, #footer-progress-bar").hide();
            
            getGamesStat("#scoreboard-table");

            $("#scoreboard-cell").show();
        
    });
}

function resetPlayer(player){
    player.count = 0;
    player.score = 0;
    player.currentLevel = 0;
    player.simonLevel = [];
    player.numberOfGames = 0;
}

// updates game stat in scoreboard
function getGamesStat(selectedTable){
    simon.currentSavedGames = JSON.parse(storage().getItem("0"));

    $(selectedTable+" thead,"+selectedTable+" tbody").empty();
    
    if(selectedTable == "#scoreboard-table"){
        $("#back-to-canvas").show();
        $("#quit-game").hide();
    }

    if(simon.currentSavedGames != null && simon.currentSavedGames != undefined && simon.currentSavedGames.length>0){
        
        $(selectedTable+" thead")
        .append("<tr><th class='text-center'><p>Name</p></th><th class='text-center'><p>Score</p></th><th class='text-center'><p>Last save</p></th><th class='text-center'><p id='del-all' class='pointer'>Delete All</p></th></tr>");



        if(simon.currentSavedGames.length>1){
            simon.currentSavedGames.sort(function(a, b){
                return b.score-a.score;
            });
        }else{
            simon.currentSavedGames.sort(function(a, b){
                return b.lastRecordedGame-a.lastRecordedGame;
            }); 
        }

        for(i=0; i<simon.currentSavedGames.length; i++){
            let player = simon.currentSavedGames[i];
            
            $(selectedTable+" tbody")
                .append("<tr class='pointer' id="+player.id+
                "><td class='text-center'><p>"+player.name+
                "</p></td><td class='text-center'><p>"+player.score+"</p></td>"+
                "</td><td class='text-center'><p>"+player.lastRecordedGame+
                "</p></td></td><td><i id="+player.id+" class='fa fa-trash-o'></i></td><tr>");
        }

        $(selectedTable+" tbody tr td i").on('click',function(){
            simon.currentSavedGames = JSON.parse(storage().getItem("0"));
            let id=$(this).attr("id");
            let selected = simon.currentSavedGames.indexOf(simon.currentSavedGames[id]);
            
            simon.currentSavedGames.splice(selected, 1);
           
            storage().setItem(0,JSON.stringify(simon.currentSavedGames));
            getGamesStat(selectedTable);
        });

        $("#del-all").on('click', function(){
            storage().clear();
            getGamesStat(selectedTable);
        });

    }else{
        $(selectedTable+" tbody").append("<tr><td class='red text-center'> No saved games! </td></tr>");
    }
    
}