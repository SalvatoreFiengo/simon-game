function getMousePos(canvas, event){
    var rect = canvas.getBoundingClientRect();
    return {
        x: parseInt(event.clientX-rect.left),
        y: parseInt(event.clientY-rect.top)
    };
}