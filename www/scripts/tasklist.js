$(document).ready(function() {
    console.log("approval page ready!");

    var aList = JSON.parse(sessionStorage.getItem("taskList"));

    console.log(aList);

    aList.map(
        function(k, v) {
            $('#approvalsList').append(convertApprovalToList(k));
        }
    );

    setTimeout(function() {
        console.log(aList.length);
        $("#approvalCount").text(aList.length);
    }, 1000);


});

function cmdTaskDetails(taskId, taskSubject) {
    console.log(taskId);
    console.log(taskSubject);

    // turn on the spinner
    console.log("Task fired");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsGetTaskDetails";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token, "TaskID": taskId }
    }).done(function(data) {
        // process response
        sessionStorage.setItem("task", JSON.stringify(data));
        window.location.href = "taskdetail.html";
    }).fail(function(data) {
        console.log(data);
        $("#ErrorMessage").text("Unknown Error.");
        var toastID = new bootstrap.Toast($("#ErrorDialog"));
        toastID.show();

    }).always(function() {
        // turn off the spinner
        $('body').removeClass('busy');
    });
    return true;


}

function convertApprovalToList(app) {
    var ls =
        '<a class="list-group-item list-group-item-action flex-column align-items-start" href="#" role="button" onclick="cmdTaskDetails(' + app.task_id + ',\'' + app.task_subject + '\')">' +
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1">' + app.task_subject +
        '</h5><small>' + getBadge(app.status_desc, app.color_code) + '</small>' +
        '</div>' +
        '<p class="mb-1">' + app.JobName + '</p>' +
        '<p class="mb-1">' + app.inserted_by + '</p>' +
        '<div class="d-flex w-100 justify-content-between"><small>' + app.inserted_on + '</small>';
    if (app.priority == "Critical") {
        ls = ls + '<span class="fa fa-ban"></span>';
    } else if (app.priority == "High") {
        ls = ls + '<span class="fa fa-exclamation-triangle"></span>';
    }
    if (app.priority == "Low") {
        ls = ls + '<span class="fa fa-check"></span>';
    }
    if (app.priority == "Medium") {
        ls = ls + '<span class="fa fa-star"></span>';
    }
    ls = ls +
        '</div></a>';

    return ls;

}

function getBadge(status, color) {

    return '<span class="badge" style="background-color:' + color + ';"><small>' + status + '</small></span>';

}



function popLink(lnk) {
    window.open(lnk, "_new", "location=no");
}


function searchList() {
    var value = $("#searchList").val().toLowerCase();
    console.log(value);
    $("#approvalsList").empty();
    var aList = JSON.parse(sessionStorage.getItem("taskList"));

    aList.map(
        function(k, v) {
            if (k.task_subject.toLowerCase().indexOf(value) > -1 || k.JobName.toLowerCase().indexOf(value) > -1 ||
                k.status_desc.toLowerCase().indexOf(value) > -1 || k.priority.toLowerCase().indexOf(value) > -1 ||
                k.inserted_by.toLowerCase().indexOf(value) > -1)
                $('#approvalsList').append(convertApprovalToList(k));
        }
    );

}