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

function showHighlightedButtons(arr){
    var next = arr[index];
    if(index < arr.length){
        
        next.clicked = true;
        next.setColor();
    }else{
        index = 0;
        return
    }
    index++
    
    setTimeout(()=>showHighlightedButtons(arr), 800);
} 



// game basic logic

function getRandomButton() {
    return Math.floor((Math.random()*3)+1);
    
}
// simon will choose 1 random color and push it to simon.level  
function simonTurn (count){
    console.log("Simon Turn")
    let buttons = simon.buttonBaseArr;
    index=0;
 
    k= getRandomButton();
    simon.level.push(buttons[k]);

    showHighlightedButtons(simon.level)


    if(count<21){
        
        let percentage = count*20;
        console.log("percentage " +percentage)
        updateProgressBar(percentage); 
        simon.playerChoices = [];   
        playerChoice(count);
        
    }
}

// check if the pressed canvas path (simon button) is defined
// if it is push it to playerChoices array
function playerChosenButton(move){
    $("canvas").unbind("click").click(function(){
        simon.buttonBaseArr.forEach((item) => {
            if(canvasButtonIsClicked(item, event)){ 
                move=canvasButtonIsClicked(item, event);
                if(move !=undefined){
                    simon.playerChoices.push(move)
                    console.log(move);
                    return;
                }else{
                    return false
                };
            }
        })
    })
}

function checkchoice(count){
 

        let simonChoices= simon.level.map((item)=>item.kind);

        console.log("playerChoices "+simon.playerChoices+" length "+simon.playerChoices.length)
        let playerLen = simon.playerChoices.length;
        if(simonChoices.length == playerLen){

            for(i=0; i<playerLen; i++){
                
                if(simon.playerChoices[i] == simonChoices[i] && simon.playerChoices[i] == simonChoices[playerLen-1]){
                    console.log("Hurra! playerChoices "+simon.playerChoices)
                    console.log("simon "+simonChoices)
                    count++
                    simonTurn(count);
                    
                    
                }
                else if(simon.playerChoices[i] == simonChoices[i] && simon.playerChoices[i] != simon.playerChoices[playerLen-1]){
                    
                    playerChoice(count);
                }
                else if(simon.playerChoices[i] != simonChoices[i] && simon.playerChoices.length>0){
                    console.log("player exit"+simon.playerChoices+" length "+simon.playerChoices.length)
                    console.log("simon "+simonChoices)
                    
                    alert("WRONG MOVE!");
                    return
                }
            }
        }
  
}

function playerChoice(count){
//nun funza perche se metto la recorsiva in checkchoice va all'infinito!!    
        let playerMove;
        setInterval(playerChosenButton(playerMove), 2000);
        setInterval(checkchoice(count),5000);  
}

function updateProgressBar(percentage){
    console.log("percentage " +percentage)
    $("#next-lvl-bar").attr("aria-valuenow", percentage+" ").attr("style", "width:"+percentage+"%")
    $("#next-lvl-bar span").text(percentage + "% Complete")
}

function simonGame (){
    let count = 0;
    simon.level = [];
    simon.gameChosenButtons = [];
    simonTurn(count);
    console.log("out " )
     
}