document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(navigator.camera);
}

$(document).ready(function() {
    console.log("wo detail page ready!");

    var tsk = sessionStorage.getItem("WorkOrderID");
    var wo = getWorkOrder(tsk);
    console.log(wo);

    /* aList.map(
         function(k, v) {
             $('#approvalsList').append(convertApprovalToList(k));
         }
     );*/

    setTimeout(function() {
        console.log(wo.wo_code);
        $("#taskSubject").text(wo.wo_code);
        $("#taskDescription").text(wo.wo_desc);
        $("#taskReportedBy").text(wo.vendor_code);
        $("#taskReportedOn").text(wo.vendor_description);
        $("#taskETA").text(wo.wo_date);
        $("#taskJob").text(wo.job_code);
        $("#taskCustomer").text(wo.short_description);
        $("#taskScope").text(formatCurrency(wo.order_gross_amount, wo.wo_currency));
        //GetTaskComments(tsk[0].task_id);
        //GetTaskAttachments(tsk[0].task_id);
    }, 100);


});

function cmd_TaskDetail_SaveMeta() {
    console.log("Saving metadata");
    var impact = $("#taskImpact").val();
    var action = $("#taskAction").val();
    var res = $("#taskResolution").val();
    var tsk = JSON.parse(sessionStorage.getItem("task"));
    var taskId = tsk[0].task_id;

    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));



    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsSaveTaskMeta";
    // now we will process the document
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "UserID": auth.UserID,
            "Token": auth.Token,
            "TaskID": taskId,
            "Impact": impact,
            "Action": action,
            "Resolution": res
        }
    }).done(function(data) {
        // process response
        console.log(data);

        $("#SuccessMessage").text("Updates Saved.");
        var toastID = new bootstrap.Toast($("#SuccessDialog"));
        toastID.show();

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

function GetTaskComments(taskId) {
    // turn on the spinner
    console.log("Requests fired");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsGetTaskComments";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token, "TaskID": taskId }
    }).done(function(data) {
        // process response
        commentList = data;
        commentList.map(
            function(k, v) {
                $('#commentsList').append(convertCommentToList(k));
            }
        );
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


function convertCommentToList(app) {
    var ls =
        '<a class="list-group-item list-group-item-action flex-column align-items-start" data-bs-toggle="collapse" href="#app_' + app.comment_id + '" role="button" aria-expanded="false" aria-controls="' + app.comment_id + '">' +
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1">' + app.CommentDate +
        '</h5><small>' + app.Commenter + '</small>' +
        '</div>' +
        '<p class="mb-1">' + app.comments + '</p>' +
        '</a>';

    return ls;

}


function searchComments() {
    var value = $("#searchComments").val().toLowerCase();
    console.log(value);
    $("#commentsList").empty();


    commentList.map(
        function(k, v) {
            if (k.comments.toLowerCase().indexOf(value) > -1 || k.CommentDate.toLowerCase().indexOf(value) > -1 ||
                k.Commenter.toLowerCase().indexOf(value) > -1)
                $('#commentsList').append(convertCommentToList(k));
        }
    );

}


function cmd_SaveComment() {
    console.log("Saving Comment");
    var comment = $("#taskComment").val();
    var tsk = JSON.parse(sessionStorage.getItem("task"));
    var taskId = tsk[0].task_id;

    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));



    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsTaskComment";
    // now we will process the document
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "UserID": auth.UserID,
            "Token": auth.Token,
            "TaskID": taskId,
            "Comments": comment
        }
    }).done(function(data) {
        // process response
        console.log(data);

        $("#SuccessMessage").text("Updates Saved.");
        var toastID = new bootstrap.Toast($("#SuccessDialog"));
        toastID.show();

        GetTaskComments(taskId);

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


/** Attachment handling */
function GetTaskAttachments(taskId) {
    // turn on the spinner
    console.log("GettingAttachments");
    $('body').addClass('busy');

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    //$("#username").attr("data-username", auth.DisplayName);

    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsGetTaskAttachments";
    // now we will authenticate the user
    $.ajax({
        type: "GET",
        url: url,
        data: { "UserID": auth.UserID, "Token": auth.Token, "TaskID": taskId }
    }).done(function(data) {
        // process response
        commentList = data;
        commentList.map(
            function(k, v) {
                $('#attachmentsList').append(convertAttachmentToList(k));
            }
        );
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


function convertAttachmentToList(app) {
    var ls = '<a class="list-group-item list-group-item-action" href="#" onclick="downloadAttachment(\'' + app.DocLink + '\',\'' + app.typename + '\' )" role="button"><div class="container">' +
        '<div class="row mb-0"><div class="col-4 text-center"><img class="rounded float-left" src="' + app.ImgSrc + '" height="64px"></div><div class="col-8 text-">' +
        '<h5 class="mb-0">' + app.UploadedOn +
        '</h5><small>' + app.UploadedBy + '</small>' +
        '<p class="mb-0">' + app.typename + '</p>' +
        '</div></div></div></a>';

    return ls;

}

function downloadAttachment(lnk, fName) {
    console.log(fName);
    var mimeType = "application/octet-stream";
    if (fName == "Photographs") {
        mimeType = "image/jpeg";
    }
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
            cordova.plugins.fileOpener2.open(
                entry.toURL(), // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
                mimeType, {
                    error: function(e) {
                        console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                    },
                    success: function() {
                        console.log('file opened successfully');
                    }
                });
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);
        }
    );
}


function searchAttachments() {
    var value = $("#searchAttachments").val().toLowerCase();
    console.log(value);
    $("#attachmentsList").empty();


    commentList.map(
        function(k, v) {
            if (k.typename.toLowerCase().indexOf(value) > -1 || k.UploadedOn.toLowerCase().indexOf(value) > -1 ||
                k.UploadedBy.toLowerCase().indexOf(value) > -1)
                $('#attachmentsList').append(convertAttachmentToList(k));
        }
    );

}

function cmd_TakePhoto() {
    navigator.camera.getPicture(uploadAttachment,
        function() {
            $("#ErrorMessage").text("Camera Error.");
            var toastID = new bootstrap.Toast($("#ErrorDialog"));
            toastID.show();
        }, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            correctOrientation: true,
            saveToPhotoAlbum: false
        }

    );
}

function uploadAttachment(img_url) {
    console.log("Uploading file ");
    const apikey = "AKcoHp6ixRhKbJb6pKZ1zz"; // filestack API key
    const client = filestack.init(apikey);
    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));
    var tsk = JSON.parse(sessionStorage.getItem("task"));
    var taskId = tsk[0].task_id;

    console.log("UploadingAttachments");
    $('body').addClass('busy');

    var fName = license.customer_id + '_' + auth.UserID + '_task_' + taskId + '_attachment_' + Date.now() + '.jpg';
    console.log(fName);
    var url = "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileApprovalsTaskAttachment";
    client.upload({ file: img_url, name: fName }).then(
        function(result) {
            console.log("Adding attachment to omni " + result.url);
            $.ajax({
                type: "POST",
                url: url,
                data: { "UserID": auth.UserID, "Token": auth.Token, "TaskID": taskId, "AttachURL": result.url }
            }).done(function(data) {
                // process response
                $("#attachmentsList").empty();
                GetTaskAttachments(taskId);

            }).fail(function(data) {
                console.log(data);
                $("#ErrorMessage").text("Upload Error.");
                var toastID = new bootstrap.Toast($("#ErrorDialog"));
                toastID.show();
            }).always(function() {
                // turn off the spinner
                $('body').removeClass('busy');
            });
        },
        function(error) {
            $("#ErrorMessage").text("Upload Error.");
            console.log(error);
            var toastID = new bootstrap.Toast($("#ErrorDialog"));
            toastID.show();
        }
    );

    $('body').removeClass('busy');

}