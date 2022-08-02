const vissza = localStorage.getItem("adminLocal");
var trNumberDatum = new Date();
const keyboardTemplateHTML = keyboardTemplateRender();
var datum = new Date().toLocaleString();
const userLocalName = localStorage.getItem("user");
console.log(userLocalName);
document.getElementById("localStorageName").innerHTML = userLocalName;
/* localStorage "user"-t hasznalatba van, a tobbi nem !!! BUG: */
var trNumber = "";
var pultos = 2;
var lastTransactionId = -1;
var trFizetesMod = "";
var megjegyzes = "";
var kivetMegnevezes = "";
var osszegKivet = "";
var osszeg = -1;
var mindosszesenTransaction = -1;
var mindosszesenTransactionBeszar = -1;
var fizetoHitelesId = -1;
var fizetoHitelesMegjegyzes = "";
var fizetoHitelesIndex = -1;
var trFizetesMod = "";

//HACK: * renderProducts() setup * HACK:
var productItem = 0;
const tabSor = 2;
const tabOszlop = 2;
/* const tabSor = 4;
const tabOszlop = 6; */
const widthBTN = 10;
const heightBTN = 4;
//const allTabs = parseInt(productItem / (tabSor * tabOszlop));
var createTabsHTML = "";
var createContentHTML = "";
const btnBgColor = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "dark",
    "light",
];
//const termek = [];
/* for (let index = 0; index < productItem; index++) {
    termek.push(index + 1 + " termek😁");
} */
//HACK: * renderProducts() setup * HACK:

//HACK: *  * HACK:
createTrNumber();
const state = {
    termekek: [],
    pult: [],
    kosarak: [],
    kosarNevek: [],
    fullTransactionsHitel: [],
};
/* const state = {
    keszlet: [],
    csoportkategoria: [],
    xkimeres: [],
    xkimeresnev: [],
    pult: [],
    kosarak: [],
    kosarNevek: [],
    kevert: [],
    fullTransactionsHitel: [],
}; */

var productsHTML = "";
var foundPult = false;
var foundKosar = false;
var kosarbolVisszatoltott = false;
var kosarbolVisszatoltottId = -1;
var kosarMegnevezes = "*";

getdata();

/* INFO: termék //ok bekérése START INFO: */
/* TODO:TODO:TODO: GETDATA TODO:TODO:TODO: */
async function getdata() {
    /* NOTE: get gettransactions */

    /* NOTE: get gettransactionshitel */
    var id = "h";
    var response = await fetch(`/gettransactionshitel/${id}`);
    state.fullTransactionsHitel = await response.json();

    /* NOTE: get kevert */
    /* var response = await fetch("/datareadkevert");
    state.kevert = await response.json(); */ //VERSION-2:

    /* NOTE: get keszlet */
    var response = await fetch("/datareadtermekek");
    state.termekek = await response.json();

    /* NOTE: get csoport */
    /* var response = await fetch("/datareadcsoport");
    state.csoportkategoria = await response.json(); */ //VERSION-2:INFO:csoport!!!
    //VERSION-2:
    /* NOTE: get xkimeres INFO: INFO: INFO:*/
    /* var response = await fetch("/datareadxkimeres");
    state.xkimeres = await response.json(); */
    //VERSION-2:
    /* NOTE: get xkimeresnev INFO: INFO: INFO:*/
    /*  var response = await fetch("/datareadxkimeresnev");
    state.xkimeresnev = await response.json(); */

    renderProducts(); /* HACK: fv() hívás HACK: */

    /* NOTE: A button click funkciójának figyelése */
    $(document).ready(function () {
        console.log("Ezzel mi a tokom van ???🤔🤔🤔🤔🤔");
        let arrayIndex = -1;
        //let arrayIndextoggle = -1;
        let eladottElar = -1;
        let sorokNev;
        let kosarUjsorIndex = -1;
        localStorage.setItem("eladottElar", eladottElar);
        //let summa = 0;
        //let xxx = "";
        /* $(".termekButton").click(function (e) {
            console.log("pult BUTTON CLISK 😁😁 is OK");
            console.log(this.id);
            console.log(state.termekek[this.id - 1].nev);
            //console.log(e);
        }); */
        $(".termekButton").click(function (e) {
            console.log("pult BUTTON CLISK 😁😁 is OK");
            console.log("e.target.nodeName");
            console.log(e.target.nodeName);
            arrayIndex = this.id - 1;
            /* if (e.target.nodeName == "BUTTON") {
                arrayIndex = this.id - 1;
                localStorage.setItem("arrayIndex", arrayIndex);
            } */
            /* NOTE: INFO: ?? */
            /* let xButtonOrP = ""; */
            var edb = 1;

            /* xButtonOrP = e.target.nodeName; */
            /* if (state.termekek[arrayIndex].kiszereles_id == 2) {
                if (e.target.nodeName == "P") {
                    sorokKiszerelesId =
                        state.termekek[arrayIndex].kiszereles_id; //HACK:
                    arrayIndextoggle = this.id; //HACK:
                    sorokNev = state.termekek[arrayIndex].nev; //HACK:
                    sorokId = state.termekek[arrayIndex].id; //HACK:
                    eladottElar = Math.round(
                        (state.termekek[arrayIndex].elar /
                            state.termekek[arrayIndex].cl) *
                            1
                    );
                    sorokXkimeresNevNev =
                        sorokXkimeresNevId =
                        sorokXkimeresNevUrtartalom =
                        sorokEladottBeszar =
                            Math.round(
                                (state.termekek[arrayIndex].beszar /
                                    state.termekek[arrayIndex].cl) *
                                    1
                            );

                    sorokEladottElar = Math.round(
                        (state.termekek[arrayIndex].elar /
                            state.termekek[arrayIndex].cl) *
                            1
                    );
                    datum = theTime();
                    state.pult.push({
                        id: sorokId,
                        nev: sorokNev,
                        kiszerelesId: sorokKiszerelesId,
                        xkimeresnevnev: sorokXkimeresNevNev,
                        xkimeresnevid: sorokXkimeresNevId,
                        xkimeresnevurtartalom: sorokXkimeresNevUrtartalom,
                        db: edb,
                        cl: sorokXkimeresNevUrtartalom,
                        sumcl: state.termekek[arrayIndex].sumcl,
                        eladottbeszar: sorokEladottBeszar,
                        eladottelar: sorokEladottElar,
                        fizetesmod: "k",
                        transactionnumber: 7,
                        megjegyzes: "megjegyzes",
                        datum: datum,
                    });
                    kosarUjsorIndex = state.pult.length - 1;
                    termekKeszletModositas(
                        state.pult[kosarUjsorIndex],
                        "minus"
                    );
                    renderPult();
                }
            } else { */ //VERSION-2:
            eladottElar = state.termekek[arrayIndex].elar;
            sorokNev = state.termekek[arrayIndex].nev; //HACK:
            sorokId = state.termekek[arrayIndex].id; //HACK:
            sorokKiszerelesId = state.termekek[arrayIndex].kiszereles_id; //HACK:

            sorokEladottBeszar = state.termekek[arrayIndex].beszar;

            sorokEladottElar = state.termekek[arrayIndex].elar;
            datum = theTime();
            state.pult.push({
                id: sorokId,
                nev: sorokNev,
                kiszerelesId: sorokKiszerelesId,
                xkimeresnevnev: " ",
                xkimeresnevid: -1,
                xkimeresnevurtartalom: " ",
                db: edb,
                cl: state.termekek[arrayIndex].cl,
                sumcl: state.termekek[arrayIndex].sumcl,
                eladottbeszar: sorokEladottBeszar,
                eladottelar: sorokEladottElar,
                fizetesmod: "c",
                transactionnumber: 21,
                megjegyzes: "info",
                datum: datum,
            });

            console.log(state.pult);

            kosarUjsorIndex = state.pult.length - 1;
            termekKeszletModositas(state.pult[kosarUjsorIndex], "minus");
            renderPult();
            /* } */ //VERSION-2:
            /* HACK: now */
            /* document.getElementById("csoportnevKijelzo").innerHTML =
                state.csoportkategoria[
                    state.termekek[arrayIndex].csoport_id - 1
                ].nev; */
        });
    });
}

/* TODO:TODO:TODO: RENDERPRODUCT TODO:TODO:TODO: */
/* HACK: termék button-ok felrajzolása STAR HACK: */
function renderProducts() {
    console.log("pult renderProducts 😛😛😁 is OK");
    /*     for (const csoport of state.csoportkategoria) {
        productsHTML += `<p class="bg-dark text-white mb-0 ">${csoport.nev}</p>`;
        let vIndex = 0;
        //HACK: *  * HACK:
        for (const product of state.termekek) {
            var i = 0;
            if (csoport.id == product.csoport_id) {
                if (state.termekek[vIndex].kiszereles_id == 2) {
                    var productsHTMLxkimeresnev = "";
                    for (let vKimeres of state.xkimeres) {
                        if (vKimeres.termek_id == product.id) {
                            let xxx = parseInt(vKimeres.xkimeresnev_id - 1);
                            productsHTMLxkimeresnev += `<p class="dropdown-item" id = ${xxx}>${state.xkimeresnev[xxx].nev}</p>`;
                        }
                    }
                    i++;
                    productsHTML += `<div class="btn-group "> <div class="dropdown">
                    <button type="button" class="btn btn-primary dropdown-toggle m-1" data-toggle="dropdown" id = ${vIndex}>
                    ${product.nev}
                    </button>
                    <div class="dropdown-menu">
                      <p class="dropdown-item" >${productsHTMLxkimeresnev}</p>
                      
                    </div>
                  </div></div>`;
                } else {
                    productsHTML += `<button type='button' class='btn btn-danger  m-1 btnKeszlet' id = ${vIndex}>${product.nev}</button>`;
                }
            }
            vIndex++;
        }
        //HACK: *  * HACK:
        productsHTML += `<br>`;
    } */
    productItem = state.termekek.length;
    var allTabs = parseInt(productItem / (tabSor * tabOszlop));
    /* console.log(productItem);
    console.log(state.termekek); */
    console.log(state.termekek);
    renderPult();
    $(document).ready(function () {
        $(".nav-tabs a").click(function () {
            $(this).tab("show");
        });
    });
    function renderPult() {
        console.log("pult renderPult 😎😂😎 is OK");
        var contentIndex = 0;
        var actualContentIndex = 0;
        for (let tabIndex = 0; tabIndex <= allTabs; tabIndex++) {
            /* console.log("tabIndex");
            console.log(tabIndex);
            console.log("allTabs");
            console.log(allTabs); */
            createTabsHTML += `<li class="nav-item">
            <a class="nav-link ${
                tabIndex == 0 ? "active" : ""
            }" href="#menu${tabIndex}">${tabIndex + 1} oldal</a>
        </li>`;
        }
        document.getElementById("createTabs").innerHTML = createTabsHTML;
        for (let tabIndex = 0; tabIndex <= allTabs; tabIndex++) {
            createContentHTML += `<div id="menu${tabIndex}" class="container tab-pane ${
                tabIndex == 0 ? "active" : "fade"
            }"><br>
            `;
            contentIndex < productItem - tabSor * tabOszlop
                ? (actualContentIndex = tabSor * tabOszlop)
                : (actualContentIndex = productItem - contentIndex);
            /* for (let index = 0; index < actualContentIndex; index++) {
                createContentHTML += `<button type="button" class=" m-3 btn btn-${
                    tabIndex % 2 == 0 ? "primary" : "secondary"
                }" style="width: ${widthBTN}em; height: ${heightBTN}em; font-size: 125%">${
                    termek[contentIndex + index]
                }</button>`;
            } */
            for (let index = 0; index < actualContentIndex; index++) {
                /* console.log(
                    btnBgColor[state.termekek[contentIndex + index].csoport_id]
                ); */
                createContentHTML += `<button type="button" class=" m-3 btn btn-${
                    btnBgColor[state.termekek[contentIndex + index].btncolor]
                } termekButton" style="width: ${widthBTN}em; height: ${heightBTN}em; font-size: 125%" id = ${
                    state.termekek[contentIndex + index].id
                }>${state.termekek[contentIndex + index].nev}</button>`;
                //console.log(state.termekek[contentIndex + index].nev);
                /* console.log("contentIndex");
                console.log(contentIndex); */
                /* console.log("id");
                console.log(state.termekek[contentIndex + index].id); */
                /* console.log("index");
                console.log(index); */
            }
            contentIndex = contentIndex + tabSor * tabOszlop;
            createContentHTML += `</div>`;
        }
        document.getElementById("createContent").innerHTML = createContentHTML;
    }
    //HACK: *  * HACK:
    /* document.getElementById("termek").innerHTML = productsHTML; */
    //HACK: *  * HACK:
}

/* TODO:TODO:TODO: RENDERPULT TODO:TODO:TODO: */
function renderPult() {
    //FIXME: FIXME: FIXME:
    var tetelSorokHTML = "";
    var mindosszesen = 0;
    //var mindosszesenElar = 0;
    var mindosszesenBeszar = 0;
    var tombIndex = 0;
    for (var sorok of state.pult) {
        tetelSorokHTML += `
        <div class="card">
        <div class="font-weight-bold">
            ${sorok.nev} ${sorok.xkimeresnevnev} : <span>${
            sorok.eladottelar
        }</span>
        </div>
        <div>
            <button class="btn mr-4 btn-danger delete-db" id = ${tombIndex}>del</button>   <button class="btn mr-3 btn-warning remove-db" id = ${tombIndex}>-</button>   ${
            sorok.db
        }    <button class="btn ml-3 btn-success insert-db" id = ${tombIndex}>+</button>   <span class="font-weight-bold">${
            sorok.eladottelar * sorok.db
        }</span>
        </div>
    </div>
        `;
        tombIndex++;
        mindosszesen += sorok.eladottelar * sorok.db;
        mindosszesenBeszar += sorok.eladottbeszar * sorok.db;
    }
    document.getElementById("pult").innerHTML = tetelSorokHTML;
    document.getElementById("summa").innerHTML = mindosszesen;
    mindosszesenTransaction = mindosszesen;
    mindosszesenTransactionBeszar = mindosszesenBeszar;
    $(".insert-db").click(function (event) {
        //HACK:HACK:HACK:HACK:HACK:
        let pultTombIndex = this.id;
        state.pult[pultTombIndex].db++;
        termekKeszletModositas(state.pult[pultTombIndex], "minus");
        renderPult();
        //HACK:HACK:HACK:HACK:HACK:
    });
    $(".remove-db").click(function (event) {
        let pultTombIndex = this.id;
        state.pult[pultTombIndex].db--;
        termekKeszletModositas(state.pult[pultTombIndex], "plus");
        renderPult();
    });
    $(".delete-db").click(function (event) {
        let pultTombIndex = this.id;
        termekKeszletModositas(state.pult[pultTombIndex], "reset");
        state.pult.splice(pultTombIndex, 1);
        renderPult();
    });
    foundPult = tetelSorokHTML == "" ? false : true;
}

/* TODO:TODO:TODO: TERMEK KESZLET MODOSITAS TODO:TODO:TODO: */
function termekKeszletModositas(sendData, muvelet) {
    if (sendData.kiszerelesId == 1) {
        //for (let index = 0; index < state.kevert.length; index++) {
        //  if (sendData.id == state.kevert[index].termek_id) {
        //    for (let i = 0; i < state.termekek.length; i++) {
        /* if (state.kevert[index].adalek_id == state.termekek[i].id) {
                        for (let ii = 0; ii < state.xkimeresnev.length; ii++) {
                            if (
                                state.kevert[index].xkimeresnev_id ==
                                state.xkimeresnev[ii].id
                            ) {
                                if (muvelet == "minus") {
                                    state.termekek[i].sumcl =
                                        state.termekek[i].sumcl -
                                        state.xkimeresnev[ii].urtartalom;
                                }
                                if (muvelet == "plus") {
                                    state.termekek[i].sumcl =
                                        state.termekek[i].sumcl +
                                        state.xkimeresnev[ii].urtartalom;
                                }
                                if (muvelet == "reset") {
                                    state.termekek[i].sumcl =
                                        state.termekek[i].sumcl +
                                        state.xkimeresnev[ii].urtartalom *
                                            sendData.db;
                                }
                                tarolj(
                                    state.termekek[i].id,
                                    state.termekek[i].sumcl
                                );
                            }
                        }
                    } */
        //     }
        //   }
        // }
    } else {
        if (muvelet == "minus") {
            sendData.sumcl = sendData.sumcl - sendData.cl;
        }
        if (muvelet == "plus") {
            sendData.sumcl = sendData.sumcl + sendData.cl;
        }
        if (muvelet == "reset") {
            sendData.sumcl = sendData.sumcl + sendData.cl * sendData.db;
        }
        tarolj(sendData.id, sendData.sumcl);
    }
}

/* TODO:TODO:TODO: TAROLJ TODO:TODO:TODO: */
function tarolj(id, sumcl) {
    try {
        updateMySQL();
    } catch (e) {}
    async function updateMySQL() {
        const response = await fetch("/keszletmodositas/", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id: id, sumcl: sumcl }),
        });
    }
}

/* TODO:TODO:TODO: UJ KOSARBA TESSZUK TODO:TODO:TODO: */
//FIXME: FIXME: FIXME:
function naTegyukEgyUjKosarba() {
    if (foundPult) {
        if (kosarbolVisszatoltott) {
            state.kosarak[kosarbolVisszatoltottId] = state.pult;
            state.pult = [];
            renderPult();
            kosarbolVisszatoltott = false;
            kosarbolVisszatoltottId = -1;
        } else {
            document.querySelector("#kosarMegnevezesId").value = "";
            kosarMegnevezes = "";
            $("#kosarMegnevezesModal").modal();
            //FIXME:
            document.getElementById("keyboardTemplateKosar").innerHTML =
                keyboardTemplateHTML;
            //FIXME:
            $(".keyboard").off("click");
            $(".keyboard").on("click", function () {
                inputKey = "";
                inputKey = this.id;
                inputKey = this.value;
                kosarMegnevezes += inputKey;
                document.querySelector("#kosarMegnevezesId").value =
                    kosarMegnevezes;
            });
        }
    }
    //BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
    foundKosar = state.kosarak.length > 0 ? true : false;
}
//FIXME: FIXME: FIXME:

/* TODO:TODO:TODO: KOSAR NEVET KAP ES TAROL TODO:TODO:TODO: */
function kosarNevSzerintiTarolas() {
    state.kosarak.push(state.pult);
    state.kosarNevek.push({
        kosarMegnevezes: kosarMegnevezes,
        kosarMegnevezesIndex: state.kosarak.length,
    });

    state.pult = [];
    renderPult();
    //$(".keyboard").off("click");
}

/* TODO:TODO:TODO: KILEPES TODO:TODO:TODO: */
$(".kilepes").click(function () {
    if (state.kosarak > "" || state.pult > "") {
        alert("Előbb a kosarakat és a pultot üríteni kell !!!");
    } else {
        /* INFO:HACK:HACK:HACK: modosit HACK:HACK:HACK:INFO: */
        //window.location.href = "http://localhost:7777";
        //window.location.href = "http://photovegh.synology.me:7777/";
        window.location.href = "/";
        /* INFO:HACK:HACK:HACK: modosit HACK:HACK:HACK:INFO: */
    }
});

/* TODO:TODO:TODO: KOSARAK TODO:TODO:TODO: */
$(".kosarak").click(function () {
    if (foundPult) {
        alert(
            "Előbb a pulton lévő termékeket vagy fizettesd ki, vagy tedd a kosárba, de a pultnak üresnek kell lenni, hogy visszatölts egy kosarat!"
        );
    } else {
        foundKosar = state.kosarak.length > 0 ? true : false;
        if (foundKosar) {
            $("#kosarakModal").modal();
            var kosarSorokHTML = "";
            for (let index = 0; index < state.kosarak.length; index++) {
                kosarSorokHTML += `<button type="button" class="btn btn-info m-2 zzzzz zizitoast" id=${index}> ${state.kosarNevek[index].kosarMegnevezes} - ${state.kosarNevek[index].kosarMegnevezesIndex}</button><br>`;
                /* INFO:INFO:INFO:INFO: itt van a kosarnev INFO:INFO:INFO:INFO: */
                /* INFO:INFO:INFO:INFO: meg a kosarindex   INFO:INFO:INFO:INFO: */
            }

            document.getElementById("kosarakFelsorolasa").innerHTML =
                kosarSorokHTML;

            /* TODO:TODO:TODO: KOSAR KLIKK FIGYELES TODO:TODO:TODO: */
            $(".zzzzz").click(function () {
                if (state.kosarak[this.id].length == 0) {
                    alert("Ezt most törlöm mert üres kosár!");
                    state.kosarak.splice(this.id, 1);
                    state.kosarNevek.splice(this.id, 1);
                    kosarbolVisszatoltott = false;
                    foundKosar = state.kosarak.length > 0 ? true : false;
                    $("#kosarakModal .close").click();
                } else {
                    kosarbolVisszatoltott = true;
                    kosarbolVisszatoltottId = this.id;
                    state.pult = state.kosarak[this.id];
                    $("#kosarakModal .close").click();
                }
                //BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
                foundKosar = state.kosarak.length > 0 ? true : false;
                renderPult();
            });
        }
    }
    foundKosar = state.kosarak.length > 0 ? true : false;
});

/* TODO:TODO:TODO: TR KP TODO:TODO:TODO: */
function trKp() {
    console.log("trKp() is OK");
    let trFizetesMod = "k";
    trNumber = createTrNumber();
    let megjegyzes = "*";
    createTranactionData(
        trNumber,
        trFizetesMod,
        megjegyzes,
        mindosszesenTransaction,
        mindosszesenTransactionBeszar
    );
    if (mindosszesenTransaction > 0) {
        visszajaro();
    }
}

function visszajaro() {
    $("#visszajaroModal").modal();
    let cimletek = [500, 1000, 2000, 5000, 10000, 20000];
    let visszajaroCimlet = "";
    for (cimlet of cimletek) {
        if (mindosszesenTransaction < cimlet) {
            visszajaroCimlet += `<h4><kbd>${cimlet}</kbd> cimletből visszajár: <span class="font-weight-bold"> ${
                cimlet - mindosszesenTransaction
            },- </span> Ft</h4>`;
        }
    }

    document.getElementById("cimletFelsorolas").innerHTML = visszajaroCimlet;
}

/* TODO:TODO:TODO: TR KP 2 😁 TODO:TODO:TODO: */
function trKp2() {
    let trFizetesMod = "m";
    trNumber = createTrNumber();
    let megjegyzes = "*";
    createTranactionData(
        trNumber,
        trFizetesMod,
        megjegyzes,
        mindosszesenTransaction,
        mindosszesenTransactionBeszar
    );
    if (mindosszesenTransaction > 0) {
        visszajaro();
    }
}
/* TODO:TODO:TODO: TR CARD TODO:TODO:TODO: */
function trCard() {
    let trFizetesMod = "c";
    trNumber = createTrNumber();
    let megjegyzes = "+";
    createTranactionData(
        trNumber,
        trFizetesMod,
        megjegyzes,
        mindosszesenTransaction,
        mindosszesenTransactionBeszar
    );
    //mindosszesenTransaction = -1
}
//BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
/* TODO:TODO:TODO: TR HITEL TODO:TODO:TODO: */
function nevesitettHitel() {
    trFizetesMod = "h";
    trNumber = createTrNumber();
    megjegyzes = "";

    document.querySelector("#hitelMegnevezesId").value = "";
    hitelMegnevezes = "";

    if (kosarbolVisszatoltott) {
        megjegyzes = state.kosarNevek[kosarbolVisszatoltottId].kosarMegnevezes;
        trHitel();
    } else {
        if (foundPult) {
            $("#hitelMegnevezesModal").modal();
            //FIXME:
            document.getElementById("keyboardTemplateHitel").innerHTML =
                keyboardTemplateHTML;
            //FIXME:
            $(".keyboard").off("click");
            $(".keyboard").on("click", function () {
                inputKey = "";
                inputKey = this.id;
                inputKey = this.value;
                hitelMegnevezes += inputKey;
                document.querySelector("#hitelMegnevezesId").value =
                    hitelMegnevezes;
                megjegyzes = hitelMegnevezes;
            });
        }
    }
}
//BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
function trHitel() {
    createTranactionData(
        trNumber,
        trFizetesMod,
        megjegyzes,
        mindosszesenTransaction,
        mindosszesenTransactionBeszar
    );
    //$(".keyboard").off("click");
}

/* TODO:TODO:TODO: TRANSACTIONS TODO:TODO:TODO: */
function createTranactionData(
    trNumber,
    trFizetesMod,
    megjegyzes,
    osszeg,
    ossegBeszar
) {
    try {
        updateMySQL();
        updateLastId();
    } catch (e) {}
    async function updateMySQL() {
        datum = theTime();
        const response = await fetch("/inserttransactions/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                trnumber: trNumber,
                trdate: datum,
                trfizetesmod: trFizetesMod,
                megjegyzes: megjegyzes,
                pultos: pultos,
                kibeosszeg: osszeg,
                kibeosszegbeszar: ossegBeszar,
            }),
        });
        /* HACK:HACK:HACK:HACK:HACK: Hmmm... */
        renderGetdata();
        hitelStateRender();
    }
    async function updateLastId() {
        var response = await fetch("/lasttransactionid");
        lastTransactionId = await response.json();
        lastTransactionId = lastTransactionId[0]["max(id)"];
        for (let pultItem of state.pult) {
            insertForgalomData(
                lastTransactionId,
                pultItem.id,
                pultItem.db,
                pultItem.eladottbeszar,
                pultItem.eladottelar,
                pultItem.datum,
                pultItem.xkimeresnevid
            );
        }
    }
}

/* TODO:TODO:TODO: FORGALOM TODO:TODO:TODO: */
function trKivet() {
    osszeg = osszeg * -1;
    alert("Irány levonni a forgalomból ...");
    //FIXME:
    let trFizetesMod = "b";
    trNumber = createTrNumber();
    let megjegyzes = kivet;
    let trKivetNincsBeszar = 0;
    createTranactionData(
        trNumber,
        trFizetesMod,
        megjegyzes,
        osszeg,
        trKivetNincsBeszar
    );
}

/* TODO:TODO:TODO: FORGALOM TODO:TODO:TODO: */
async function insertForgalomData(
    lastTransactionId,
    id,
    db,
    eladottbeszar,
    eladottelar,
    xDatum,
    xkimeresnevid
) {
    const response = await fetch("/insertforgalom/", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            transaction_id: lastTransactionId,
            termekid: id,
            db: db,
            eladottbeszar: eladottbeszar,
            eladottelar: eladottelar,
            eladottdate: xDatum,
            xkimeresnevid: xkimeresnevid,
        }),
    });
    //INFO:INFO:INFO: leellenorizni !!!!!!! INFO:INFO:INFO:
    foundPult = false;
    if (kosarbolVisszatoltott) {
        kosarbolVisszatoltott = false;
        state.kosarak.splice(kosarbolVisszatoltottId, 1);
        state.kosarNevek.splice(kosarbolVisszatoltottId, 1);
        kosarbolVisszatoltottId = -1;
    }
    if (foundKosar.length == 0) {
        foundKosar = false;
    }
    state.pult = [];
    renderPult();
    //INFO:INFO:INFO: leellenorizni !!!!!!! INFO:INFO:INFO:
}

/* TODO:TODO:TODO: KP KIVET TODO:TODO:TODO: */
$(".kpKivet").click(function () {
    //$("#myModalKivet").modal();
    $("#kivetMegnevezesModal").modal();
    //FIXME:
    document.getElementById("keyboardTemplateKivet").innerHTML =
        keyboardTemplateHTML;
    //FIXME:
    $(".keyboard").off("click");
    document.querySelector("#kivetMegnevezesId").value = "";
    $(".keyboard").on("click", function () {
        inputKey = "";
        inputKey = this.id;
        inputKey = this.value;
        kivetMegnevezes += inputKey;
        document.querySelector("#kivetMegnevezesId").value = kivetMegnevezes;
        kivet = kivetMegnevezes;
    });
});

function kivetOsszegNumber() {
    $("#osszegModal").modal();
    $(".calc").off("click");
    document.querySelector("#osszegKivetId").value = "";
    $(".calc").on("click", function () {
        inputKey = "";
        inputKey = this.id;
        inputKey = this.value;
        osszegKivet += inputKey;
        document.querySelector("#osszegKivetId").value = osszegKivet;
        osszeg = parseInt(osszegKivet);
    });
    osszegKivet = "";
}

let datumHTML = datum;
document.getElementById("datum").innerHTML = datumHTML;

/* TODO:TODO:TODO: CREATE TR NUMBER TODO:TODO:TODO: */
function createTrNumber() {
    trNumberDatum = new Date();
    trNumber =
        trNumberDatum.getFullYear() +
        "." +
        (trNumberDatum.getMonth() + 1) +
        "." +
        trNumberDatum.getDate() +
        "." +
        trNumberDatum.getHours() +
        "." +
        trNumberDatum.getMinutes() +
        "." +
        trNumberDatum.getSeconds() +
        "." +
        trNumberDatum.getMilliseconds();
    return trNumber;
}
/* TODO:TODO:TODO: theTime TODO:TODO:TODO: */
function theTime() {
    var xDatum = new Date().toLocaleString();
    return xDatum;
}

/* TODO:TODO:TODO: HITELRENDEZES MOD TODO:TODO:TODO: */
function hitelFizetesKp() {
    let id = fizetoHitelesId;
    trFizetesMod = "k";
    let hitelTrDatum = new Date().toLocaleString();
    let megjegyzes =
        "x " + fizetoHitelesMegjegyzes + " rendezve: " + hitelTrDatum;
    modifyTranactionData(id, trFizetesMod, megjegyzes);
    state.fullTransactionsHitel[fizetoHitelesIndex].trFizetesMod = trFizetesMod;
    state.fullTransactionsHitel.splice(fizetoHitelesIndex, 1);
    fizetoHitelesId = -1;
    fizetoHitelesMegjegyzes = "";
    fizetoHitelesIndex = -1;
    trFizetesMod = "";
}
function hitelFizetesCard() {
    let id = fizetoHitelesId;
    trFizetesMod = "c";
    let hitelTrDatum = new Date().toLocaleString();
    let megjegyzes =
        "x " + fizetoHitelesMegjegyzes + " rendezve: " + hitelTrDatum;
    modifyTranactionData(id, trFizetesMod, megjegyzes);
    state.fullTransactionsHitel[fizetoHitelesIndex].trFizetesMod = trFizetesMod;
    state.fullTransactionsHitel.splice(fizetoHitelesIndex, 1);
    fizetoHitelesId = -1;
    fizetoHitelesMegjegyzes = "";
    fizetoHitelesIndex = -1;
    trFizetesMod = "";
}
/* TODO:TODO:TODO: HITELRENDEZESTRANSACTION TODO:TODO:TODO: */
function modifyTranactionData(id, trFizetesMod, megjegyzes) {
    try {
        updateMySQL();
    } catch (e) {}
    async function updateMySQL() {
        //datum = theTime();
        const response = await fetch("/modifytransactions/", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                trfizetesmod: trFizetesMod,
                megjegyzes: megjegyzes,
            }),
        });
        /* HACK:HACK:HACK:HACK:HACK: Hmmm... */
        renderGetdata();
        hitelStateRender();
    }
}

function fullTransactionsHitel() {
    let hitelListHTML = "";
    $("#hitelRendezesModal").modal();
    hitelListHTML = hitelStateRender();

    document.getElementById("hitelList").innerHTML = hitelListHTML;
    $(".hitelListRendez").off("click");

    //document.querySelector("#osszegKivetId").value = "";
    $(".hitelListRendez").on("click", function (e) {
        fizetoHitelesId = this.id;
        fizetoHitelesMegjegyzes = e.target.dataset.megjegyzes;
        fizetoHitelesIndex = e.target.dataset.index;
        $("#hitelRendezesModal .close").click();
        $("#fizetoHitelesModModal").modal();
    });
}
function hitelStateRender() {
    let hitelListHTML = "";
    let index = 0;
    for (hitel of state.fullTransactionsHitel) {
        hitelListHTML += `<h5 class='card hitelListRendez' data-megjegyzes=${hitel.megjegyzes} data-index=${index} id='${hitel.id}'>${hitel.megjegyzes} összeg: ${hitel.kibeosszeg} * ${hitel.id}</h5>`;
        index++;
    }
    return hitelListHTML;
}

window.onload = renderPult();

//INFO: * keyboardTemplateRender * INFO:
function keyboardTemplateRender() {
    return `
    <div class="vKeyboard-container d-flex row">

                            <div class=" vKeyboard-letters " id="vKeyboard-letters">
                                <div class="row vKeyboardRow vKeyboard-offsetRow1 justify-content-center m-1">
                                <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                id="keyboard-Q" value="Q">Q</button>
                                <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                id="keyboard-W" value="W">W</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-E" value="E">E</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-R" value="R">R</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-T" value="T">T</button>
                                        <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-Z" value="Z">Z</button>
                                    
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-U" value="U">U</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-I" value="I">I</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-O" value="O">O</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-P" value="P">P</button>
                                </div>
                                <div class="row vKeyboardRow vKeyboard-offsetRow2 justify-content-center">
                                <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-A" value="A">A</button>
                                    
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-S" value="S">S</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-D" value="D">D</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-F" value="F">F</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-G" value="G">G</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-H" value="H">H</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-J" value="J">J</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-K" value="K">K</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-L" value="L">L</button>
                                    
                                </div>
                                <div class="row vKeyboardRow vKeyboard-offsetRow3 justify-content-center">
                                <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-Y" value="Y">Y</button>
                                    
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-X" value="X">X</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-C" value="C">C</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-V" value="V">V</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-B" value="B">B</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-N" value="N">N</button>
                                        <button type="button col" class="btn keyboard btn-primary vKeyboard-letter m-1"
                                        id="keyboard-M" value="M">M</button>
                                    <span class="vKeyboard-spacer"></span>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-symbol m-1"
                                        id="keyboard-tiret" value="-">-</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-symbol m-1"
                                        id="keyboard-underscore" value="_">_</button>
                                    <button type="button col" class="btn keyboard btn-primary vKeyboard-symbol m-1"
                                        id="keyboard-@" value="@">@</button>
                                </div>
                                <div class="row vKeyboardRow justify-content-center">
                                    
                                    <button type="button col"
                                        class="btn keyboard btn-primary vKeyboard-symbol vKeyboard-space"
                                        id="keyboard-space" value=".">
                                        <span class="vKeyboard-space-character">┗━━━━━━━━━━━┛</span>
                                    </button>
                                </div>
                            </div>

                        </div>
    `;
}

/* INFO: másodlagos STATE bekérés INFO: */
/* TODO:TODO:TODO: RENDER GETDATA TODO:TODO:TODO: */
async function renderGetdata() {
    /* NOTE: get gettransactionshitel RENDER*/
    var id = "h";
    var response = await fetch(`/gettransactionshitel/${id}`);
    //var response = await fetch("/gettransactionshitel");
    state.fullTransactionsHitel = await response.json();
}
