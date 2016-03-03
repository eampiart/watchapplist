var apps = [];
var JSONobject;

$(document).ready(function () {
    getAppList();
});

/* ------------ Get JSON app list */

function getAppList () {
    $.getJSON('apps.json', function (response) {
        handleAppList(response);
    });
}

function handleAppList (appList) {
    JSONobject = appList;
    $.each(appList, function () {
        apps.push(this);
        console.log(this.trackName);
    });
    console.log(apps);
}
