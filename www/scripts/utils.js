function formatCurrency(val, ccy) {
    var lcl;
    if (ccy == "INR") { lcl = "en-IN"; } else { lcl = "en-US"; }

    var formatter = new Intl.NumberFormat(lcl, {
        style: 'currency',
        currency: ccy,

        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(val);
}


function getWorkOrder(woId) {
    var aList = JSON.parse(sessionStorage.getItem("woList"));
    for (var a in aList) {

        if (aList[a].wo_id == woId) return aList[a];
    }

    return null;
}

function getJob(jobId) {
    var aList = JSON.parse(sessionStorage.getItem("jobList"));
    for (var a in aList) {

        if (aList[a].job_id == jobId) return aList[a];
    }

    return null;
}