document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(cordova.plugins.fileOpener2);
}

$(document).ready(function() {
    console.log("approval page ready!");

    var aList = JSON.parse(sessionStorage.getItem("jobList"));

    console.log(aList);

    aList.map(
        function(k, v) {
            $('#jobsList').append(convertJobToList(k));
        }
    );

    setTimeout(function() {
        console.log(aList.length);
        $("#approvalCount").text(aList.length);
    }, 1000);


});

function convertJobToList(app) {
    var ls =
        '<a class="list-group-item list-group-item-action flex-column align-items-start" data-bs-toggle="collapse" href="#app_' + app.job_id + '" role="button" aria-expanded="false" aria-controls="' + app.job_id + '">' +
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1">' + app.job_code +
        '</h5><small>' + app.short_description + '</small>' +
        '</div>' +
        '<p class="mb-1">' + app.Zone + '</p>' +
        '<div class="d-flex w-100 justify-content-between"><small>' + app.type_description + '</small>';
    if (app.status_desc == "Active") {
        ls = ls + '<span class="badge bg-success">Active</span>';
    } else {
        ls = ls + '<span class="badge bg-danger">Inactive</span>';
    }
    ls = ls +
        '</div></a>' + '<div class="collapse" id="app_' + app.job_id + '"><div class="card card-style"><div class="content"><div class="row mb-0">' +
        '<div class="col-6"><p class="font-15 font-700 color-theme">Business Unit</p></div><div class="col-6"><p class="font-13 color-theme" >' + app.bu_description + '</p></div>' +
        '<div class="divider divider-margins w-100 mt-2 mb-2"></div>' +
        '<div class="col-6"><p class="font-15 font-700 color-theme">Contract</p></div><div class="col-6"><p class="font-13 color-theme">' + app.contract_code + '</p></div>' +
        '<div class="divider divider-margins w-100 mt-2 mb-2"></div>' +
        '<div class="col-6"><p class="font-15 font-700 color-theme">Customer Code</p></div><div class="col-6"><p class="font-13 color-theme">' + app.customer_code + '</p></div>' +
        '<div class="divider divider-margins w-100 mt-2 mb-2"></div>' +
        '<div class="col-6"><p class="font-15 font-700 color-theme">Customer</p></div><div class="col-6"><p class="font-13 color-theme">' + app.customer_description + '</p></div>' +
        '<div class="divider divider-margins w-100 mt-2 mb-2"></div>' +
        '<a href="#" onclick="popLink(\'' + app.job_id + '\',\'' + app.job_uid + '\')" class="btn btn-xxs mb-3 rounded-s text-uppercase font-900 shadow-s border-blue-dark  bg-blue-light" target="_blank">View <span class="fa fa-info-circle"></span> </a>' +
        '</div></div></div></div>';

    return ls;

}

function process(reqId, type) {
    $("#" + type + "_btn_" + reqId).prop('disabled', true);
    console.log(type + " fired! " + reqId);
    var cmns = $("#app_comments_" + reqId).val();
    console.log(cmns);

    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));

    var a = getApprovalObject(reqId);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsProcessDocument";
    // now we will process the document
    $.ajax({
        type: "POST",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token, "RequestID": reqId, "DocID": a.document_id, "DocTypeCode": a.document_type_code, "Comments": cmns, "ProcessType": type }
    }).done(function(data) {
        // process response
        console.log(data);
        // fire another request to reload the approvals
        url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsGetApprovals";
        $.ajax({
            type: "GET",
            url: url,
            data: { "UserID": auth.UserID, "Token": auth.Token }
        }).done(function(data) {
            // process response
            sessionStorage.setItem("approvalsList", JSON.stringify(data));
            window.location.href = "approval.html";
        }).fail(function(data) {
            console.log(data);
            $("#ErrorMessage").text("Unknown Error.");
            var toastID = new bootstrap.Toast($("#ErrorDialog"));
            toastID.show();

        }).always(function() {
            // turn off the spinner
            $('body').removeClass('busy');
            $("#" + type + "_btn_" + reqId).prop('disabled', false);
        });
    }).fail(function(data) {
        console.log(data);
        $("#ErrorMessage").text("Unknown Error.");
        var toastID = new bootstrap.Toast($("#ErrorDialog"));
        toastID.show();

    }).always(function() {
        // turn off the spinner
        $('body').removeClass('busy');
        $("#" + type + "_btn_" + reqId).prop('disabled', false);
    });
    return true;


}

function getApprovalObject(reqId) {
    var aList = JSON.parse(sessionStorage.getItem("approvalsList"));
    for (var a in aList) {

        if (aList[a].approval_request_id == reqId) return aList[a];
    }

    return null;
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

    $("#jobsList").empty();
    var aList = JSON.parse(sessionStorage.getItem("jobList"));

    aList.map(
        function(k, v) {
            if (k.job_code.toLowerCase().indexOf(value) > -1 || k.bu_description.toLowerCase().indexOf(value) > -1 ||
                k.type_description.toLowerCase().indexOf(value) > -1 ||
                k.status_desc.toLowerCase().indexOf(value) > -1 ||
                k.short_description.toLowerCase().indexOf(value) > -1 ||
                k.Zone.toLowerCase().indexOf(value) > -1 ||
                k.contract_code.toLowerCase().indexOf(value) > -1 ||
                k.customer_code.toLowerCase().indexOf(value) > -1 ||
                k.customer_description.toLowerCase().indexOf(value) > -1)
                $('#jobsList').append(convertJobToList(k));
        }
    );

}