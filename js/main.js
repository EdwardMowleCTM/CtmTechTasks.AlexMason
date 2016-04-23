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
                    break;
            }
            $.each(data, function(i, creditCard) {
                //Insert credit card name and apr into accordion header
                switch (sortByOption) {
                    case "Cashback":
                        $('#accordion').append('<h3 id="header' + index + '"><b><span class="creditCard-name">' + creditCard.name +
                        '</span><span class="headerDisplay">£' + creditCard.cashback + ' Cashback</span></b></h3>');
                        break;
                    case "AnnualFee":
                        $('#accordion').append('<h3 class="header"><b><span class="creditCard-name">' + creditCard.name +
                        '</span><span class="headerDisplay">£' + creditCard.annualFee + ' Annual Fee</span></b></h3>');
                        break;
                    default:
                        $('#accordion').append('<h3 id="header' + index + '"><b><span class="creditCard-name">' + creditCard.name +
                        '</span><span class="headerDisplay">' + creditCard.apr + '% APR</span></b></h3>');
                        break;

                }
                //Inserts credit card image, information an cashback into accordion body
                $('#header' + index).after('<div class="accordionContent"><img src="/img/' + creditCard.code.toLowerCase() + '.png"/>' +
                    '<p class="information">' + creditCard.information + '</p>' +
                    '<p class="cashback" id="cashback-sign' + index + '">Cashback</p>' +
                    '<p class="cashbackValue" id="cashback-value' + index + '">£' + creditCard.cashback + '</p>' +
                    '<p class="aprAccBody" id="apr-sign' + index + '">APR</p>' +
                    '<p class="aprAccBodyValue" id="apr-value' + index + '">' + creditCard.apr + '%</p>' +
                    '<p class="annFee" id="annFee-sign' + index + '">Annual Fee</p>' +
                    '<p class="annFeeValue" id="annFee-value' + index + '">' + creditCard.annualFee + '</p></div>');

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

    var sortByOption = "APR";
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
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var isOpen = false;

    function slideMenuOpen() {
        $('.container').animate({left: "+=300px"}, 300);
        $('#menu-div').animate({left: "+=0px"}, 300);
        return (isOpen = true);
    }

    function slideMenuClose() {
        $('.container').animate({left: "-=300px"}, 300);
        $('#menu-div').animate({left: "-=0px"}, 300);
        return (isOpen = false);
    }

    $('#menu-div').hide();
    $('nav').css({height: windowHeight});


    $('#menu-button').click(function() {
        isOpen ? slideMenuClose() : slideMenuOpen();
    });

    $(window).on('resize', function() {
        if (isOpen) {
            $('.container').animate({left: "-=300px"}, 300);
            $('#menu-div').animate({left: "-=0px"}, 300);
            $('#menu-div').hide();
            isOpen = false;
        }
    });
});
