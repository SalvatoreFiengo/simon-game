$(document).ready(function(){

    // resize section based on footer height

    $(window).resize(function() {
        // footer menu < 768 px

        $("section").css("min-height", $(window).height() - $("footer").height() + "px");
        
        var listIdArr=['company','feedback','language']

        if($(window).width()< 768){
            $("#company>li").slice(1).hide();
            $("#feedback>li").slice(1).hide();
            $("#language>li").slice(1).hide();
                
            $("li:first-child").click(function(){
                for(i=0; i<listIdArr.length; i++){
                    
                    if($(this).parent().attr("id") == listIdArr[i]){
                        
                        $(this).siblings().toggle();

                    }
                    else{
                        $("#"+listIdArr[i]+">li").slice(1).hide();

                    }
                }                  
            })
        }else{
            $("#company>li").slice(1).removeClass("hide-element");
            $("#feedback>li").slice(1).removeClass("hide-element");
            $("#language>li").slice(1).removeClass("hide-element");
        }
      }).resize();

    // Add text dinamically based on paragraphs.js variables plus change buttons behaviour dinamically;

    $("#paraghraphBoard").text(description);

    $("#rules").click(function(){
        $("#paraghraphBoard").text(rules);
        $(this).removeClass("show-element-as-inlineBlock").addClass("hide-element");
        $("#home").removeClass("hide-element").addClass("show-element-as-inlineBlock");
    })

    $("#home").click(function(){
        $("#paraghraphBoard").text(description);
        
        $(this).removeClass("show-element-as-inlineBlock").addClass("hide-element");
        $("#rules").removeClass("hide-element").addClass("show-element-as-inlineBlock");
    });

    $("#game").click(function(){
        $("#paraghraphBoard").fadeOut(500);
        $("button").fadeOut();
        $("#canvas").fadeIn(500);
        
    });

});