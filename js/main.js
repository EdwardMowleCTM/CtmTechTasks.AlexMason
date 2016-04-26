//Function to sort the json data by lowest to highest APR value
function sortJsonByAPR(a, b) {
    return a.apr > b.apr ? 1 : -1;
}

function sortJsonByCashback(a, b) {
    return a.cashback > b.cashback ? 1 : -1;
}

function sortJsonByAnnualFee(a, b) {
    return a.annualFee > b.annualFee ? 1 : -1;
}

//Begins when the page has finished loading, makes sure json data can be loaded
$(document).ready(function() {

    function displayJsonData() {
        var index = 1; //Iterates to give unique ID's and classes to certain elements
        $.getJSON('cards.json', function(data) {
            var accHeader;
            switch (sortByOption) {
                case "Cashback":
                    data = $(data).sort(sortJsonByCashback);
                    break;
                case "AnnualFee":
                    data = $(data).sort(sortJsonByAnnualFee);
                    break;
                default:
                    data = $(data).sort(sortJsonByAPR);
            }
            $.each(data, function(i, creditCard) {
                //Insert credit card name and apr into accordion header
                switch (sortByOption) {
                    case "Cashback":
                        $('#accordion').append('<h3 id="header' + index + '"><b><span class="creditCardName">' + creditCard.name +
                        '</span><span class="headerDisplay">£' + creditCard.cashback + ' Cashback</span></b></h3>');
                        break;
                    case "AnnualFee":
                        $('#accordion').append('<h3 id="header' + index + '"><b><span class="creditCardName">' + creditCard.name +
                        '</span><span class="headerDisplay">£' + creditCard.annualFee + ' Annual Fee</span></b></h3>');
                        break;
                    default:
                        $('#accordion').append('<h3 id="header' + index + '"><b><span class="creditCardName">' + creditCard.name +
                        '</span><span class="headerDisplay">' + creditCard.apr + '% APR</span></b></h3>');
                }
                //Inserts credit card image, information an cashback into accordion body
                $('#header' + index).after('<div class="accordionContent"><img src="/img/' + creditCard.code.toLowerCase() + '.png"/>' +
                    '<p class="information">' + creditCard.information + '</p>' +
                    '<div class="cashbackContainer"><label class="cashback" id="cashback-' + creditCard.code.toLowerCase() + '">Cashback</label>' +
                    '<p class="cashbackValue"  id="cashbackValue-' + creditCard.code.toLowerCase() + '">£' + creditCard.cashback + '</p>' +
                    '</div><div class="moreInfoContainer"><label class="aprAccBody">APR</label>' +
                    '<p class="aprAccBodyValue">' + creditCard.apr + '%</p>' +
                    '<label class="annFee">Annual Fee</label>' +
                    '<p class="annFeeValue">£' + creditCard.annualFee + '</p></div></div>');

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
        return (window.innerWidth < 720 ? true : false);
    }

    function slideLargeMenuOpen() {
        $('.container').animate({left: "+=300px"}, 300);
        $('#menu-div').animate({left: "+=0px"}, 300);
        return (isOpen = true);
    }
    function slideLargeMenuClose() {
        $('.container').animate({left: "-=300px"}, 300);
        $('#menu-div').animate({left: "-=0px"}, 300);
        return (isOpen = false);
    }

    function slideSmallMenuOpen() {
        $('.container').animate({left: "+=200px"}, 300);
        $('#menu-div').animate({left: "+=0px"}, 300);
        return (isOpen = true);
    }
    function slideSmallMenuClose() {
        $('.container').animate({left: "-=200px"}, 300);
        $('#menu-div').animate({left: "-=0px"}, 300);
        return (isOpen = false);
    }


    $('#menu-button').click(function() {
        setNavHeight;
        if (isSmallScreen()) {
            isOpen ? slideSmallMenuClose() : slideSmallMenuOpen();
        } else {
            isOpen ? slideLargeMenuClose() : slideLargeMenuOpen();
        }
    });

    $(window).on('resize', function() {
        isOpen ? isSmallScreen() ? slideSmallMenuClose() : slideLargeMenuClose() : null;
    });
});
