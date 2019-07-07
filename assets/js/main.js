(function(){$(document).ready(function(){
    
    // resize section based on footer height

    $(window).on("resize load",function() {

        $("section").css("min-height", $(window).height() - $("footer").height() + "px");
    }).resize();

    // Add text dinamically based on paragraphs.js variables plus change buttons behaviour dinamically;
    
    $("#paraghraphBoard p").text(description);

    $("#switch-home-rules").click(function(){
        if($("#paraghraphBoard p").text()== description){
            $("#paraghraphBoard p").text(rules)
            $(this).text("Home");
            return
        }
        $("#paraghraphBoard p").text(description);
        $(this).text("Rules");
    })



    $("#game").click(function(){
        $("#main-page").slideUp(200);
        simon.drawAll()

        $("#scoreboard-cell").hide();
        $("#game-wrap").fadeIn(500);

        let introTimeOut = setTimeout(() => {

            $("#canvas").unbind("click").click(function(){
                if(canvasButtonIsClicked(simon.smallCircle, event)){
                    simon.smallCircle.draw();
                    simon.canvasText("red", "Intro");
                }

            })

            $("#quit-game").unbind("click").click(()=>{});
            $("#play-game").unbind("click").click(()=>{});
            $("#scoreboard").unbind("click").click(()=>{});

            showHighlightedButtons(simon.buttonBaseArr, simon.speed)
            let introSecondTimeOut=setTimeout(function(){
                
               simon.buttonBaseArr.forEach((item)=>{
                    item.clicked = true;
                    item.setColor();
                })

                $("#quit-game").click(function() {
                    clearTimeout(introSecondTimeOut);
                    clearTimeout(introTimeOut);
                    $(".canvas-cell").fadeIn();

                    $("#game-wrap").fadeOut(200);
                   
                    $("#main-page").slideDown(200);
                })

                $("#scoreboard").click(function(){
                    if(!$("#scoreboard-cell").is(":visible")){
                        $(".canvas-cell").hide();

                        $("#footer-progress-bar").hide();
                        
                        getGamesStat("#scoreboard-table")
                        
                        $("#scoreboard-cell").show();
                    
                    }else{
                        $("#scoreboard").unbind("click").click(()=>{});
                    }
                })

                $("#play-game").unbind("click").click(function(){

                    $("#saved-games-modal").hide();
                    $("#game-paused").modal("hide");
                    $("#new-game-modal").show();

                    simon.currentSavedGames=JSON.parse(storage().getItem("0"));
                    simon.player.name = $("#name:text").val();
                    simon.currentSavedGames != null ? simon.currentSavedGames: simon.currentSavedGames = [];
                    simon.player.count = 0;
                    simon.player.score = 0;
                    simon.player.currentLevel = 1;
                    simon.player.simonLevel = [];
                    simon.player.numberOfGames = 0;
                    simon.player.id = simon.currentSavedGames.length;
                    simon.currentSavedGames.push(simon.player);
                    console.log("play "+simon.currentSavedGames)
                    storage().setItem("0",JSON.stringify(simon.currentSavedGames));

                    clearTimeout(simon.game);
                    simon.game=setTimeout(()=>{simonGame(simon.player);},simon.speed)  
                    
                })

                $("#canvas").unbind("click").click(function(){

                    $("#game-paused").modal("show");
                    $("#new-game-modal").show();
                    $("#play-game").show();
                    $("#back-to-new-game").hide();
                    $("#saved-games-modal").hide();
                })

                $(document).on("click","#back-to-canvas",(function(){     
                    
                    $("#scoreboard-cell").hide();
                    $(".canvas-cell").fadeIn();
                    $("#footer-progress-bar").fadeIn()
                }))

            },3500)
        },501)


    });


    $("#load-game").unbind("click").click(function(){

        $("#new-game-modal").hide();
        $("#play-game").hide();
        $("#back-to-new-game").show();
        $("#saved-games-modal").show();
        
        
        getGamesStat("#saved-games")

        $("#saved-games tbody tr").click(function(){
            let id=$(this).attr("id");
            console.log("loaded :"+simon.currentSavedGames[id].name+" id "+simon.currentSavedGames[id].id)
            let simonSavedMoves=[];

            simon.player.id = simon.currentSavedGames[id].id;
            simon.player.name = simon.currentSavedGames[id].name;
            simon.player.count = simon.currentSavedGames[id].count;
            simon.player.score = simon.currentSavedGames[id].score;
            simon.player.currentLevel = simon.currentSavedGames[id].currentLevel;
            simon.player.numberOfGames++;


            if(simon.level.length < simon.currentSavedGames[id].simonLevel.length){
                simonSavedMoves=[...simon.currentSavedGames[id].simonLevel];
                simonSavedMoves.forEach((button)=>{
                    for(i=0; i<simon.buttonBaseArr.length; i++){
                        if(button.kind == simon.buttonBaseArr[i].kind){
                            simon.level.push(simon.buttonBaseArr[i]);
                        }
                    }
                })
            }

            

            $("#game-paused").modal("hide");
            clearTimeout(simon.game);
            simon.game=setTimeout(()=>{simonGame(simon.player);},simon.speed);
        })
        $("#back-to-new-game").click(function(){
            $("#new-game-modal").show();
            $("#saved-games-modal").hide();
            $("#play-game").show();
            $("#back-to-new-game").hide();
        })
    })

    // footer menu: when clicked will close other menus
    $("footer ul>li:first-child").click(function(){
        if($("footer").width()>767){
            return
        }else{
            $(this).siblings().toggle();
            var id=$(this).parent().attr("id");
            $("ul:not(#"+id+") >li:first-child").siblings().hide();
        }
    })
});})(jQuery)
