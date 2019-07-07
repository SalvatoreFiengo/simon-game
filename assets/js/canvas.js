
simon.createCanvas = function getCanvas(canvas, width, height){
        
        if(canvas.getContext){

            simon.centerX = width /2;
            simon.centerY = height /2;
            simon.bigRadius = width/2.5;
            simon.smallRadius = width/2.75;
            simon.innerCirle = width/5;
            console.log("innercircle "+simon.innerCirle)
            typeof(width)? "string": width.toString();
            typeof(height)? "string": height.toString();

            canvas.width = width;
            canvas.height = width;


            simon.ctx = canvas.getContext("2d");
            
            return simon.ctx
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
            if(simon.isSimonTurn){ 
                simon.canvasText("red","Simon Turn");
            }else if(simon.isPlayerTurn){
                
                simon.canvasText("blue",simon.player.name);
            }else{
                simon.canvasText("green");
            }
            
            setTimeout(()=>{
                let soundPromise = simon.audio[this.kind].play();
                
                if(soundPromise !== undefined){
                    soundPromise.then(_ =>{
                        return
                    }).catch(error =>{
                        console.log(error)
                    }); 
                }
                setTimeout(()=>{
                    simon.ctx.fillStyle = this.color;
                    this.fill? simon.ctx.fill(this.path): simon.ctx.stroke(this.path);
                    this.clicked = false; 
                    simon.smallCircle.draw();
    
                    if(simon.isSimonTurn){ 
                        simon.canvasText("red","Simon Turn");
                    }else if(simon.isPlayerTurn){
                        
                        simon.canvasText("blue",simon.player.name);
                    }else{
                        simon.canvasText("green");
                    }
                    
                 
                }, 400);
            },1)
            
 
        }

    }

    draw(){
        this.path = new Path2D();
        this.path.arc(simon.centerX, simon.centerY, this.r, Math.PI*this.start, Math.PI*this.end, this.antiClockwise)
        this.kind == "circle" ? this.path.moveTo(simon.centerX, simon.centerY) : this.path.lineTo(simon.centerX, simon.centerY);
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
    simon.ctx.font = "bold 1.5em Baloo Da";
    simon.ctx.fillStyle = "rgb(212, 211, 211)";
    simon.ctx.fillText("Simon", simon.centerX - 40, simon.centerY -10);
    simon.ctx.font = "bold 1em Baloo Da";
    simon.ctx.fillStyle = color;
    simon.ctx.fillText(text, simon.centerX - 20, simon.centerY +30);
}

simon.drawAll= function drawAll(){
    
    this.createCanvas(simon.myCanvas, 300, 300)
    this.ctx.clearRect(0,0,simon.myCanvas.width, simon.myCanvas.height)
    simon.ctx.imageSmoothingEnabled=false;

    simon.circle = new simon.drawObj("circle", simon.path, simon.centerX, simon.centerY, simon.bigRadius, 0, 2, "black");
    simon.smallCircle = new simon.drawObj("circle", simon.path, simon.centerX, simon.centerY, simon.innerCirle, 0, 2, "black");
    simon.startCircle = new simon.drawObj("circle", simon.path, simon.centerX, simon.centerY, simon.innerCirle, 0, 2, "black", false);
    simon.blueButton = new simon.drawObj("Blue", simon.path, simon.centerX, simon.centerY, simon.smallRadius,0.02,0.48, "blue" )
    simon.redButton = new simon.drawObj("Red", simon.path, simon.centerX, simon.centerY, simon.smallRadius,1.52,1.98, "red", true, "#fa7268" )
    simon.greenButton = new simon.drawObj("Green",simon.path, simon.centerX, simon.centerY, simon.smallRadius,0.52,0.98, "green" )
    simon.yellowButton = new simon.drawObj("Yellow", simon.path, simon.centerX, simon.centerY, simon.smallRadius,1.02,1.48, "yellow" )
    
    simon.buttonBaseArr=[simon.blueButton, simon.redButton, simon.greenButton, simon.yellowButton];

    this.ctx.beginPath();
    this.circle.draw();
    
    this.blueButton.draw();
    this.redButton.draw();
    this.greenButton.draw();
    this.yellowButton.draw();


    
    this.smallCircle.draw()
    this.canvasText("green");
        

}


/*--setting up the canvas objects, circles, and buttons */







