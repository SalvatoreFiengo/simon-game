var dpi = window.devicePixelRatio;
//canvas namespace + default setting; 
var simon ={};

simon.currentLevel = 1;
simon.speed = 800;
simon.ctx = null;
simon.myCanvas = document.getElementById("canvas");

simon.ratio = 0.8;
simon.centerX;
simon.centerY;
simon.bigRadius;
simon.smallRadius;
simon.innerCirle;

simon.path;

simon.game;
simon.isSimonTurn = false;
simon.isPlayerTurn = false;
simon.buttonBaseArr = [];
simon.playerCoiches = [];

simon.level = [];
simon.audio = {
    "Red": new Audio("./assets/sounds/Red.mp3"),
    "Blue": new Audio("./assets/sounds/Blue.mp3"),
    "Yellow": new Audio("./assets/sounds/Yellow.mp3"),
    "Green": new Audio("./assets/sounds/Green.mp3")
};

simon.newGame = [];
simon.currentSavedGames=[];
