$(function(){

	/**
	 * Find and Replace Selected Menu Text
	 */
	var $selected = $(".availableAccountsDropdown").find("a.selected").html();
	$(".accountsAvailableMenu").text($selected);

	/**
	 * Available Accounts Menu
	 */
	$(".accountsAvailableMenu").on("click", function(){
		if( $(this).hasClass("selectAccount") ){
			$(this).removeClass("selectAccount");
			$(".availableAccountsDropdown").hide();
		}else {
			$(this).addClass("selectAccount");
			$(".availableAccountsDropdown").show();
		}
		var $accountDropdown = $(".availableAccountsDropdown");
		//Close Menu if clicking outside element
		$(document).mouseup(function (e) {
            if (!$accountDropdown.is(e.target) && $accountDropdown.has(e.target).length === 0) {
                $accountDropdown.hide(); //Close Open panel
                $(".accountsAvailableMenu").removeClass("selectAccount");
            }
        });

	});

	$('.optionButton a').click(function(e){
        //Grab the HREF for matching ID
        var divID = $(this).attr('href');

        //Remove the Class from .actionItem
        $(this).parent().siblings().removeClass("current");

        //Hide All Panels on page Load
        $(this).parents(".historySearch").siblings(".historySearchOptions").not(divID).hide();

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

});

