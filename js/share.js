function $(id) {
    return document.getElementById(id);
}

var Index;

function clickIndex(id) {
    Index = id;
    console.log(Index);
    window.location.href = "html/bideo-page.html?id=111";
}

function checkVideo() {
    var userid = location.search.substring(1, location.search.length);
    console.log(userid);
}