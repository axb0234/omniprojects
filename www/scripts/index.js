var versionString = "";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    cordova.getAppVersion.getVersionNumber().then(function(version) {
        versionString = version;
        console.log(version);
        $('#version').text(versionString);

    });
}



// This is a JavaScript file
function index_cmdLogin() {

    // turn on the spinner
    $('body').addClass('busy');
    $("#index_cmdLogin").prop('disabled', true);

    var username = $("#username").val();
    var password = $("#password").val();
    var clientid = $("#clientid").val();

    // lets use the client id to get the server url
    $.ajax({
            type: "GET",
            url: "https://license.aspirtek.com/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=LicenseByTenant",
            data: { "tenant": clientid }
        }).done(function(data) {
            /*process response*/
            var license = data;
            console.log(license);
            sessionStorage.setItem("license", JSON.stringify(license));
            // now we will authenticate the user
            $.ajax({
                type: "GET",
                url: "https://" + license.serverroot + "/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=MobileLogin",
                data: { "Username": username, "Password": password }
            }).done(function(data) {
                // process response

                sessionStorage.setItem("auth", JSON.stringify(data));
                console.log(sessionStorage.getItem("auth"));
                window.location.href = "landing.html";
            }).fail(function(data) {
                console.log(data);
                $("#ErrorMessage").text("Login failed.");

                var toastID = new bootstrap.Toast($("#ErrorDialog"));
                toastID.show();

            }).always(function() {
                // turn off the spinner
                $('body').removeClass('busy');
                $("#index_cmdLogin").prop('disabled', false);
            });
        })
        .fail(function(data) {
            console.log(data);
            $("#ErrorMessage").text("License invalid.");

            var toastID = new bootstrap.Toast($("#ErrorDialog"));
            toastID.show();
            // turn off the spinner
            $('body').removeClass('busy');
            $("#index_cmdLogin").prop('disabled', false);

        });

    console.log(username);
    console.log("Login cmd fired");
    //document.location.href = "landing.html";
    return true;
}