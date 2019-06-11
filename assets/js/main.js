$(document).ready(function(){
    
    // resize section based on footer height

    $("footer").resize(function() {

        $("section").css("min-height", $(window).height() - $("footer").height() + "px");

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

var toggleMenu = (event)=>{
        console.log(event.target)
    }

});
