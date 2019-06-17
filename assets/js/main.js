$(document).ready(function(){
    
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
        // $(this).removeClass("show-element-as-inlineBlock").addClass("hide-element");
        // $("#home").removeClass("hide-element").addClass("show-element-as-inlineBlock");
        $(this).text("Rules");
    })



    $("#game").click(function(){
        $("#main-page").slideUp(200);
        simon.drawAll()
        simon.animateDpiCanvas();
        
        $("#game-wrap").fadeIn(500);  
    });

    $("#quit-game").click(function(){
        $("#game-wrap").fadeOut(200);
        cancelAnimationFrame(simon.canvasDpiID);
        $("button").fadeIn(500);
        $("#paraghraphBoard").slideDown(500);
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
});
