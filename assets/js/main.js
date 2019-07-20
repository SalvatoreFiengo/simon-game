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

    // when click on game switch sections and show game section with canvas 
    // update current player game level
    // sets up canvas to handle the start/load status of the game 
    // sets scoreboard table buttons behaviour
    // sets game table buttons behaviours

    $("#game").click(function(){
        $("#main-page").slideUp(200);

        //draw canvas --canvas.js
        if(window.innerWidth <window.innerHeight){
            simon.drawAll(250,250, simon.soundOn);
        }
        else{
            simon.drawAll(300,300,simon.soundOn);   
        }

        $("#play-game, #back-to-canvas, #scoreboard-cell").hide();
        $("#quit-game,#scoreboard,#settings, .level").fadeTo("fast",0);

        $("#game-wrap").fadeIn(500);

        // presetting the level badge to player game level

        $("#lvl").text(simon.player.currentLevel)

        let introTimeOut = setTimeout(() => {

            $("#canvas").unbind("click").click(function(){

                // function to check if the central circle is clicked if it is write intro in red

                if(canvasElementIsClicked(simon.smallCircle, event)){
                    return
                }

            })
            
            //recursive function, call itself every "game speed time" 
            //takes an array of canvas simon button objects and makes them blink at games speed --helper.js
            simon.intro = true;
            simon.smallCircle.draw();
            simon.canvasText("red", "Intro");
            showHighlightedButtons(simon.buttonBaseArr, simon.speed)
            
            let introSecondTimeOut=setTimeout(function(){

                $("#quit-game, #play-game, #scoreboard,#settings, .level").fadeTo("slow",1);

                //funciton to set event handlers for quit and scoreboard button --helper.js

                setQuitandScoreboardButton(); 

                simon.smallCircle.draw();
                simon.canvasText("green", "Start");
                simon.intro = false;
                // to make all buttons blink togheter

                simon.buttonBaseArr.forEach((item)=>{
                    item.clicked = true;
                    item.setColor();
                })

                $("#play-game").unbind("click").click(function(){

                    $("#saved-games-modal").hide();
                    $("#game-paused").modal("hide");
                    $("#new-game-modal").show();
                
                    // resets "simon.player" --variables.js 
                    resetPlayer(simon.player);
                    // gets a new player setting the basic stat and pushes it in simon.currentSavedGames array--helper.js
                    getNewPlayer();
                    // then set in the local storage --helpers.js
                    storage().setItem("0",JSON.stringify(simon.currentSavedGames));

                    clearInterval(introTimeOut);
                    clearInterval(introSecondTimeOut);
                    //starts the game --helpers.js

                    simonGame(simon.player)

 
                })


                $("#canvas").unbind("click").click(function(){

                    $("#game-paused").modal("show");
                    $("#new-game-modal, #play-game").show();
                    $("#back-to-new-game, #saved-games-modal").hide();
                })

                $(document).on("click","#back-to-canvas",(function(){     
                    
                    $("#back-to-canvas, #scoreboard-cell").hide();
                    $("#quit-game").show();
                    $(".canvas-cell, #footer-progress-bar").fadeIn();

                }))

            },3500)
        },501)


    });


    $("#load-game").unbind("click").click(function(){

        $("#new-game-modal, #play-game").hide();

        $("#back-to-new-game, #saved-games-modal").show();        
        
        getGamesStat("#saved-games")
        loadPlayer();

        $("#back-to-new-game").click(function(){

            $("#new-game-modal, #play-game").show();
            $("#saved-games-modal, #back-to-new-game").hide();

        })
    })

    $("#settings, #sound").click(function(){
        $("#settings-modal").modal("show");
    })

    // sound off/ sound on
    
    $(document).on("click","label.btn",function(){
        $("label.btn").removeClass("btn-success"); 
        $("label.btn").addClass("btn-secondary");

        let checked = $("label.btn:first-child").attr("checked", "checked");

        if(checked){
            $(this).removeClass("btn-secondary");
            $(this).addClass("btn-success");
            if($(this).children(":first").attr("id")=="option1"){
                simon.soundOn = !simon.soundOn;
                if(window.innerWidth <window.innerHeight){
                    simon.drawAll(250,250);
                }
                else{
                    simon.drawAll();   
                }
                simon.level.forEach((button)=>{
                    button.soundOn = simon.soundOn
                })

            }else{
                simon.soundOn = !simon.soundOn;
                if(window.innerWidth <window.innerHeight){
                    simon.drawAll(250,250);
                }
                else{
                    simon.drawAll();   
                }
                simon.level.forEach((button)=>{
                    button.soundOn = simon.soundOn
                })
            }
        }
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
