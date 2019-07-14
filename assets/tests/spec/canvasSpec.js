describe("simon Canvasobj-class", function(){
    // arrange
    newCanvasObj = {
        kind: "string",
        path: undefined,
        x: undefined,
        y: undefined,
        r: undefined,
        start: 0,
        end: undefined,
        color: "yellow",
        fill: true,
        endColor: null,
        antiClockwise: false,
        clicked: true,
        ctx: {
            fillStyle : " ", 
            fill: " ",
            stroke: " ",
            filled: (path) =>( newCanvasObj.ctx.fill = "fill"),
            stroked: (path) => (newCanvasObj.ctx.stroke ="stroke")
        },
        setColor: ()=>{

            var newColor;

            if(newCanvasObj.endColor == null && newCanvasObj.color != "black"){
                newColor = "light"+ newCanvasObj.color;
            }else if(newCanvasObj.color == "black"){
                newCanvasObj.clicked = false;
            }else{
                newColor = newCanvasObj.endColor;
            }
            
            newCanvasObj.ctx.fillStyle = newCanvasObj.color;
            newCanvasObj.fill? newCanvasObj.ctx.filled(newCanvasObj.path): newCanvasObj.ctx.stroked(newCanvasObj.path);
            
            if(newCanvasObj.clicked){
                newCanvasObj.ctx.fillStyle = newColor;
                newCanvasObj.fill? newCanvasObj.ctx.filled(newCanvasObj.path): newCanvasObj.ctx.stroked(newCanvasObj.path);

                setTimeout(()=>{
                    newCanvasObj.ctx.fillStyle = newCanvasObj.color;
                    newCanvasObj.fill? newCanvasObj.ctx.filled(newCanvasObj.path): newCanvasObj.ctx.stroked(newCanvasObj.path);
        
                }, 300)
            }
        }
            
    };

    beforeEach(()=>{
        jasmine.clock().install();
        
    })

    afterEach(() => {
        newCanvasObj.fill = true;
        newCanvasObj.clicked = true;
        newCanvasObj.color = "yellow"
        jasmine.clock().uninstall();
    })

    

    it("setColor method should be called", () => {
        // arrange
        spyOn(newCanvasObj, "setColor");

        // act
        newCanvasObj.setColor();

        // expect
        expect(newCanvasObj.setColor).toHaveBeenCalled();
        
    })

    it("newCanvasObj property endColor to be always null", () =>{
        // arrange
        spyOn(newCanvasObj, "setColor");

        // act
        newCanvasObj.setColor();

        //expect
        expect(newCanvasObj.endColor).toBe(null);
    })

    it("if newCanvasObj.endColor is null should set fillStyle property of ctx as lightyellow before setTimeout is called", () => {
        // arrange
        spyOn(newCanvasObj, "setColor").and.callThrough();

        // act
        newCanvasObj.setColor();

        // expect
        expect(newCanvasObj.ctx.fillStyle).not.toBe(" ");
        expect(newCanvasObj.ctx.fillStyle).toBe("lightyellow");
    })

    it("if newCanvasObj.endColor is null && newCanvasObj.color is black should set fillStyle property of ctx as black before setTimeout is called", () => {
        // arrange
        newCanvasObj.color = "black"
        spyOn(newCanvasObj, "setColor").and.callThrough();

        // act
        newCanvasObj.setColor();

        // expect
        expect(newCanvasObj.ctx.fillStyle).not.toBe(" ");
        expect(newCanvasObj.ctx.fillStyle).toEqual("black");
    })

    it("should not call setTimeout if clicked is false", (done) => {
        //arrange
        newCanvasObj.clicked = false;
        spyOn(newCanvasObj, "setColor").and.callThrough()
        // act
        newCanvasObj.setColor();
        
        setTimeout(() => {
            
            done()
        },300)
        jasmine.clock().tick(301);
        // expect
        expect(newCanvasObj.ctx.fillStyle).toBe("yellow"); 


    })

    it("newCanvasObj.ctx.fillStyle should be equal to color after timeout", (done) => {
        // arrange
        spyOn(newCanvasObj, "setColor").and.callThrough();

        // act
        newCanvasObj.setColor();
        setTimeout(()=>{
            done();
        },300)        
        jasmine.clock().tick(301);

        // expect
        expect(newCanvasObj.ctx.fillStyle).toBe("yellow");               
        
    }, 2000)

    it('if newCanvasObj.fill is true should set ctx.fill as "fill"',() => {
        // arrange
        spyOn(newCanvasObj, "setColor").and.callThrough();
        newCanvasObj.ctx.fill = " ";
        newCanvasObj.ctx.stroke = " ";

        // act
        newCanvasObj.setColor();

        // expect
        expect(newCanvasObj.ctx.fill).toEqual("fill");
        expect(newCanvasObj.ctx.stroke).toEqual(" ");
    })
    
    it('if newCanvasObj.fill is false should set ctx.stroke as "stroke"', () => {
        // arrange
        spyOn(newCanvasObj, "setColor").and.callThrough();
        newCanvasObj.fill = false;
        newCanvasObj.ctx.fill = " ";
        newCanvasObj.ctx.stroke = " ";

        // act
        newCanvasObj.setColor();

        // expect
        expect(newCanvasObj.ctx.stroke).toEqual("stroke");
        expect(newCanvasObj.ctx.fill).toEqual(" ");

    })

});

describe("simon mock method createCanvas", () => {
    // arrange

    let canvas;
    let width;
    let height;
    let canvasObject;

    beforeEach(() => {
        canvas = {};
        canvasObject = {};
        canvas.mockGetContext = (dim="")=>dim;
        width = 300;
        height = 300;
        myCanvas={
            createCanvas : function(canvas, width, height){
                if(canvas.mockGetContext){
                    width = typeof(width)!= Number? parseInt(width) : width;
                    height = typeof(height)!= Number? parseInt(height) : height;
                    canvasObject.centerX = width /2;
                    canvasObject.centerY = height /2;
                    canvasObject.bigRadius = width/2.5;
                    canvasObject.smallRadius = width/2.75;
                    canvasObject.innerCirle = width/5;
                    canvas.width = width;
                    canvas.height = height;
                    return ctx = canvas.mockGetContext("2d");
                }else{
                    return `<h2> canvas not supported! </h2>`;
                }
            }
        }
    })

    it("should be calling createCanvas with 3 paramenters", ()=>{
        // arrange
        spyOn(myCanvas, "createCanvas");
    
        // act
        myCanvas.createCanvas(canvas,width,height)        
        // expect
        expect(myCanvas.createCanvas).toHaveBeenCalled()
        expect(myCanvas.createCanvas).toHaveBeenCalledWith(canvas, width, height)
    })

    it("should return ctx, canvas height and width to be of type number", () => {
        // arrange
        spyOn(myCanvas, "createCanvas").and.callThrough();
        
        // act
        height = "300";
        width = "300";
        ctx = myCanvas.createCanvas(canvas, width, height)
        // expect
        expect(ctx).toEqual("2d");
        console.log(canvas);
        expect(canvas.height).toEqual(jasmine.any(Number));
        expect(canvas.width).toEqual(jasmine.any(Number));
    })

    it("should not throw error if height and width are passed as strings", () => {
        spyOn(myCanvas, "createCanvas");
        myCanvas.createCanvas(canvas, "200", "200")
        expect(myCanvas.createCanvas).not.toThrow();
    })
})