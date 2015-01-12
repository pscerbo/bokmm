/**
 * Payee Search
 * Author: Pasquale Scerbo (pscerbo@extractable.com)
 */
$(function(){

    $("#payeeSearch").on("keyup click input", function(){

        // Retrieve the input field text and reset the count to zero
        var $filter = $(this).val(),
            $numOfPayeesFound = 0;

        // Loop through the comment list
        $(".payee .payeeName h2 a").each(function(){

            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp($filter, "i")) < 0) {
                $(this).parents(".payee").hide();
                $(".payeeFlash").show();
            } else {
                $(this).parents(".payee").show();
                $(".payeeFlash").hide();
                $numOfPayeesFound++;
            }
        });

        // Update the count
        //var numberItems = $numOfPayeesFound;
        if($numOfPayeesFound == 0){
            $(".noPayeeFound").delay(500).show();
        } else {
            $(".noPayeeFound").hide();
        }
    });

    //Clear Payee Search Field
    $(".clearInput").on("click", function(){
        //$(this).prev().val("");
        $("#payeeSearch").val("");
        $(".payee").show();
        $(".viewAllPayments").parent().hide();
    });

    $(".viewAllPayments").on("click", function(e){
        //$(this).prev().val("");
        $("#payeeSearch").val("");
        $(".payee").show();
        $(this).parent().hide();
        e.preventDefault();
    });

});