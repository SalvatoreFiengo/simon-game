
simon.createCanvas = function getCanvas(canvas, width, height){
        
        if(canvas.getContext){
            typeof(width)? "string": width.toString();
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
        this.kind = kind;
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
    }

    setColor(){

        var newColor;

        this.endColor == null ? newColor = "light"+this.color : newColor = this.endColor;
        this.name == "circle" ? simon.ctx.fillStyle= " " : newColor = this.color;

        if (simon.ctx.fillStyle == " "){
            simon.ctx.fillStyle = this.color;
            this.fill? simon.ctx.fill(this.path): simon.ctx.stroke(this.path);
            
        }else{
            simon.ctx.fillStyle = newColor;
            this.fill? simon.ctx.fill(this.path): simon.ctx.stroke(this.path);
            
            setTimeout(()=>{
                simon.ctx.fillStyle = this.color;
                this.fill? simon.ctx.fill(this.path): simon.ctx.stroke(this.path);

            }, 300)

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
}

/*--setting up the canvas objects, circles, and buttons */

simon.circle = new simon.drawObj("circle", simon.path, simon.centerX, simon.centerY, simon.bigRadius, 0, 2, "black");
simon.smallCircle = new simon.drawObj("circle", simon.path, simon.centerX, simon.centerY, simon.innerCirle, 0, 2, "black");
simon.blueButton = new simon.drawObj("Blue Button", simon.path, simon.centerX, simon.centerY, simon.smallRadius,0.02,0.48, "blue" )
simon.redButton = new simon.drawObj("Red Button", simon.path, simon.centerX, simon.centerY, simon.smallRadius,1.52,1.98, "red", "#fa7268" )
simon.greenButton = new simon.drawObj("Green Button",simon.path, simon.centerX, simon.centerY, simon.smallRadius,0.52,0.98, "green" )
simon.yellowButton = new simon.drawObj("Yellow Button", simon.path, simon.centerX, simon.centerY, simon.smallRadius,1.02,1.48, "yellow" )

