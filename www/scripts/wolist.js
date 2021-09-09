document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(cordova.plugins.fileOpener2);
}

$(document).ready(function() {
    console.log("approval page ready!");

    var aList = JSON.parse(sessionStorage.getItem("woList"));

    console.log(aList);

    aList.map(
        function(k, v) {
            $('#woList').append(convertWOToList(k));
        }
    );

    setTimeout(function() {
        console.log(aList.length);
        $("#approvalCount").text(aList.length);
    }, 1000);


});

function convertWOToList(app) {
    var ls =
        '<a class="list-group-item list-group-item-action flex-column align-items-start" data-bs-toggle="collapse" href="#app_' + app.wo_id + '" role="button" aria-expanded="false" aria-controls="' + app.wo_id + '">' +
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1">' + app.wo_code +
        '</h5><small>' + app.wo_date.substring(0, 10) + '</small>' +
        '</div>' +
        '<p class="mb-1">' + app.vendor_description + '</p>' +
        '<div class="d-flex w-100 justify-content-between"><small>' + formatCurrency(app.order_gross_amount, app.wo_currency) + '</small>';
    if (app.Status != "Cancelled") {
        ls = ls + '<span class="badge bg-success">' + app.Status + '</span>';
    } else {
        ls = ls + '<span class="badge bg-danger">Cancelled</span>';
    }
    ls = ls +
        '</div></a>' + '<div class="collapse" id="app_' + app.wo_id + '"><div class="card card-style"><div class="content"><div class="row mb-0">' +
        '<div class="col-6"><p class="font-15 font-700 color-theme">Job</p></div><div class="col-6"><p class="font-13 color-theme" >' + app.job_code + '</p></div>' +
        '<div class="divider divider-margins w-100 mt-2 mb-2"></div>' +
        '<div class="col-6"><p class="font-15 font-700 color-theme">Job Name</p></div><div class="col-6"><p class="font-13 color-theme">' + app.short_description + '</p></div>' +
        '<div class="divider divider-margins w-100 mt-2 mb-2"></div>' +
        '<div class="col-6"><p class="font-15 font-700 color-theme">Vendor Code</p></div><div class="col-6"><p class="font-13 color-theme">' + app.vendor_code + '</p></div>' +
        '<div class="divider divider-margins w-100 mt-2 mb-2"></div>' +
        '<div class="col-6"><p class="font-15 font-700 color-theme">Details</p></div><div class="col-6"><p class="font-13 color-theme">' + app.wo_desc + '</p></div>' +
        '<div class="divider divider-margins w-100 mt-2 mb-2"></div>' +
        '<a href="#" onclick="popLink(\'' + app.doc_view_link + '\',\'WO_' + app.wo_id + '.pdf\')" class="btn btn-xxs mb-3 rounded-s text-uppercase font-900 shadow-s border-blue-dark  bg-blue-light" target="_blank">View <span class="fa fa-info-circle"></span> </a>' +
        '<a href="#" onclick="openWO(\'' + app.wo_id + '\')" class="btn btn-xxs mb-3 rounded-s text-uppercase font-900 shadow-s border-blue-dark  bg-green-light">Measurements <span class="fa fa-ruler"></span> </a>' +
        '</div></div></div></div>';

    return ls;

}

function openWO(woId) {

    sessionStorage.setItem("WorkOrderID", woId);
    window.location.href = "wodetail.html";
}



function popLink(lnk, fName) {
    $('body').addClass('busy');
    console.log(lnk);
    var fileTransfer = new FileTransfer();
    var store = cordova.file.dataDirectory;
    var fileURL = store + fName;
    console.log(fileURL);
    var uri = encodeURI(lnk);
    console.log(uri);
    fileTransfer.download(
        uri,
        fileURL,
        function(entry) {
            console.log("download complete: " + entry.toURL());
            $('body').removeClass('busy');
            cordova.plugins.fileOpener2.open(
                entry.toURL(), // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
                'application/pdf', {
                    error: function(e) {
                        console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                    },
                    success: function() {
                        console.log('file opened successfully');
                    }
                });
        },
        function(error) {
            $('body').removeClass('busy');
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);
        }
    );

}



function searchList() {
    var value = $("#searchList").val().toLowerCase();

    $("#woList").empty();
    var aList = JSON.parse(sessionStorage.getItem("woList"));

    aList.map(
        function(k, v) {
            if (k.job_code.toLowerCase().indexOf(value) > -1 || k.short_description.toLowerCase().indexOf(value) > -1 ||
                k.wo_code.toLowerCase().indexOf(value) > -1 ||
                k.wo_desc.toLowerCase().indexOf(value) > -1 ||
                k.order_gross_amount.toLowerCase().indexOf(value) > -1 ||
                k.Status.toLowerCase().indexOf(value) > -1 ||
                k.vendor_code.toLowerCase().indexOf(value) > -1 ||
                k.wo_date.toLowerCase().indexOf(value) > -1 ||
                k.vendor_description.toLowerCase().indexOf(value) > -1)
                $('#woList').append(convertJobToList(k));
        }
    );

}