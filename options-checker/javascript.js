$(document).ready(function() {

    url = document.location.href;

    lineReference = url.split("&linereference=")[1].split("&")[0].replace(/\D/g, '');
    $("[data-results='line-reference']").val(lineReference);

    $.ajax({        
        url: "results.json",
        dataType: "json",
        async: true,        
        success: function (results) {

            if (results.validData === true) {
                
                lowMiniumum = 0;
                lowMaximum = 0;
                highMinimum = 0;
                highMaximum = 0;

                lowMinimum = results.options.low[0].minimum;
                lowMaximum = results.options.low[0].maximum;
                highMinimum = results.options.high[0].minimum;
                highMaximum = results.options.high[0].maximum;

                $("[data-results='low-range']").val(lowMinimum + " to " + lowMaximum);
                $("[data-results='high-range']").val(highMinimum + " to " + highMaximum);

                productRange = [lowMinimum, lowMaximum, highMinimum, highMaximum];

                renderProducts();

            }

        }

    })

    function renderProducts() {

        products = url.split("?products=")[1].split("&linereference=")[0];
        productsSplit = products.split("&");
        cacheBuster = new Date().getTime();

        $.ajax({
            url: "data.json?=" + cacheBuster,
            async: true,
            dataType: "json",
            success: function (products) {

                for (productLength = 0; productLength < productsSplit.length; ++productLength) {

                    code = productsSplit[productLength];

                    $.each(products.catalogue, function (i, item) {
                        if (item.product.code == code) {
                            $(".product-container tbody").append("<tr data-product='" + item.product.code + "'><td>" + item.product.name + "<br /><a href='#' data-toggle='modal' data-target='#Modal" + item.product.code + "'>Find out more</a></td><td><ul></ul></td><td>" + productRange[item.product.low] + " - " + productRange[item.product.high] + "</td><td>" + item.product.contract + "</td><td>" + item.product.price + "</td></tr>");

                            for (var featureNumber = 0; featureNumber < item.product.features.length; featureNumber++) {
                                $("tr[data-product='" + item.product.code + "'] td ul").append("<li>" + item.product.features[featureNumber] + "</li>");
                            }

                            $("body").prepend("<div class='modal fade' id='Modal" + item.product.code + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h4 class='modal-title' id='myModalLabel'>" + item.product.name + "</h4></div><div class='modal-body'></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>");

                            for (var descriptionNumber = 0; descriptionNumber < item.product.description.length; descriptionNumber++) {
                                $("div#Modal" + item.product.code + " div.modal-body").append("<p>" + item.product.description[descriptionNumber] + "</p>");
                            }

                        }                        

                    });

                }

            }

        })

    }

});