// to get mouse position based on canvas hence with offset
// added scaleY and scaleY due to canvas not being 1:1 bitmap 
// --> size has been multiplied with dpi

function getMousePos(canvas,event){
    var rect = canvas.getBoundingClientRect();
    scaleX = canvas.width / rect.width;
    scaleY = canvas.height / rect.height;
    return {
        x: parseInt(event.clientX-rect.left) * scaleX,
        y: parseInt(event.clientY-rect.top) * scaleY
    };
}

function storage (){
    if (window.localStorage){
        return {

            setItem: (key, value) => {
                window.localStorage.setItem(key, value);
            },
            getItem: (key) => {
                return window.localStorage.getItem(key)
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
        }
    }else{
        alert("save game not possible due to browser version")
    }
}

// change color on canvas click;

function canvasButtonIsClicked(item, event){
    var pos = getMousePos(simon.myCanvas, event);

    if(simon.ctx.isPointInPath(item.path, pos.x, pos.y)){
        item.clicked = true;
        item.setColor();
        return item.kind;
    }else{

        return false
    }

}

// iterate simon.buttonsArr every 400 ms to change color programmatically


var index = 0;
// given an array of canvas button paths will highlight them and set the color back to its default

function showHighlightedButtons(arr, speed){
    var next = arr[index];
    if(index < arr.length){
        
        next.clicked = true;
        next.setColor();

    }else{
        index = 0;
        return
    }
    index++
    setTimeout(()=>showHighlightedButtons(arr, speed), speed+index);
} 



// game basic logic
function updateSavedGame(count, player){

    if(player.name == ""){
        player.name = "Player "+simon.currentSavedGames.length
    }
    date = new Date;
    dd = date.getDate();
    mm = date.getMonth()+1;
    hr = date.getHours();
    min = date.getMinutes();

    if(dd<10){dd="0"+dd};
    if(mm<10){mm="0"+mm};
    currentDate = dd+"/"+mm+" "+hr+":"+min

    player.lastRecordedGame = currentDate;
    player.count = count;
    player.currentLevel = simon.currentLevel;
    player.simonLevel = simon.level;
    
    player.score = (simon.currentLevel*10) + count - (player.numberOfGames*2);
     
    simon.currentSavedGames[player.id]=player;
    console.log("updating "+simon.currentSavedGames[player.id].name+" id: "+simon.currentSavedGames[player.id].id);
    storage().setItem(0,JSON.stringify(simon.currentSavedGames));
    
}

function getRandomButton() {
    return Math.floor((Math.random()*3)+1);
    
}
// simon will choose 1 random color and push it to simon.level
// will turn on those buttons
// then based on how many times runs will update progress bar up to 5 times 
// eventually add 1 level and start player turn  

function simonTurn (player){
    let buttons = simon.buttonBaseArr;
    index=0;
 
    k= getRandomButton();
    simon.level.push(buttons[k]);
    console.log("loaded and in simon turn: "+simon.level)
    showHighlightedButtons(simon.level, simon.speed)
    
    if(simon.player.currentLevel<=20){
        
        let percentage = player.count*20;
        
        if(player.count < 5){
            updateProgressBar(percentage); 
        }else{
            percentage = 0;
            simon.player.currentLevel++ 
            updateProgressBar(percentage);
            $("#lvl").text(simon.player.currentLevel)
            player.count = 0;
        }
        playerChoice(player);
        player.count++
    }else{
        setTimeout(() => {
            alert("You Win!") 
        }, simon.speed); 
    }
}


// ??
function playerChosenButton(move, player){
        simon.isSimonTurn = false;
        simon.isPlayerTurn = true;
        
        $("canvas").unbind("click").click(function(){
            if(canvasButtonIsClicked(simon.smallCircle,event)){ 
                simon.smallCircle.draw();
                simon.canvasText("green");
                return
            }
            else{
                for(k=0; k<simon.buttonBaseArr.length;k++){
                    let item = simon.buttonBaseArr[k];
                    move=canvasButtonIsClicked(item,event);
                    
                    if (move){
                        simon.playerCoiches.push(move);
                        
                            if(simon.playerCoiches.length>0){
                                checkchoice(choice,simon.playerCoiches,player, player.count);
                                return
                            }
                        }
                    }
                }
        })
        
        let choice = setInterval(()=>{
            playerChosenButton(move)
        }, 2000)
        
        clearInterval(choice);
      
}

function checkchoice(choice, playerChoices,player,count){
    clearInterval(choice)
    let simonChoices= simon.level.map((item)=>item.kind);
    
    for(i=0; i<playerChoices.length; i++){
    
        if(playerChoices[i] == simonChoices[i] 
            && i==playerChoices.length-1 
            && i == simonChoices.length-1){
            
            simon.playerCoiches = [];
            updateSavedGame(count, player);
            setTimeout(() => {
                simonTurn(player);
            }, simon.speed);    
        }
        else if(playerChoices[i] == simonChoices[i] 
             && i==playerChoices.length-1 && i < simonChoices.length-1){
           
            
            playerChoice(player);
        }
        else if(playerChoices[i] != simonChoices[i] && playerChoices.length>0){
           
            simon.isSimonTurn = false;
            simon.isPlayerTurn = false;
            simon.playerCoiches = [];
            
            setTimeout(() => {
                alert("Game Over");
                updateSavedGame(count, player);
                resetQuitandScoreboardButton();
                updateProgressBar(100);
                simon.level = [];
                $("#canvas").unbind("click").click(function(){
                    if(canvasButtonIsClicked(simon.smallCircle,event)){ 
                        simon.smallCircle.draw();
                        simon.canvasText("green");
                        $("#game-paused").modal("show");
                    }
                }) 
            }, simon.speed); 
            return
        }
    }
  
}

function playerChoice(player){   
        let playerMove;
        playerChosenButton(playerMove, player);

         
}

function updateProgressBar(percentage){
    
    $("#next-lvl-bar").attr("aria-valuenow", percentage+" ").attr("style", "width:"+percentage+"%")
    $("#next-lvl-bar span").text(percentage + "% Complete")
}

function simonGame(player){

    clearTimeout(simon.game);
    $("#quit-game").unbind("click").click(()=>{});
    $("#scoreboard").unbind("click").click(()=>{});
    simon.game=setTimeout(()=>{

        setTimeout(()=>{
            simonTurn(player);
            resetPlayer(simon.player);
        },simon.speed)
        
    },simon.speed+5) 
    simon.isSimonTurn = false;
    simon.isPlayerTurn = false;
}
// scoreboard and load game

function resetQuitandScoreboardButton(){
    
    $("#quit-game").click(function() {

        resetPlayer(simon.player);
        simon.level = [];
        updateProgressBar(100);
        $(".canvas-cell").fadeIn();

        $("#game-wrap").fadeOut(200);
       
        $("#main-page").slideDown(200);
    })

    $("#scoreboard").click(function(){
        if(!$("#scoreboard-cell").is(":visible")){
            $(".canvas-cell").hide();

            $("#footer-progress-bar").hide();
            
            getGamesStat("#scoreboard-table")
            
            $("#scoreboard-cell").show();
        
        }else{
            $("#scoreboard").unbind("click").click(()=>{});
        }
    })
}
function resetPlayer(player){
    player.count = 0;
    player.score = 0;
    player.currentLevel = 0;
    player.simonLevel = [];
    player.numberOfGames = 0;
}

function getGamesStat(selectedTable){
    simon.currentSavedGames = JSON.parse(storage().getItem("0"));

    $(selectedTable+" thead").empty();
    $(selectedTable+" tbody").empty();
    
    $("#scoreboard-table thead")
        .append("<tr><th class='text-center' colspan=3><a href:'#' id='back-to-canvas'>Back to game</a></th></tr>")
    
    if(simon.currentSavedGames != null && simon.currentSavedGames != undefined && simon.currentSavedGames.length>0){
        $(selectedTable+" thead")
        .append("<tr><th class='text-center'><p>Name</p></th><th class='text-center'><p>Score</p></th><th class='text-center'><p>Last save</p></th></tr>");



        if(simon.currentSavedGames.length>1 && selectedTable == "#scoreboard"){
            simon.currentSavedGames.sort(function(a, b){
                return b.score-a.score
            });
        }else{
            simon.currentSavedGames.sort(function(a, b){
                return b.lastRecordedGame-a.lastRecordedGame
            }); 
        }

        for(i=0; i<simon.currentSavedGames.length; i++){
            let player = simon.currentSavedGames[i]
            console.log(simon.currentSavedGames[i])
            $(selectedTable+" tbody")
                .append("<tr id="+player.id
                +"><td class='text-center'><p>"+player.name
                +"</p></td><td class='text-center'><p>"+player.score+"</p></td>"
                +"</td><td class='text-center'><p>"+player.lastRecordedGame+"</p></td><tr>")
        }
    }else{
    $(selectedTable+" tbody").append("<tr><td class='text-center'> No saved games! </td></tr>")
    }
    
}