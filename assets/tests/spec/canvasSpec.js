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
        ctx: {
            fillStyle : " ", 
            fill: " ",
            stroke: " ",
            filled: (path) =>( newCanvasObj.ctx.fill = "fill"),
            stroked: (path) => (newCanvasObj.ctx.stroke ="stroke")
        },
        setColor: ()=>{

            var newColor;

            newCanvasObj.endColor == null ? newColor = "light"+newCanvasObj.color : newColor = newCanvasObj.endColor;
            newCanvasObj.ctx.fillStyle = newColor;
            newCanvasObj.fill? newCanvasObj.ctx.filled(newCanvasObj.path): newCanvasObj.ctx.stroked(newCanvasObj.path);
            setTimeout(()=>{
                newCanvasObj.ctx.fillStyle = newCanvasObj.color;
                newCanvasObj.fill? newCanvasObj.ctx.filled(newCanvasObj.path): newCanvasObj.ctx.stroked(newCanvasObj.path);
    
            }, 300)
        }
            
    };

    beforeEach(()=>{
        jasmine.clock().install();
        
    })

    afterEach(() => {
        newCanvasObj.fill = true;
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

    it("if newCanvasObj.endColor is null should set fillStyle property of ctx as lightyellow", () => {
        // arrange
        spyOn(newCanvasObj, "setColor").and.callThrough();

        // act
        newCanvasObj.setColor();

        // expect
        expect(newCanvasObj.ctx.fillStyle).not.toBe(" ");
        expect(newCanvasObj.ctx.fillStyle).toBe("lightyellow");
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

describe("simon method draw all", () => {
    // arrange

    let canvas;
    let width;
    let height;
    let dpi = window.devicePixelRatio;

    beforeEach(() => {
        canvas = {};
        canvas.mockGetContext = (dim="")=>dim;
        width = 300;
        height = 300;
        myCanvas={
            createCanvas : function(canvas, width, height){
                if(canvas.mockGetContext){
                    typeof(width) != "number" ? parseInt(width) : width;
                    typeof(height) != "number" ? parseInt(height) : height;
                    canvas.width = width *dpi;
                    canvas.height = height *dpi;
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

    it("should return ctx", () => {
        // arrange
        spyOn(myCanvas, "createCanvas").and.callThrough();
        
        // act
        ctx = myCanvas.createCanvas(canvas, width, height)
        // expect
        expect(ctx).toEqual("2d");
    })

    it("should not throw error if height and width are passed as strings", () => {
        spyOn(myCanvas, "createCanvas");
        myCanvas.createCanvas(canvas, "200", "200")
        expect(myCanvas.createCanvas).not.toThrow();
    })
})