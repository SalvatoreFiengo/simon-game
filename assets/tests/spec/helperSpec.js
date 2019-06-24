describe("local storage", () => {

    let mockWindow;

    beforeEach(()=>{

        mockWindow={
            store: {},
            checkStorageAvailability : () => {
                if(this.store){
                    console.log("storage available")
                }else{
                    console.log("save game not possible due to browser version")
                    return
                }
            },
            setItem: (key, value) => { mockWindow.store[key] = value+" "},
            getItem: (key)=>{ return mockWindow.store[key]||null },
            removeItem: (key)=>{ delete mockWindow.store[key] },
            getLenght: () => { return Object.keys(mockWindow.store).length; },
            clear: () => mockWindow.store = {}

        }
    })

    afterEach(() => {
        mockWindow.clear();
    })

    it("should not throw an error if not available", ()=>{
        // arrange
        mockWindow.store = null;

        // act

        spyOn(mockWindow, "checkStorageAvailability").and.callThrough()
        


        // expect
        expect(mockWindow.checkStorageAvailability).not.toThrow()
    })

    it("setItem method should set an item in storage", () => {
        // arrange
        spyOn(mockWindow, "setItem").and.callThrough()
        // act
        mockWindow.setItem(0,"test1");
        // expect
        expect(mockWindow.setItem).toHaveBeenCalledWith(0,"test1")
        expect(mockWindow.getLenght()).toBeGreaterThan(0);
        expect(mockWindow.store[0]).toEqual(jasmine.any(String));
    })

    it("clear method shoud clear the storage", () => {
        // arrange
        spyOn(mockWindow, "clear").and.callThrough()
        mockWindow.setItem(0,"test2");

        // act
        mockWindow.clear();

        // expect
        expect(mockWindow.clear).toHaveBeenCalled();
        expect(mockWindow.getLenght()).toBe(0);
    })

    it("getItem method should get an item from store", () => {
        // arrange
        spyOn(mockWindow, "getItem").and.callThrough()
        mockWindow.setItem(0, "test3");

        // act
        result = mockWindow.getItem(0)

        // expect
        expect(mockWindow.getItem).toHaveBeenCalledWith(0);
        expect(result).toEqual(jasmine.any(String));
        expect(result).toBe(mockWindow.store[0])
    })

    it("removeItem method should delete item from store", () => {
        // arrange
        spyOn(mockWindow, "removeItem").and.callThrough();
        mockWindow.setItem(0, "test4");

        // act
        result = mockWindow.removeItem(0)

        // expect
        expect(mockWindow.removeItem).toHaveBeenCalledWith(0);
        expect(mockWindow.getLenght()).toEqual(0);
    })
})