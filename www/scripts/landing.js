function landing() {
    if (location.href != "landing.html")
        window.location.href = "landing.html";
}

// fired on clicking the approvals button
function landing_cmdJobs() {

    // turn on the spinner
    console.log("Jobs fired");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileProjectsGetJobList";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token }
    }).done(function(data) {
        // process response
        sessionStorage.setItem("jobList", JSON.stringify(data));
        window.location.href = "joblist.html";
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


// fired on clicking the approvals button
function landing_cmdWorkOrders() {

    // turn on the spinner
    console.log("WorkOrders fired");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileProjectsGetWorkOrderList";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token }
    }).done(function(data) {
        // process response
        sessionStorage.setItem("woList", JSON.stringify(data));
        window.location.href = "wolist.html";
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



function landing_cmdRequests() {
    // turn on the spinner
    console.log("Requests fired");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsGetRequests";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token }
    }).done(function(data) {
        // process response
        sessionStorage.setItem("requestList", JSON.stringify(data));
        window.location.href = "request.html";
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

function landing_cmdLogout() {
    window.location.href = "index.html";
}

function landing_cmdSecurity() {
    window.location.href = "security.html";
}

function landing_cmdStats() {
    window.location.href = "stats.html";
}

function landing_cmdTasks() {
    // turn on the spinner
    console.log("Tasks fired");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsGetTasks";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token }
    }).done(function(data) {
        // process response
        sessionStorage.setItem("taskList", JSON.stringify(data));
        window.location.href = "tasklist.html";
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