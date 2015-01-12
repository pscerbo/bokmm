$(function(){

    /**
     * Payment History Tab
     */
    var $singleTab = $(".singleTab"),
        $singleTabContent = $(".singleTabContent");

    $singleTab.on("click", function(e){
        if( $(this).hasClass("current") ) {
            $(this).parents(".wrap").find($singleTabContent).hide();
            $(this).removeClass("current");
        }else {
            $(this).parents(".wrap").find($singleTabContent).show();
            $(this).addClass("current");
        }
        e.preventDefault();
    });

    /**
     * Update Payment Total
     */
    var $amount = $(".amt"),
        $sumTotal = $("#sumTotal"),
        $numOfPayments = $("#numOfPayments"),
        $numOfPayees = $("#numOfPayees");
        $confirmation = $("#confirmation");

    $amount.keyup(function(){
        var $totalPayment = 0.00;
        $amount.each(function() {
            var i = parseFloat($(this).val(), 10);
            if (!isNaN(i)) {
                $totalPayment += i;
                $confirmation.css({
                    "visibility" : "visible"
                });
            }
        });

        var $floatTotal = $totalPayment.toFixed(2);
        //Update Total
        $sumTotal.text($floatTotal);

    });

    /**
     * Show Hidden Div on focus
     */
    $("input.amt").focus(function(){
        $("input.amt").each(function(){
            if ($(this).val() == "") {
                $(this).parents(".wrap").siblings(".paymentDetails").hide();
            }
        });
        $(this).parents(".wrap").siblings(".paymentDetails").show();
    });

    /**
     * Num of Payments + Num of Payees
     */
    $amount.keyup(function(){
        var $paymentCount = 0,
            $payeeCount = 0;
        $amount.each(function() {
            var i = parseFloat($(this).val(), 10);
            if (!isNaN(i)) {
                $paymentCount += 1;
                $payeeCount += 1;
            }
        });

        //Update Num of Payments
        $numOfPayments.text($paymentCount);
        //Update Num pf Payees
        $numOfPayees.text($payeeCount);
    });

    /**
     * Clearing Fields and Updating Total
     */
    $(".clearVal").on("click", function(){
        var $sub = $(this).prev("input").val().replace(/^\s+|\s+$/g, ""),
            $updateNumOfPayments,
            $updateNumOfPayees;

        $(this).parents(".wrap").siblings(".paymentDetails").hide();

        if (isNaN($sub)) {
            $(this).prev("input").val('');
            $updatePaymentAmount = $sumTotal.text();
            $updateNumOfPayments = $numOfPayments.text() - 0;
            $updateNumOfPayees = $numOfPayees.text() - 0;
        }else {
            $(this).prev("input").val('');
            $updatePaymentAmount = $sumTotal.text() - $sub;
        }

        if( $sub !== '' ){
            $updateNumOfPayments = $numOfPayments.text() - 1;
            $updateNumOfPayees = $numOfPayees.text() - 1;
        }

        if( isNaN($sub) ){
            $updateNumOfPayments = $numOfPayments.text();
            $updateNumOfPayees = $numOfPayees.text();
        }

        var $floatTotal = $updatePaymentAmount.toFixed(2);

        $sumTotal.text($floatTotal);
        $numOfPayments.text($updateNumOfPayments);
        $numOfPayees.text($updateNumOfPayees);

        if($floatTotal == 0 || $floatTotal == 0.00) {
            $confirmation.css({
                "visibility" : "hidden"
            });
        }

    });

    /**
     * Locking / Unlocking Confirmation Container
     */
    var $placeholder = $("#confirmContainer"),
        $view = $(window); // Binding to Window Scroll and Resize

    if( $placeholder.length > 0 ){

        $view.bind("scroll resize", function(){
            /*
             Get Height of confirmationHolder to add to placeholder
             to avoid page jump (footer jump) when the confirmationHolder
             is pulled from the Document flow.
             */
            var $setHeight = $confirmation.height();
            $placeholder.css({
                "height" : $setHeight
            });

            /*
             Lock / Unlock Confirmation Container Based scroll & visibility
             Note: Using jquery.visible.min.js to get element screen offsets
             */
            if ($placeholder.visible()) {
                $confirmation.removeClass("fixed");
                $confirmation.addClass("notFixed");
            } else {
                $confirmation.addClass("fixed");
                $confirmation.removeClass("notFixed");
            }

        });
    }

    /**
     * Hidden Payee Layout
     */
    $(".payee").each(function(){
        if( $(this).hasClass("hiddenPayee")){
            $(this).children(".wrap").children().hide();
            $(this).children(".wrap").children(".payeeName").show();
            $(this).children(".wrap").children(".hiddenMessage").show();
        }
    });

    /**
     * Recurring Payment Panel
     */
    $(".recurringPaymentPicker a").each(function(){
        var $openPanel = $(this).parents(".recurringPaymentPicker").next();
        $(this).on("click", function(e){
            if( $openPanel.css("display") == "none"){
                $openPanel.slideDown();
                $(this).parent().addClass("on");
            }else {
                $openPanel.slideUp();
                $(this).parent().removeClass("on");
            }

            e.preventDefault();
        });

        $(".rpCancel").on("click", function(e){
            $(this).parents(".recurringPaymentPanel").prev(".recurringPaymentPicker").children(".rpHandle").removeClass("on");
            $(this).parents(".recurringPaymentPanel").prev(".recurringPaymentPicker").children(".rpHandle").removeClass("makeRecurring");
            $(this).parents(".recurringPaymentPanel").slideUp();
            e.preventDefault();
        });

        $(".rpSave").on("click", function(e){
            $(this).parents(".recurringPaymentPanel").prev(".recurringPaymentPicker").children(".rpHandle").removeClass("on");
            $(this).parents(".recurringPaymentPanel").prev(".recurringPaymentPicker").children(".rpHandle").addClass("makeRecurring");
            $(this).parents(".recurringPaymentPanel").slideUp();
            e.preventDefault();
        });

        //Enable & Disable 'Number of Payments' input
        $('input.rpCheck').change(function(){
            if ($(this).is(':checked') == true){
                $(this).parent(".numOfPayments").find('input.setNumPayments').prop('disabled', true);
                console.log('checked');
            } else {
                $(this).parent(".numOfPayments").find('input.setNumPayments').prop('disabled', false);
                console.log('unchecked');
            }
        });

        //Close Calendar Popup if click outside
        $(document).mouseup(function (e) {
            if (!$openPanel.is(e.target) && $openPanel.has(e.target).length === 0) {
                $openPanel.slideUp(200); //Close Open panel
                $openPanel.prev(".recurringPaymentPicker").children(".rpHandle").removeClass("on");
            }
        });


    });






});
