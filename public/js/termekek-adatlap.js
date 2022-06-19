const state = {
    termekek: [],
    alapanyagok: [],
    osszetevok: [],
};
const selectColor = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "dark",
    "light",
];
const selectName = [
    "KÉK",
    "SZÜRKE",
    "ZÖLD",
    "SÁRGA",
    "PIROS",
    "FEKETE",
    "FEHÉR",
];
var productsHTML = "";
var productsHTMLdrop = "";
var xid = 1;
var newBtncolor = -1;
var origNev = "";
var origElar = 0;
var origBtncolor = -1;
var origId = 0;
var osszetevoAlapanyagId = -1;
var osszetevoFelhasznaltMennyiseg = -1;

getdata();

/* INFO: adatok bekérése START INFO: */
async function getdata() {
    /* NOTE: get datareadalapanyagok HACK:HACK: */
    var response = await fetch("/datareadalapanyagok");
    state.alapanyagok = await response.json();

    /* NOTE: get datareadtermekek INFO: INFO: INFO:*/
    var response = await fetch("/datareadtermekek");
    state.termekek = await response.json();

    /* NOTE: get datareadtermekek INFO: INFO: INFO:*/
    var response = await fetch("/datareadosszetevok");
    state.osszetevok = await response.json();

    rendertermekek();

    $(document).ready(function () {
        $("#newdata").click(function () {
            /* TODO: NOTE: INFO: insertMySQL(); TODO: NOTE: INFO:*/
            insertMySQL();
            async function insertMySQL() {
                /* TODO: NOTE: INFO: NOTE: TODO: */
                const nevInput = document.querySelector("#nev");
                /* HACK: const nev = nevInput.value; HACK: */
                const nev = nevInput.value == "" ? "noname" : nevInput.value;
                nevInput.value = "";

                const beszarInput = document.querySelector("#beszar");
                /* const beszar = beszarInput.value; */
                const beszar =
                    beszarInput.value == "" ? "0" : beszarInput.value;
                beszarInput.value = "";

                const elarInput = document.querySelector("#elar");
                const elar = elarInput.value == "" ? "0" : elarInput.value;
                elarInput.value = "";

                const leltarozandoInput = document.querySelectorAll(
                    'input[name="leltarozando"]'
                );
                var leltarozando = "*";
                console.log(leltarozandoInput);
                for (selected of leltarozandoInput) {
                    if (selected.checked) {
                        console.log(selected.value);
                        console.log(leltarozando);

                        leltarozando = selected.value;
                    }
                }
                /* const leltarozandoInput =
                    document.querySelector("#leltarozando");
                const leltarozando = leltarozandoInput.value; */
                //const leltarozando = leltarozandoInput.value == "i" ? "i" : "n";
                /* const leltarozando =
                    leltarozandoInput.value == ""
                        ? "i"
                        : leltarozandoInput.value; */
                leltarozandoInput.value = "";

                const kritikusInput = document.querySelector("#kritikus");
                const kritikus =
                    kritikusInput.value == "" ? "0" : kritikusInput.value;
                kritikusInput.value = "";

                const gyujtoInput = document.querySelector("#gyujto");
                const gyujto =
                    gyujtoInput.value == "" ? "0" : gyujtoInput.value;
                gyujtoInput.value = "";

                const jelenlegiKeszletInput =
                    document.querySelector("#jelenlegiKeszlet");
                const jelenlegiKeszlet =
                    jelenlegiKeszletInput.value == ""
                        ? "0"
                        : jelenlegiKeszletInput.value;
                jelenlegiKeszletInput.value = "";

                const urtartalomInput = document.querySelector("#urtartalom");
                const urtartalom =
                    urtartalomInput.value == ""
                        ? "0"
                        : parseInt(urtartalomInput.value * 100);
                urtartalomInput.value = "";
                /* BUG:BUG:BUG:BUG:BUG:  */
                //const cl = urtartalom * 10;
                //const cl = termekKiszereles == 2 ? urtartalom * 10 : 1;
                const cl = termekKiszereles == 2 ? parseInt(urtartalom) : 1;
                /* const cl =
                    termekKiszereles == 2 ? parseInt(urtartalom * 100) : 1; */
                /* BUG:BUG:BUG:BUG:BUG: */
                const sumcl = jelenlegiKeszlet * cl;

                var id = xid + 1;
                /* INFO: inserttermekek  INFO: INFO: INFO: INFO: INFO: INFO: INFO:*/
                await fetch("/inserttermekek/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        /* TODO: NOTE: INFO: NOTE: TODO: */
                        nev: nev,
                        beszar: beszar,
                        elar: elar,
                        leltarozando: leltarozando,
                        kritikus: kritikus,
                        gyujto: gyujto,
                        urtartalom: urtartalom,
                        jelenlegiKeszlet: jelenlegiKeszlet,
                        cl: cl,
                        sumcl: sumcl,
                        kiszerelesId: termekKiszereles,
                        csoportId: csoportKiszereles,

                        /* TODO: NOTE: INFO: NOTE: TODO: */
                    }),
                });

                var myArray = [];
                //INFO:INFO:INFO:INFO:INFO:INFO:INFO:INFO:INFO:
                if (termekKiszereles == 2) {
                    $("#createXkimeres").modal();
                    //var myArray = [];
                    var indexArray = [];
                    var myObject = {};
                    createXkimeresHTML = "";
                    let str = `<h3 style = "color: blue">${nev}</h3>`;
                    document.getElementById("azonosito").innerHTML = str;

                    for (vKimeresNev of state.xkimeresnev) {
                        createXkimeresHTML += `<h4 class = "xKimeresSelect" title=0 id = ${vKimeresNev.id} 
                        style = "background: coral" >${vKimeresNev.nev}</h4>`;
                        myObject = {
                            xKim: {
                                elemID: vKimeresNev.id,
                                tarolhato: 0,
                            },
                        };
                        myArray.push(myObject);
                        indexArray.push(vKimeresNev.id);
                    }
                    document.getElementById("modalKineresNev").innerHTML =
                        createXkimeresHTML;
                    $(".xKimeresSelect").click(function () {
                        let index = 0;
                        let arrayIndex = 0;
                        for (let i of indexArray) {
                            if (i == this.id) {
                                index = arrayIndex;
                            }
                            arrayIndex++;
                        }
                        this.title == 0
                            ? this.setAttribute("title", 1)
                            : this.setAttribute("title", 0);
                        /* this.title == 1
                            ? (this.class = "btn btn-success xKimeresSelect")
                            : (this.class = "btn btn-danger xKimeresSelect"); */
                        this.title == 1
                            ? /* this.style.color = "green" */
                              (this.style.background = "greenyellow")
                            : (this.style.background = "coral");

                        this.title == 1
                            ? (myArray[index].xKim.tarolhato = 1)
                            : (myArray[index].xKim.tarolhato = 0);
                        //console.log(myArray);
                    });

                    //BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
                    $("#mDataSend").click(function () {
                        var termek_id = "";
                        var termek_nev = "";
                        var xkimeresnev_id = "";
                        var insertIndex = 0;
                        let index = 1;
                        id = id - 1; //NOTE: a tárolando termek_id

                        for (insertId of myArray) {
                            if (insertId.xKim.tarolhato == 1) {
                                //BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
                                //ide kell a fetch !!!!!!!!!!!!!!!!!!!!!!!!!!!
                                insertIndex = insertId.xKim.elemID;

                                insertXkimereMySQL();
                                //BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
                            }
                        }

                        async function insertXkimereMySQL() {
                            termek_id = id;
                            termek_nev = nev;
                            xkimeresnev_id = insertIndex;

                            /* INFO: inserxkimeres  INFO: INFO: INFO: INFO:*/
                            await fetch("/inserxkimeres/", {
                                method: "POST",
                                headers: {
                                    "Content-type": "application/json",
                                },
                                body: JSON.stringify({
                                    termek_id: termek_id,
                                    termek_nev: termek_nev,
                                    xkimeresnev_id: xkimeresnev_id,
                                }),
                            });
                            /* INFO: inserxkimeres  INFO: INFO: INFO: INFO: */
                        }
                    });
                    //BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
                }
                //INFO:INFO:INFO:INFO:INFO:INFO:INFO:INFO:INFO:

                /* INFO: inserttermekek  INFO: INFO: INFO: INFO: INFO: INFO: INFO:*/
                termekekHTML += `<tr >
                <td>${id}</td>
                <td>${nev}</td>
                <td>${beszar}</td>
                </tr>
                `;

                id++;
                xid++;
                document.getElementById("termekek").innerHTML = termekekHTML;
                document.getElementById("totalForm").reset();
            }
        });
    });
}

//VERSION-2:
function rendertermekek() {
    let index = 0;
    termekekHTML = "";
    for (let termek of state.termekek) {
        termekekHTML += `<tr >
        <td>${termek.id}</td>
        <td>${termek.nev}</td>
        <td>${termek.elar}</td>
        <td><button type="button" class="btn btn-${
            selectColor[termek.btncolor]
        }" style = "width: 8em">${selectName[termek.btncolor]}</button></td>
        <td><button class="updateBtn" id=${termek.id}>Edit</td>
        </tr>
        `;
        index++;
        xid = termek.id; /* BUG: */
    }
    document.getElementById("termekek").innerHTML = termekekHTML;

    $(".updateBtn").click(function () {
        let arrowIndex = -1;
        for (let i = 0; i < state.termekek.length; i++) {
            if (state.termekek[i].id == this.id) {
                arrowIndex = i;
            }
        }
        origNev = state.termekek[arrowIndex].nev;
        origElar = state.termekek[arrowIndex].elar;
        var origBtncolor = state.termekek[arrowIndex].btncolor;
        newBtncolor = origBtncolor;
        origId = state.termekek[arrowIndex].id;
        $("#myModal").modal();
        document.getElementById("newNev").value = origNev;
        document.getElementById("newElar").value = origElar;
        renderBtnColor(origBtncolor);
        renderOsszetevok();
        console.log("osszetevoAlapanyagId");
        console.log(osszetevoAlapanyagId);
        //VERSION-2:

        //VERSION-2:
        const colorBtn = document.querySelector("#btnColorForm");
        colorBtn.onchange = function () {
            var x = document.getElementById("btnColorForm").value;
            newBtncolor = parseInt(selectColor.findIndex(checkColor));
            function checkColor(colorArrayNumber) {
                return colorArrayNumber == x;
            }
        };
    });
}
//VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
function renderOsszetevok() {
    osszetevokHTML = ``;

    /* osszetevokHTML += `${origId} : ${origNev}`; */
    osszetevokHTML += `<table class="table table-striped">
    <thead>
        <tr>
            <th>Id</th>
            <th>Alapag</th>
            <th>Neve</th>
            <th>Kiszerelés jelleg</th>
            <th>Kiszerelés</th>
            <th>Felhasznált mennyiség</th>
        </tr>
    </thead>
    <tbody>`;
    for (osszetevo of state.osszetevok) {
        if (origId == osszetevo.termek_id) {
            /* osszetevokHTML += `${osszetevo.alapanyag_id}`; */
            for (alapanyag of state.alapanyagok) {
                if (alapanyag.id == osszetevo.alapanyag_id) {
                    osszetevokHTML += `
                    <tr>
                    <td id="otid">${osszetevo.id}</td>
                    <td id="otid">${alapanyag.id}</td>
                    <td id="otnev">${alapanyag.nev}</td>
                    <td id="otjelleg">${alapanyag.mertekegyseg}</td>
                    <td id="otkiszereles">${alapanyag.kiszereles}</td>
                    <td id="otfelhasznalt">${osszetevo.felhasznaltmennyiseg}</td>
                    <td><button class="btn btn-danger deleteBtn" id=${osszetevo.id}>DELETE</td>
                    </tr>`;
                }
            }
        }
    }
    osszetevokHTML += `</tbody></table><button type="button" class="btn btn-info " id="addOsszetevo">+</button>`;
    document.getElementById("osszetevok").innerHTML = osszetevokHTML;

    $(".deleteBtn").click(function () {
        console.log("DELETE ***** osszetevo.id");
        console.log(this.id);
        id = this.id;
        deleteOsszetevokMySQL();
        //VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
        async function deleteOsszetevokMySQL() {
            console.log("DELETE ***** id");
            console.log(id);
            /* INFO: deleteosszetevo  INFO: INFO: INFO: INFO:*/
            var response = await fetch("/deleteosszetevo/" + id, {
                method: "DELETE",
                /*   headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    osszetevoid: termek_id,
                    alapanyag_id: alapanyag_id,
                    felhasznaltmennyiseg: felhasznaltmennyiseg,
                }) */
            });
            console.log(response);
            /* console.log("state.osszetevok");
            console.log(state.osszetevok);
            getdata();
            renderOsszetevok();
            console.log("state.osszetevok");
            console.log(state.osszetevok); */
            /* INFO: insertosszetevok  INFO: INFO: INFO: INFO: */
        }
        //VERSION-2:
    });

    $("#addOsszetevo").click(function () {
        $("#myModalAdd").modal();
        selectOsszetevokHTML = "";
        let index = 0;
        for (alapanyag of state.alapanyagok) {
            selectOsszetevokHTML += `<button type="button" class="btn btn-outline-dark m-2 selected" id=${alapanyag.id}>${alapanyag.nev}</button>`;
            index++;
        }
        document.getElementById("selectOsszetevo").innerHTML =
            selectOsszetevokHTML;

        $(".selected").click(function () {
            osszetevoAlapanyagId = this.id;
            console.log("this.id-------------------------");
            console.log(osszetevoAlapanyagId);
            //$("#myModalAdd .close").click();
            console.log("this.id------SZAL-------------");
            console.log("origId");
            console.log(origId);
            console.log("origNev");
            console.log(origNev);
            console.log("osszetevoAlapanyagId");
            console.log(osszetevoAlapanyagId);
            //insertOsszetevokMySQL();
            //VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
            async function insertOsszetevokMySQL() {
                termek_id = origId;
                alapanyag_id = osszetevoAlapanyagId;
                felhasznaltmennyiseg = 0.25;

                /* INFO: insertosszetevok  INFO: INFO: INFO: INFO:*/
                await fetch("/insertosszetevok/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        termek_id: termek_id,
                        alapanyag_id: alapanyag_id,
                        felhasznaltmennyiseg: felhasznaltmennyiseg,
                    }),
                });
                /* console.log("state.osszetevok");
                console.log(state.osszetevok);
                getdata();
                renderOsszetevok();
                console.log("state.osszetevok");
                console.log(state.osszetevok); */
                /* INFO: insertosszetevok  INFO: INFO: INFO: INFO: */
            }
            //VERSION-2:
        });
        /* getdata();
        renderOsszetevok(); */
    });
}
function renderBtnColor(origBtncolor) {
    document.getElementById(
        "selectCategoryColor"
    ).innerHTML = `<select id=btnColorForm "
    name="btnColorForm" form="btnColorForm" >
    <option value="primary" class="bg-primary text-white" ${
        origBtncolor == 0 ? "selected" : ""
    }>${selectName[0]}</option>
    <option value="secondary" class="bg-secondary text-white" ${
        origBtncolor == 1 ? "selected" : ""
    }>${selectName[1]}</option>
    <option value="success" class="bg-success text-white"${
        origBtncolor == 2 ? "selected" : ""
    }>${selectName[2]}</option>
    <option value="warning" class="bg-warning text-white" ${
        origBtncolor == 3 ? "selected" : ""
    }>${selectName[3]}</option>
    <option value="danger" class="bg-danger text-white"${
        origBtncolor == 4 ? "selected" : ""
    }>${selectName[4]}</option>
    <option value="dark" class="bg-dark text-white" ${
        origBtncolor == 5 ? "selected" : ""
    }>${selectName[5]}</option>
    <option value="light" class="bg-light text-black" ${
        origBtncolor == 6 ? "selected" : ""
    }>${selectName[6]}</option>
    </select>`;
}
//VERSION-2:

/* HACK: */
function figyel() {
    if (document.getElementById("nev").value == "") {
        console.log("******* mezo UUURRREEESSS *******");
    }
    console.log("******* Ok *******");
}
/* HACK: */

/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
function updatetermekek() {
    /* INFO:HACK:HACK:HACK: */
    const nev = document.getElementById("newNev").value;
    const elar = document.getElementById("newElar").value;
    const btncolor = newBtncolor;
    /* HACK:HACK:HACK:INFO: */
    try {
        updateMySQL();
    } catch (e) {}
    async function updateMySQL() {
        id = origId;

        const response = await fetch("/updatetermekek/", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                nev: nev,
                elar: elar,
                btncolor: btncolor,
            }),
        });
        let arrowIndex = -1;
        for (let i = 0; i < state.termekek.length; i++) {
            if (state.termekek[i].id == id) {
                arrowIndex = i;
            }
        }
        state.termekek[arrowIndex].nev = nev;
        state.termekek[arrowIndex].elar = elar;
        state.termekek[arrowIndex].btncolor = btncolor;
        rendertermekek();
    }
}
//VERSION-2:
function addAlapanyag() {
    console.log("alapanyag plus");
    /* $("#myModalAdd").modal();
    document.getElementById("newNev").value = "";
    document.getElementById("newElar").value = ""; */
    //VERSION-2://VERSION-2:
}
//VERSION-2:

/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
/* 
for (let termek of state.termekek) {
        termekekHTML += `<tr >
        <td>${termek.id}</td>
        <td>${termek.nev}</td>
        <td>${termek.elar}</td>
        <td>
        <select id=btnColorForm name="btnColorForm" form="btnColorForm" class="${
            selectColor[termek.btncolor]
        } ">
        <option value="primary" class="bg-primary text-white" ${
            termek.btncolor == 0 ? "selected" : ""
        }>Primary</option>
        <option value="secondary" class="bg-secondary text-white" ${
            termek.btncolor == 1 ? "selected" : ""
        }>secondary</option>
        <option value="success" class="bg-success text-white"${
            termek.btncolor == 2 ? "selected" : ""
        }>success</option>
        <option value="warning" class="bg-warning text-white" ${
            termek.btncolor == 3 ? "selected" : ""
        }>warning</option>
        <option value="danger" class="bg-danger text-white"${
            termek.btncolor == 4 ? "selected" : ""
        }>danger</option>
        <option value="dark" class="bg-dark text-white" ${
            termek.btncolor == 5 ? "selected" : ""
        }>dark</option>
        <option value="light" class="bg-light text-black" ${
            termek.btncolor == 6 ? "selected" : ""
        }>light</option>
        </select>
    </td>
        
        <td><button class="updateBtn" id=${termek.id}>Edit</td>
        </tr>
        
        `;
        index++;
        xid = termek.id; 
    } */
/* INFO:HACK:HACK:HACK: torol HACK:HACK:HACK:INFO: */
/* function renderkiszereles() {
    let kiszerelesHTML = "";
    kiszerelesHTML += "<form>";
    for (let vKiszereles of state.kiszereles) {
        if (vKiszereles.id > 1) {
            kiszerelesHTML += `
            <input type="radio" id=${vKiszereles.id} name="kiszerelesRadio" value=${vKiszereles.id} class="kiszerelesRadio">
            <label for=${vKiszereles.id}>${vKiszereles.nev}</label><br>
            `;
        }
    }
    kiszerelesHTML += "</form>";
    document.getElementById("kiszerelesSelect").innerHTML = kiszerelesHTML;
    $(".kiszerelesRadio").click(function () {
        termekKiszereles = this.id;
        console.log("kiszerelesRadio OK");
        console.log(this.id);
        console.log("termekKiszereles");
        console.log(termekKiszereles);
    });
} */
/* INFO:HACK:HACK:HACK: torol HACK:HACK:HACK:INFO: */

/* HACK: https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_form_horizontal&stacked=h HACK: */
/* INFO:HACK:HACK:HACK: torol HACK:HACK:HACK:INFO: */
/* function rendercsoport() {
    let csoportHTML = "";
    csoportHTML += "<form>";
    for (let vCsoport of state.csoportkategoria) {
        if (vCsoport.id > 1) {
            csoportHTML += `
            <input type="radio" id=${vCsoport.id} name="csoportRadio" value=${vCsoport.id} class="csoportRadio">
            <label for=${vCsoport.id}>${vCsoport.nev}</label><br>
            `;
        }
    }
    csoportHTML += "</form>";
    document.getElementById("csoportSelect").innerHTML = csoportHTML;
    $(".csoportRadio").click(function () {
        csoportKiszereles = this.id;
        console.log("csoportRadio OK");
        console.log(this.id);
        console.log("csoportKiszereles");
        console.log(csoportKiszereles);
    });
} */
/* INFO:HACK:HACK:HACK: torol HACK:HACK:HACK:INFO: */
/* function modalDataSedn() {
    console.log("modalDataSedn()******************");
    console.log("nev:");
    console.log(nev);
} */
