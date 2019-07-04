var dpi = window.devicePixelRatio;
//canvas namespace + default setting; 
var simon ={};

simon.currentLevel = 1;
simon.speed = 800;
simon.ctx = null;
simon.myCanvas = document.getElementById("canvas");

simon.ratio = 0.8;
simon.canvasWidth = window.innerWidth ; 
simon.canvasHeight = simon.canvasWidth * simon.ratio;
simon.centerX = simon.canvasWidth /2;
simon.centerY = simon.canvasHeight /2;
simon.bigRadius = simon.canvasWidth /2.5;
simon.smallRadius = simon.canvasWidth /2.75;
simon.innerCirle = simon.canvasWidth /5;

simon.path;

simon.game;
simon.isSimonTurn = false;
simon.isPlayerTurn = false;
simon.buttonBaseArr = [];
simon.playerCoiches = [];
simon.gameChosenButtons = []
simon.level = [];
simon.audio = {
    "Red": new Audio("./assets/sounds/Red.mp3"),
    "Blue": new Audio("./assets/sounds/Blue.mp3"),
    "Yellow": new Audio("./assets/sounds/Yellow.mp3"),
    "Green": new Audio("./assets/sounds/Green.mp3")
};

