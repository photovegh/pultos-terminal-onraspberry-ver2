console.log("HELLO WORLD! alapanyagok console 😊");
var alapanyagokHTML = "";
const state = {
    alapanyagok: [],
};
getdata();
var sendData = true;
var newData = true;
var id = -1;
var keresValue = "";

document.addEventListener("keypress", function (e) {
    console.log(e.keyCode);
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        keresValue = document.querySelector("#nevSzukit").value;
        renderAlapanyagokData();
        //productsButtonRender();
        return false;
    }
});

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
    var keszletsum = keszlet * kiszereles;

    //VERSION-2:
    if (sendData) {
        alert(
            "SEND !!! -> newData: " + newData + " Nev: " + nev + " Id: " + id
        );
        if (newData) {
            insertMySQL(
                nev,
                mertekegyseg,
                kiszereles,
                leltarozando,
                kritikus,
                gyujto,
                keszlet,
                beszar,
                keszletsum
            );
            sendData = true;
            document.getElementById("newAlapanyag").reset();
        } else {
            console.log("A jo ored data update 😋");
            console.log(id);
            console.log(nev);
            console.log(mertekegyseg);
            console.log(kiszereles);
            console.log(leltarozando);
            console.log(kritikus);
            console.log(gyujto);
            console.log(keszlet);
            console.log(beszar);
            console.log(keszletsum);
            updateMySQL(
                id,
                nev,
                mertekegyseg,
                kiszereles,
                leltarozando,
                kritikus,
                gyujto,
                keszlet,
                beszar,
                keszletsum
            );
            newData = true;
            sendData = true;
            document.getElementById("newAlapanyag").reset();
        }
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
    beszar,
    keszletsum
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
            keszletsum: keszletsum,
        }),
    });
    getdata();
    renderAlapanyagokData();
}
//VERSION-2:
async function updateMySQL(
    id,
    nev,
    mertekegyseg,
    kiszereles,
    leltarozando,
    kritikus,
    gyujto,
    keszlet,
    beszar,
    keszletsum
) {
    //id = origId;

    const response = await fetch("/updatealapanyagok/", {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            nev: nev,
            mertekegyseg: mertekegyseg,
            kiszereles: kiszereles,
            leltarozando: leltarozando,
            kritikus: kritikus,
            gyujto: gyujto,
            keszlet: keszlet,
            beszar: beszar,
            keszletsum: keszletsum,
        }),
    });
    console.log(response);
    /* let arrowIndex = -1;
    for (let i = 0; i < state.termekek.length; i++) {
        if (state.termekek[i].id == id) {
            arrowIndex = i;
        }
    }
    state.termekek[arrowIndex].nev = nev;
    state.termekek[arrowIndex].beszar = beszar;
    state.termekek[arrowIndex].elar = elar;
    state.termekek[arrowIndex].leltarozando = leltarozando;
    state.termekek[arrowIndex].kritikus = kritikus;
    state.termekek[arrowIndex].gyujto = gyujto;
    rendertermekek(); */
    getdata();
    renderAlapanyagokData();
}
//VERSION-2:
function renderAlapanyagokData() {
    let index = 0;
    alapanyagokHTML = "";
    for (alapanyag of state.alapanyagok) {
        if (alapanyag.nev.toLowerCase().search(keresValue.toLowerCase()) >= 0) {
            /* productsAreaHTML += `<button type="button" class="btn btn-primary m-2 p-2 productsButton" id=${alapanyag.id} data-nev=${alapanyag.nev}>${alapanyag.nev} - ${alapanyag.id}</button>`; */
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
        <td><button class="updateBtn" data-index=${index} id=${alapanyag.id}>Edit</td>
        </tr>
        `;
        }

        index++;
    }
    document.getElementById("alapanyagokData").innerHTML = alapanyagokHTML;
    $(".updateBtn").click(function (e) {
        let clickIndex = e.target.dataset.index;
        id = this.id;
        console.log("updateBtn is OK");
        console.log(this.id);
        console.log(clickIndex);
        newData = false;
        /* document.getElementById("id").value =
            state.alapanyagok[clickIndex].id; */
        document.getElementById("nev").value =
            state.alapanyagok[clickIndex].nev;
        document.getElementById("mertekegyseg").value =
            state.alapanyagok[clickIndex].mertekegyseg;
        document.getElementById("kiszereles").value =
            state.alapanyagok[clickIndex].kiszereles;
        document.getElementById("leltarozando").value =
            state.alapanyagok[clickIndex].leltarozando;
        document.getElementById("kritikus").value =
            state.alapanyagok[clickIndex].kritikus;
        document.getElementById("gyujto").value =
            state.alapanyagok[clickIndex].gyujto;
        document.getElementById("keszlet").value =
            state.alapanyagok[clickIndex].keszlet;
        document.getElementById("beszar").value =
            state.alapanyagok[clickIndex].beszar;
        document.getElementById("nev").focus();
    });
}
const szukitBtn = document.querySelector("#szukit-btn");
szukitBtn.onclick = function () {
    keresValue = document.querySelector("#nevSzukit").value;
    renderAlapanyagokData();
    //productsButtonRender();
};
