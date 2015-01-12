
/**
 * BOK Main JS File
 * Author: Pasquale Scerbo (pscerbo@extractable.com)
 */

/* Getting UserAgent so we can target IE10 */

var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

(function ($) {

    var $windowWidth =  $(window).width();

    //Vertical Align Content Function
    $.fn.vAlign = function() {
        return this.each(function(i){
            var ah = $(this).height();
            var ph = $(this).parent().height();
            var mh = Math.ceil((ph-ah) / 2);
            $(this).css('margin-top', mh);
        });
    };

    //Smooth Scroll to Anchor Links
    $.fn.smoothScroll = function(){
        return this.click(function(e){
            e.preventDefault();

            if($windowWidth > 1024){
                $('html,body').animate({
                    scrollTop:$(this.hash).offset().top - 130
                }, 500);
            }else {
                $('html,body').animate({
                    scrollTop:$(this.hash).offset().top - 85
                }, 500);
            }

        });
    }

})(jQuery);

$(function(){
    /**
     * Browser Detection
     */
    if( $("html").hasClass("ie8") ) {
        //alert("You're using IE8");
    };

    /**
     * Sliders
     */
    var $sliderTrigger = $(".sliderControls"),
        $sliderContent = $(".accountDetailsWrap, .paymentWrap");

    $sliderTrigger.on("click", function(){
        var $status = $(this).parents(".accountOverview").next($sliderContent);
        if($status.css("display") == "block"){
            $(this).removeClass("active");
            $status.slideUp(400);
        }else {
            $(this).addClass("active");
            $status.slideDown(400);
        }
    });

    /**
     * User Account Dropdown
     */
    var $userDropdown = $(".userDropdown");

    //Hide Dropdown menu
    $userDropdown.css({
        "display" : "none"
    });

    $(".toolbar ul li.user").each(function(){
        $(this).on("mouseover", function(){
            $userDropdown.fadeIn(25);
        }).mouseleave(function(){
            $userDropdown.fadeOut(25);
        });
    });

    /**
     * Desktop Megamenu
     */
    $(".megamenu").megamenu();

    /**
     * Nested Accordions (jquery.accordion.js)
     */
    $("ul.mobile").accordion();

    /**
     * Stop Page Scroll if Mobile Menu is open
     * Note:  Only need this if the menu is open, otherwise it causes issues with the smooth scroll and the html/body being set to 100%.
     */
    $(".mobileMenu").on("click", function(){
        if( $("body").hasClass("pushy-active") ){
            $("html, body").css({
                "overflow" : "hidden",
                "height" : "100%"
            });
        }else {
            $("html, body").css({
                "overflow" : "",
                "height" : ""
            });
        }
    });

    $(".site-overlay").on("click", function(){
        $("html, body").css({
            "overflow" : "",
            "height" : ""
        });
    });

    /**
     * Hide / Show Content
     */
    $('.actionItem a').click(function(e){
        //Grab the HREF for matching ID
        var divID = $(this).attr('href');

        //Remove the Class from .actionItem
        $(this).parent().siblings().removeClass("current");

        //Hide All Panels on page Load
        $(this).parent().siblings(".actionContent").not(divID).hide();

        //Show/Hide the proper panels
        if( $(this).parent().hasClass("current") ){
            $(this).parent().removeClass("current");
            $(divID).hide();
        }else {
            $(this).parent().addClass("current");
            $(divID).show();
        }
        //Prevent Link Default Action
        e.preventDefault();
    });

    /**
     * Layout Updates
     */
    $("table.summary").find("tr:last").addClass("last");
    $(".ctaWrap .ctaBox:last-child").addClass("last");

    $(".accountInfoTable table").find("tr:last").addClass("last");
    $(".transactionHistory table").find("tr:last").addClass("last");
    $(".accountInfoTable table").find("tr td:first-child").addClass("first");

    /**
     * Update on Load and Resize
     */
    $(window).resize(function (){
        $('.valignmiddle').vAlign();
    });
    $(window).resize();

    /**
     * SmoothScroll
     */
    $('a.scroll').smoothScroll();

    /**
     * Activities Overview Slider
     */
    var $overviewTrigger = $(".activitesTrigger"),
        $activitiesContent = $(".activitiesContent");

    $activitiesContent.hide();

    $overviewTrigger.on("click", function(e){
        e.preventDefault();
        var $nextContent = $(this).parent(".balance").next($activitiesContent);
        if($nextContent.css("display") == "none"){
            $nextContent.slideDown();
            $(this).addClass("open");
        }else {
            $nextContent.slideUp();
            $(this).removeClass("open");
        }
    });

    /* Lightbox */
    //Inline
    $('.inline-popup').magnificPopup({
        type: 'inline'
    });

    //AJAX
    $('.ajax').magnificPopup({
        type: 'ajax'
    });

    //iFrame
    $('.iframe').magnificPopup({
        type: 'iframe'
    });

    $('.closeBtn').click(function(){
        $.magnificPopup.close();
    });

    //Calendar Popup
    $('.day .active').each(function(){
        $(this).magnificPopup({
            items: {
                src: $(this).next('.white-popup'), // should load the next popup
                type: 'inline'
            }
        })
    });

    //Calendar Tip
    $(".tipContent").hide();
    $(".tip").on("click", function(e){
        $(this).children(".tipContent").fadeIn().css({
            "position" : "absolute",
            "top" : 20,
            "left" : -25
        });
        e.stopPropagation();
    });

    $(".closeTip").on("click", function(e){
        $(this).parent().fadeOut();
        e.stopPropagation();
    });

    /**
     * Terms Acceptance Box
     */
    $("#acceptButton").attr("disabled", true);

    $("#terms").on("scroll resize", function(){
        var $contentHeight = $(".scrollTerms")[0].scrollHeight;
        $scrolledFromTop = $(this).scrollTop();
        $wrapperHeight = $(this).height() + 200;

        console.log("1: " + $contentHeight);
        console.log("2: " + $scrolledFromTop);
        console.log("3: " + $wrapperHeight);

        if( $contentHeight - $scrolledFromTop <= $wrapperHeight ){
            $("#acceptButton").removeAttr("disabled", false);
        }
    });

});


