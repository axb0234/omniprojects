$(document).ready(function() {
    console.log("stats page ready!");

    setTimeout(function() {
        getRequestAge();
        getApprovals();
        getRejections();
    }, 1);


});

function getApprovals() {
    var ctx = $('#approvalsChart');

    // turn on the spinner
    console.log("Approvals fired");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsGetApprovedByMeStats";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token }
    }).done(function(data) {
        // process response

        var labels = [];
        var rec = [];
        var i = 0;
        data.forEach(function(d) {
            console.log(d);
            labels[i] = d.Bucket;
            rec[i] = d.numRequests;
            i++;
        });

        var reqAgeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Approvals',
                    data: rec,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

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

function getRejections() {
    var ctx = $('#rejectionsChart');

    // turn on the spinner
    console.log("Rejections fired");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsGetRejectionStats";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token }
    }).done(function(data) {
        // process response

        var labels = [];
        var rec = [];
        var i = 0;
        data.forEach(function(d) {
            console.log(d);
            labels[i] = d.document_type;
            rec[i] = d.numRequests;
            i++;
        });

        var reqAgeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Rejections By Document Type',
                    data: rec
                }]
            },

        });

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

function getRequestAge() {
    var ctx = $('#requestAgeChart');

    // turn on the spinner
    console.log("Request Age fired");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsGetRequestAgeStats";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token }
    }).done(function(data) {
        // process response

        var labels = [];
        var rec = [];
        var i = 0;
        data.forEach(function(d) {
            console.log(d);
            labels[i] = d.Bucket;
            rec[i] = d.numRequests;
            i++;
        });

        var reqAgeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Requests',
                    data: rec,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

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