$(document).ready(function() {
    console.log("security page ready!");

    var auth = JSON.parse(sessionStorage.getItem("auth"));
    var license = JSON.parse(sessionStorage.getItem("license"));

    setTimeout(function() {

        $("#DisplayName").text(auth.DisplayName);
        $("#Email").text(auth.Email);
        $("#RoleList").text(auth.RoleList);
        $("#Username").text(auth.Username);
        $("#customer_name").text(license.customer_name);
        $("#serverroot").text(license.serverroot);
        if (auth.isSuperUser) {
            $("#SuperUser").html('<a href="#" class="chip chip-small bg-gray-light"><i class="fa fa-check bg-green-dark"></i><strong class="color-black font-400">Yes</strong></a>');
        } else {
            $("#SuperUser").html('<a href="#" class="chip chip-small bg-gray-light"><i class="fa fa-check bg-red-dark"></i><strong class="color-black font-400">No</strong></a>');
        }
    }, 1);


});