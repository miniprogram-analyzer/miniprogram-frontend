var nightMode = false;
if (document.cookie.indexOf("nightMode=1") >= 0) {
    document.body.className += " night";
    nightMode = true;
}