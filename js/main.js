"use strict";
//Begins when the page has finished loading, makes sure json data can be loaded
$(document).ready(function() {
    var sortByOption = "APR";
    var accHeaderDisplay = "";
    //Function to sort the json data by lowest to highest chosen data display value
    function sortJsonData(a, b) {
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
    function displaySortByOption(creditCard) {
        switch (sortByOption) {
            case "Cashback":
                return accHeaderDisplay = '<span class="headerDisplay">£' + creditCard.cashback + ' Cashback</span></b></h3>';
                break;
            case "AnnualFee":
                return accHeaderDisplay = '</span><span class="headerDisplay">£' + creditCard.annualFee + ' Annual Fee</span></b></h3>';
                break;
            default:
                return accHeaderDisplay = '</span><span class="headerDisplay">' + creditCard.apr + '% APR</span></b></h3>';
        }
    }

    function displayJsonData() {
        var index = 1; //Iterates to give unique ID's to certain elements
        $.getJSON('cards.json', function(data) {
            data = $(data).sort(sortJsonData);
            $.each(data, function(i, creditCard) {
                var accHeader = '<h3 id="header' + index + '"><b><span class="creditCardName">' + creditCard.name + '</span>';
                //Insert credit card name and apr into accordion header
                accHeaderDisplay = displaySortByOption(creditCard);
                $('#accordion').append(accHeader + accHeaderDisplay);
                //Inserts credit card image, information into accordion body
                $('#header' + index).after('<div class="accordionContent"><img src="/img/' + creditCard.code.toLowerCase() + '.png"/><p class="information">' + creditCard.information + '</p><div class="cashbackContainer"><label class="cashback">Cashback</label><p class="cashbackValue">£' + creditCard.cashback + '</p></div><div class="moreInfoContainer"><label class="aprAccBody">APR</label><p class="aprAccBodyValue">' + creditCard.apr + '%</p><label class="annFee">Annual Fee</label><p class="annFeeValue">£' + creditCard.annualFee + '</p></div></div>');
                    index++;
            });
            //Initializes accordion
            $("#accordion").accordion();
            //Defines accordion custom header icons for default and active state (images from css source)
            $("#accordion").accordion("option", "icons", {
                'header': 'defaultIcon',
                'activeHeader': 'selectedIcon'
            });
        });
    }


    sortByOption = localStorage.getItem("sortByOption");
    $('.sortBySelect').val(sortByOption);
    displayJsonData(sortByOption);

    //SortBy drop down functionality
    $('.sortBySelect').on('change', function() {
        sortByOption = this.value;
        localStorage.setItem("sortByOption", sortByOption);
        location.reload(true);
    });

    // Side tab functionality
    var isOpen = false;
    var setNavHeight = $('nav').css({height: window.innerHeight});
    $('#menu-div').hide();
    setNavHeight;

    function isSmallScreen() {
        return (window.innerWidth < 720);
    }

    function slideLargeMenu() {
        if (isOpen) {
            $('.container').animate({left: "-=300px"}, 300);
            $('#menu-div').animate({left: "-=0px"}, 300);
            return (isOpen = false);
        } else {
            $('.container').animate({left: "+=300px"}, 300);
            $('#menu-div').animate({left: "+=0px"}, 300);
            return (isOpen = true);
        }
    }

    function slideSmallMenu() {
        if (isOpen) {
            $('.container').animate({left: "-=200px"}, 300);
            $('#menu-div').animate({left: "-=0px"}, 300);
            return (isOpen = false);
        } else {
            $('.container').animate({left: "+=200px"}, 300);
            $('#menu-div').animate({left: "+=0px"}, 300);
            return (isOpen = true);
        }
    }

    $('#menu-button').click(function() {
        setNavHeight;
        isSmallScreen() ? slideSmallMenu() : slideLargeMenu();
    });

    $(window).on('resize', function() {
        isOpen ? isSmallScreen() ? slideSmallMenuClose() : slideLargeMenuClose() : null;
    });
});
