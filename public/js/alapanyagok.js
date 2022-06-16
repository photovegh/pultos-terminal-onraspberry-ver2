console.log("HELLO WORLD! alapanyagok console 😊");
var alapanyagokHTML = "";
const state = {
    alapanyagok: [],
};
getdata();
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
    var kiszereles = parseFloat(document.getElementById("kiszereles").value);
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

    //VERSION-2:
    if (sendData) {
        alert("SEND !!!");
        insertMySQL(
            nev,
            mertekegyseg,
            kiszereles,
            leltarozando,
            kritikus,
            gyujto,
            keszlet,
            beszar
        );
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
async function getdata() {
    var response = await fetch("/datareadalapanyagok");
    state.alapanyagok = await response.json();
    console.log(state.alapanyagok);
    renderAlapanyagokData();
}
async function insertMySQL(
    nev,
    mertekegyseg,
    kiszereles,
    leltarozando,
    kritikus,
    gyujto,
    keszlet,
    beszar
) {
    await fetch("/insertalapanyagok", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            nev: nev,
            mertekegyseg: mertekegyseg,
            kiszereles: kiszereles,
            leltarozando: leltarozando,
            kritikus: kritikus,
            gyujto: gyujto,
            keszlet: keszlet,
            beszar: beszar,
        }),
    });
    getdata();
    renderAlapanyagokData();
}
function renderAlapanyagokData() {
    let index = 0;
    alapanyagokHTML = "";
    for (alapanyag of state.alapanyagok) {
        alapanyagokHTML += `<tr >
        <td>${index}</td>
        <td>${alapanyag.id}</td>
        <td>${alapanyag.nev}</td>
        <td>${alapanyag.mertekegyseg}</td>
        <td>${alapanyag.kiszereles}</td>
        <td>${alapanyag.leltarozando}</td>
        <td>${alapanyag.kritikus}</td>
        <td>${alapanyag.gyujto}</td>
        <td>${alapanyag.keszlet}</td>
        <td>${alapanyag.beszar}</td>
        </tr>
        `;
        index++;
        console.log(index);
    }
    document.getElementById("alapanyagokData").innerHTML = alapanyagokHTML;
}
