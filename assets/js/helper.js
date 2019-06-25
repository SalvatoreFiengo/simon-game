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
        simon.buttonsClicked = [];
        item.clicked = true;
        item.setColor();
        simon.buttonsClicked.push(item.kind)
        console.log(simon.buttonsClicked)
    }else{

        return false
    }

}

// iterate simon.buttonsArr every 400 ms to change color programmatically

var index = 0;

function intro(){
    var next = simon.buttonArr[index];

    if(index < simon.buttonArr.length){
        
        next.clicked = true;
        next.setColor();
    }else{
        index = 0;
        return
    }
    index++
    
    setTimeout(intro, 300);
} 



