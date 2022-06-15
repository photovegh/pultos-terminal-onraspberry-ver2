console.log("HELLO WORLD! alapanyagok console 😊");
var sendData = true;
function newAlapanyag() {
    var nev = document.getElementById("nev").value;
    if (nev == "") {
        alert("NÉV kitöltése kötelező!");
        sendData = false;
    }
    var mertekegyseg = document.getElementById("mertekegyseg").value;
    if (mertekegyseg == "darab") {
        document.getElementById("kiszereles").value = 1;
    }
    if (mertekegyseg == "") {
        alert("******* kitöltése kötelező!");
        sendData = false;
    }
    var kiszereles = document.getElementById("kiszereles").value;
    if (mertekegyseg == "darab") {
        kiszereles = 1;
        sendData = true;
    }
    if (kiszereles == "") {
        alert("KISZERELÉS kitöltése kötelező!");
        sendData = false;
    }
    if (kiszereles !== "") {
        sendData = true;
    }
    var leltarozando = parseInt(document.getElementById("leltarozando").value);
    var kritikus = parseInt(document.getElementById("kritikus").value);
    var gyujto = parseInt(document.getElementById("gyujto").value);
    var keszlet = parseInt(document.getElementById("keszlet").value);
    var beszar = parseInt(document.getElementById("beszar").value);
    console.log("HELLO WORLD! alapanyagok FUNCTION console 😊");
    console.log(nev);
    console.log(mertekegyseg);
    console.log(kiszereles);
    console.log(leltarozando);
    console.log(kritikus);
    console.log(gyujto);
    console.log(keszlet);
    console.log(beszar);

    //VERSION-2:
    if (sendData) {
        alert("SEND !!!");
        sendData = true;
        document.getElementById("newAlapanyag").reset();
    }
    //VERSION-2:
}
function darabValue() {
    if (document.getElementById("mertekegyseg").value == "darab") {
        document.getElementById("kiszereles").value = 1;
        sendData = true;
    }
}
