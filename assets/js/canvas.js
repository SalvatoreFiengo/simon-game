
simon.createCanvas = function getCanvas(canvas, width, height){
        
        if(canvas.getContext){

            typeof(width)? "string": width.toString();
            typeof(height)? "string": height.toString();

            canvas.width = width *dpi;
            canvas.height = height *dpi;
            return simon.ctx = canvas.getContext("2d");
        }else{
            return `<h2> canvas not supported! </h2>`;
        }
 
}

simon.animateDpiCanvas = function reDrawDpiCanvas(){
    simon.canvasDpiID = requestAnimationFrame(reDrawDpiCanvas);
} 

simon.drawObj = class CanvasObj{
    constructor(kind = "circle", path, x, y, r, start = 0, end, color, fill = true,endColor = null, antiClockwise = false){
        this.kind = kind.toString();
        this.path = path;
        this.x = x;
        this.y =y;
        this.r = r;
        this.start = start;
        this.end = end;
        this.antiClockwise = antiClockwise;
        this.color = color;
        this.fill = fill;
        this.endColor = endColor;
        this.clicked = false;
    }

    setColor(){

        var newColor;

        if(this.endColor == null && this.color != "black"){
            newColor = "light"+ this.color;
        }else if(this.color == "black"){
            this.clicked = false;
        }else{
            newColor = this.endColor;
        }

        simon.ctx.fillStyle = this.color;
        this.fill? simon.ctx.fill(this.path): simon.ctx.stroke(this.path);
        
        if(this.clicked){

            simon.ctx.fillStyle = newColor;
            this.fill? simon.ctx.fill(this.path): simon.ctx.stroke(this.path);

            simon.smallCircle.draw();
            simon.canvasText("green");

            setTimeout(()=>{
                simon.ctx.fillStyle = this.color;
                this.fill? simon.ctx.fill(this.path): simon.ctx.stroke(this.path);
                this.clicked = false; 
                simon.smallCircle.draw();
                simon.canvasText("green");               
            }, 300);
 
        }

    }

    draw(){
        this.path = new Path2D();
        this.path.arc(simon.centerX, simon.centerY, this.r, Math.PI*this.start, Math.PI*this.end, this.antiClockwise)
        this.name == "circle" ? this.path.moveTo(simon.centerX, simon.centerY) : this.path.lineTo(simon.centerX, simon.centerY);
        this.setColor();
        this.path.closePath();
    }

}

simon.canvasText = (color, text = "start") => {
    simon.startCircle.draw();
    simon.ctx.moveTo(simon.centerX, simon.centerY)
    var startGame = new Path2D();
    startGame.arc(simon.centerX, simon.centerY, simon.innerCirle-20, 0, Math.PI*2, true);
    simon.ctx.strokeStyle= "black";
    simon.ctx.fillStyle = "rgba(0,0,0,.6)";
    simon.ctx.fill(startGame); 
    simon.ctx.stroke(startGame);
    startGame.closePath();
    simon.ctx.moveTo(simon.centerX, simon.centerY);
    simon.ctx.font = "bold 4em Baloo Da";
    simon.ctx.fillStyle = "rgb(212, 211, 211)";
    simon.ctx.fillText("Simon", simon.centerX - 110, simon.centerY -10);
    simon.ctx.font = "bold 2.5em Baloo Da";
    simon.ctx.fillStyle = color;
    simon.ctx.fillText(text, simon.centerX - 55, simon.centerY +80);
}

simon.drawAll= function drawAll(){
    
    this.createCanvas(simon.myCanvas, simon.canvasWidth, simon.canvasHeight)
    this.ctx.imageSmoothingEnabled=false;
    let bigRadius = null;
    let smallRadius = null;
    let innerCirle = null;

    bigRadius = this.canvasWidth/2.5;
    smallRadius = this.canvasWidth/2.75;
    innerCirle = this.canvasWidth/5;

    this.centerX = this.myCanvas.width/2;
    this.centerY = this.myCanvas.height/2;
    this.bigRadius = bigRadius;
    this.smallRadius = smallRadius;
    this.innerCirle = innerCirle;
    this.circle.x = this.centerX;
    
    this.ctx.beginPath();
    this.circle.draw();
    this.blueButton.draw();
    this.redButton.draw();
    this.greenButton.draw();
    this.yellowButton.draw();
    this.smallCircle.draw();
    this.canvasText("green");
}


/*--setting up the canvas objects, circles, and buttons */

simon.circle = new simon.drawObj("circle", simon.path, simon.centerX, simon.centerY, simon.bigRadius, 0, 2, "black");
simon.smallCircle = new simon.drawObj("circle", simon.path, simon.centerX, simon.centerY, simon.innerCirle, 0, 2, "black");
simon.startCircle = new simon.drawObj("circle", simon.path, simon.centerX, simon.centerY, simon.innerCirle, 0, 2, "black", false);
simon.blueButton = new simon.drawObj("Blue", simon.path, simon.centerX, simon.centerY, simon.smallRadius,0.02,0.48, "blue" )
simon.redButton = new simon.drawObj("Red", simon.path, simon.centerX, simon.centerY, simon.smallRadius,1.52,1.98, "red", true, "#fa7268" )
simon.greenButton = new simon.drawObj("Green",simon.path, simon.centerX, simon.centerY, simon.smallRadius,0.52,0.98, "green" )
simon.yellowButton = new simon.drawObj("Yellow", simon.path, simon.centerX, simon.centerY, simon.smallRadius,1.02,1.48, "yellow" )

simon.buttonArr = [simon.blueButton, simon.redButton, simon.greenButton, simon.yellowButton]