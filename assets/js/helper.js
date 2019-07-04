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
                window.localStorage.getItem(key);
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

function getRandomButton() {
    return Math.floor((Math.random()*3)+1);
    
}
// simon will choose 1 random color and push it to simon.level  
let count = 0
function simonTurn (){

    let buttons = simon.buttonBaseArr;
    index=0;
 
    k= getRandomButton();
    simon.level.push(buttons[k]);

    showHighlightedButtons(simon.level, simon.speed)

    if(count<=20){
        
        let percentage = count*20;
        console.log("percentage " +percentage)
        if(count < 5){
            updateProgressBar(percentage); 
        }else{
            percentage = 0;
            simon.currentLevel++ 
            updateProgressBar(percentage);
            $("#lvl").text(simon.currentLevel)
        }
        playerChoice();
        count++
    }
}

// check if the pressed canvas path (simon button) is defined
// if it is push it to playerChoices array
function playerChosenButton(move){
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
                    console.log(move)
                    if (move){
                        simon.playerCoiches.push(move);
                        console.log(simon.playerCoiches)
                            if(simon.playerCoiches.length>0){
                                checkchoice(choice,simon.playerCoiches);
                                return
                            }
                        }
                    }
                }
        })
        
        let choice = setInterval(()=>playerChosenButton(move), 2000)
        console.log("dopo "+simon.playerCoiches)
        clearInterval(choice);
      
}

function checkchoice(choice, playerChoices){
    clearInterval(choice)
    let simonChoices= simon.level.map((item)=>item.kind);

    console.log("playerChoices "+playerChoices+" length "+playerChoices.length)
    playerChoices.length;
    
    for(i=0; i<playerChoices.length; i++){
    
        if(playerChoices[i] == simonChoices[i] 
            && i==playerChoices.length-1 
            && i == simonChoices.length-1){
            
            simon.playerCoiches = [];
            setTimeout(() => {
                simonTurn();
            }, simon.speed);    
        }
        else if(playerChoices[i] == simonChoices[i] 
             && i==playerChoices.length-1 && i < simonChoices.length-1){
            console.log("continue")
            
            playerChoice();
        }
        else if(playerChoices[i] != simonChoices[i] && playerChoices.length>0){
            console.log("player exit"+playerChoices+" length "+playerChoices.length)
            console.log("simon "+simonChoices)
            simon.isSimonTurn = false;
            simon.isPlayerTurn = false;
            simon.playerCoiches = [];
            
            setTimeout(() => {
                console.log("nooooooooo!") 
            }, 1); 
            return
        }
    }
  
}

function playerChoice(){   
        let playerMove;
        playerChosenButton(playerMove);

         
}

function updateProgressBar(percentage){
    console.log("percentage " +percentage)
    $("#next-lvl-bar").attr("aria-valuenow", percentage+" ").attr("style", "width:"+percentage+"%")
    $("#next-lvl-bar span").text(percentage + "% Complete")
}

function simonGame (){
    simon.isSimonTurn = false;
    simon.isPlayerTurn = false;
    simon.level = [];
    simonTurn();
    console.log("out " )
     
}