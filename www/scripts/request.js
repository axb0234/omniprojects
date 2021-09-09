$(document).ready(function() {
    console.log("request page ready!");

    var aList = JSON.parse(sessionStorage.getItem("requestList"));

    console.log(aList);

    aList.map(
        function(k, v) {
            $('#requestList').append(convertRequestToList(k));
        }
    );

    setTimeout(function() {
        console.log(aList.length);
        $("#requestCount").text(aList.length);
    }, 1000);


});

function convertRequestToList(app) {
    var ls =
        '<a class="list-group-item list-group-item-action flex-column align-items-start" data-bs-toggle="collapse" href="#app_' + app.approval_request_id + '" role="button" aria-expanded="false" aria-controls="' + app.approval_request_id + '">' +
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1">' + app.document_code +
        '</h5><small class="badge rounded-pill ' + statusBadge(app.StatusCode) + '">' + app.Status + '</small>' +
        '</div>' +
        '<p class="mb-1">' + app.ApprovedBy + '</p>' +
        '<div class="d-flex w-100 justify-content-between"><small>' + app.approved_on + '</small>';

    ls = ls +
        '</div></a>' + '<div class="collapse" id="app_' + app.approval_request_id + '"><div class="card card-body">' +
        app.approval_comments +
        '<a href="#" onclick="popLink(\'' + app.doc_view_link2 + '\',\'APPRequest_' + app.approval_request_id + '.pdf\')" class="btn btn-xxs mb-3 rounded-s text-uppercase font-900 shadow-s border-blue-dark  bg-blue-light">View <span class="fa fa-info-circle"></span> </a>' +
        '</div></div>';

    return ls;

}

function statusBadge(code) {
    return (code == 'RQ') ? 'bg-primary' :
        (code == 'RJ') ? 'bg-danger' :
        'bg-success';
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
    console.log(value);
    $("#requestList").empty();
    var aList = JSON.parse(sessionStorage.getItem("requestList"));

    aList.map(
        function(k, v) {
            if (k.document_code.toLowerCase().indexOf(value) > -1 || k.Status.toLowerCase().indexOf(value) > -1 ||
                k.ApprovedBy.toLowerCase().indexOf(value) > -1)
                $('#requestList').append(convertApprovalToList(k));
        }
    );

}