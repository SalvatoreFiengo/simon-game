function getMousePos(canvas, event){
    var rect = canvas.getBoundingClientRect();
    return {
        x: parseInt(event.clientX-rect.left),
        y: parseInt(event.clientY-rect.top)
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