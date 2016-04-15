//Function to sort the json data by lowest to highest APR value
function sortJsonAPR(a, b) {
    return a.apr > b.apr ? 1 : -1;
};

//Begins when the page has finished loading, makes sure json data can be loaded
$(document).ready(function() {

    var index = 1; //Iterates to give unique ID's to certain elements
    var cardList = new Array(); //Array to store card names

    $.getJSON('cards.json', function(data) {
        data = $(data).sort(sortJsonAPR);
        $.each(data, function(i, creditCard) {
            //Inserts credit card name and apr into accordion header
            $('#accordion').append('<h3 id="header' + index + '"><b>' + creditCard.name +
                '<p id="apr">' + creditCard.apr + '% APR</p></b></h3>');
            //Appends APR data to array
            cardList.push(creditCard.code);
            //Inserts credit card image, information an cashback into accordion body
            $('#header' + index).after('<div id="accordionContent"><img src="/img/' +
                creditCard.code.toLowerCase() + '.png"/><p id="information"' + index + '">' +
                creditCard.information + '</p><p id="cashback' + index + '">Cashback</p><p id="cashbackValue' +
                index + '">' + "£" + creditCard.cashback + '</p></div>');

            index = index + 1;
        });
        //Iterates to ensure seperate card details populate one accordion body each
        $.each(cardList, function(i, list) {
            $("#" + list).nextUntil("h3").wrapAll("<div></div>");
        });

        $(function() {
            //Initializes accordion
            $("#accordion").accordion();
            //Defines accordion custom header icons for default and active state (images from css source)
            $("#accordion").accordion("option", "icons", {
                'header': 'defaultIcon',
                'activeHeader': 'selectedIcon'
            });
        });
    });
});
