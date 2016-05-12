"use strict";
//Begins when the page has finished loading, makes sure json data can be loaded
$(document).ready(function() {
    var sortByOption = "APR";

    var data = [];
    var counter = 0;

    //Function to sort the json data by lowest to highest chosen data display value
    function sortCardData(a, b) {
        switch (sortByOption) {
            case "Cashback":
                return a.cashback > b.cashback ? 1 : -1;
                break;
            case "AnnualFee":
                return a.annualFee > b.annualFee ? 1 : -1;
                break;
            default:
                return a.apr > b.apr ? 1 : -1;
        }
    }

    function getCardData(callback) {
        $.getJSON('cards.json', function(cardData) {
            data = $(cardData).sort(sortCardData);
            callback(data);
        });
    }

    function getFilterHeader(creditCard, accHeaderDisplay) {
        var displayOption = "";
        switch (sortByOption) {
            case "Cashback":
                displayOption = `£${creditCard.cashback} Cashback`;
                break;
            case "AnnualFee":
                displayOption = `£${creditCard.annualFee} Annual Fee`;
                break;
            default:
                displayOption = `${creditCard.apr}% APR`;
        }
        return accHeaderDisplay = `<span class="headerDisplay">${displayOption}</span></b></h3>`;
    }

    function displayCards(cardData) {
        var index = 1; //Iterates to give unique ID's to certain elements
        $.each(cardData, function(i, creditCard) {
            var accHeaderDisplay = "";
            var accHeader = `<h3 id="header${index}"><b><span class="creditCardName">${creditCard.name}</span>`;
            //Insert credit card name and apr into accordion header
            accHeaderDisplay = getFilterHeader(creditCard, accHeaderDisplay);
            $('#accordion').append(accHeader + accHeaderDisplay);
            //Inserts credit card image, information into accordion body
            $('#header' + index).after(`
                <div class="accordionContent">
                    <img src="/img/${creditCard.code.toLowerCase()}.png">
                    <p class="information">${creditCard.information}</p>
                    <div class="cashbackContainer">
                        <label>Cashback</label>
                        <p>£${creditCard.cashback}</p>
                    </div>
                    <div class="moreInfoContainer">
                        <div class="moreInfoWrapper">
                            <label class="aprAccBody">APR</label>
                            <p class="aprAccBodyValue">${creditCard.apr}%</p>
                        </div>
                        <div class="moreInfoWrapper">
                            <label class="annFee">Annual Fee</label>
                            <p class="annFeeValue">£${creditCard.annualFee}</p>
                        </div>
                    </div>
                </div>
            `);
            index++;
        });
        //Initializes accordion
        $("#accordion").accordion();
        //Defines accordion custom header icons for default and active state (images from css source)
        $("#accordion").accordion("option", "icons", {
            'header': 'defaultIcon',
            'activeHeader': 'selectedIcon',
        });
    }

    getCardData(displayCards);


    //SortBy drop down functionality
    $('#sortBySelect').on('change', function() {
        $('#accordion').accordion("destroy");  //Necessary to 'destroy' accordion before emptying it
        $('#accordion').empty();
        sortByOption = this.value;
        data = $(data).sort(sortCardData);
        displayCards(data);
    });

    // Side tab functionality
    var isOpen = false;
    var setNavHeight = $('nav').css({height: window.innerHeight});
    var currentMenu = "";   //the sub-menu of the selected nav button
    setNavHeight;

    if (window.innerHeight < 700) {
        $('nav').css({height: window.innerHeight + 200});
    }

    function isSmallScreen() {
        return (window.innerWidth < 544);
    }

    function slideLargeMenu() {
        if (isOpen) {
            $('.container').animate({left: "-=300px"}, 300);
            isOpen = false;
        } else {
            $('.container').animate({left: "+=300px"}, 300);
            isOpen = true;
        }
    }

    function slideSmallMenu() {
        if (isOpen) {
            $('.container').animate({left: "-=200px"}, 300);
            isOpen = false;
        } else {
            $('.container').animate({left: "+=200px"}, 300);
            isOpen = true;
        }
    }

    $('#menuButton').click(function() {
        setNavHeight;
        isSmallScreen() ? slideSmallMenu() : slideLargeMenu();
    });

    $(window).on('resize', function() {
        setNavHeight;
        isOpen ? isSmallScreen() ? slideSmallMenu() : slideLargeMenu() : null;
    });

    $('.navButton').click(function() {
        currentMenu = $(this).find(':nth-child(3)');
        if (window.innerWidth < 1024) {
            currentMenu.slideDown('fast');
        }
    });
    $('.navButton').mouseleave(function() {
        if (window.innerWidth < 1024) {
            currentMenu.slideUp(400);
            // $(this).css('background-color', 'rgba(255,255,255,0.8)');
        }
    });

    $('.navButton').hover(function() {
        currentMenu = $(this).find(':nth-child(3)');
        if (window.innerWidth > 1023) {
            // currentMenu.slideDown();
            // $(this).siblings().css({
            //     position: "static",
            // });
        }
    },  function() {
        if (window.innerWidth > 1023) {
            currentMenu.hide();
            // $(this).siblings().css({top: "60px"});
        }
    });
});
