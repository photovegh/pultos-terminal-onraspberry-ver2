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
var newBtncolor = 0;
var origNev = "";
var origElar = 0;
var origBtncolor = 0;
var origId = 0;
var osszetevoAlapanyagId = -1;
var osszetevoFelhasznaltMennyiseg = -1;
var newTermek = false;

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
}
async function getdataKatto() {
    /* NOTE: get datareadtermekek INFO: INFO: INFO:*/
    var response = await fetch("/datareadtermekek");
    state.termekek = await response.json();
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
        <td>${termek.visiblesequence}</td>
        <td><button class="updateBtn" id=${termek.visiblesequence}>Edit</td>
        </tr>
        `;
        index++;
        xid = termek.id; /* BUG: */
    }
    document.getElementById("termekek").innerHTML = termekekHTML;
    //VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
    //$("#addNewBtn").click(function () {
    $("#addNewBtn")
        .off("click")
        .on("click", function () {
            document.getElementById("newTermek").innerHTML = "";
            console.log("kezdhetetem az uj termeket");
            //$("#addTermekModal").modal();
            //renderBtnColor(origBtncolor);
            console.log("state.termekek.length");
            console.log(state.termekek.length);
            //renderOsszetevok();
            //VERSION-2:INFO:VERSION-2:
            document.getElementById(
                "newTermek"
            ).innerHTML = `<table class="table table-striped text-center">
            <thead>
                <tr>
                    <th>Neve</th>
                    <th>Eladási ár</th>
                    <th>Szinezése</th>
                </tr>
                <tr>
                    <td><input type="text" name="tNev" id="tNev"></td>
                    <td><input type="number" name="tEladasi" id="tEladasi" style="width: 7em"></td>
                    <td>
                        <input type="radio" id="primary" name="termekColor" value=0 checked>
                          <label for="primary" class="bg-primary text-white xtermekColor ">KÉK</label>
                          <input type="radio" id="szurke" name="termekColor" value=1>
                          <label for="szurke" class="bg-dark text-white xtermekColor">SZÜRKE</label>
                          <input type="radio" id="zold" name="termekColor" value=2>
                          <label for="zold" class="bg-success text-white xtermekColor">ZÖLD</label>
                          <input type="radio" id="sarga" name="termekColor" value=3>
                          <label for="sarga" class="bg-warning text-white xtermekColor">SÁRGA</label>
                          <input type="radio" id="danger" name="termekColor" value=4>
                          <label for="danger" class="bg-danger text-white xtermekColor">PIROS</label>
                          <input type="radio" id="fekete" name="termekColor" value=5>
                          <label for="fekete" class="bg-dark text-white xtermekColor">FEKETE</label>
                          <input type="radio" id="feher" name="termekColor" value=6>
                          <label for="feher" class="bg-light text-dark xtermekColor">FEHÉR</label>
                    </td>
                </tr>
            </thead>
        </table> <input type="button" value="Melyik?" id="cosnsoleWrite">
        `;
            $("#cosnsoleWrite").click(function () {
                console.log("Naaaaaa😛");
                var nev = document.getElementById("tNev").value;
                console.log(nev);
                var elar = document.getElementById("tEladasi").value;
                console.log(elar);
                const colorNumber = document.querySelectorAll(
                    'input[name="termekColor"]'
                );
                var btncolor = "*";
                for (selected of colorNumber) {
                    if (selected.checked) {
                        console.log(selected.value);
                        btncolor = selected.value;
                    }
                }
                inserttermekek(nev, elar, btncolor);
            });

            //VERSION-2:INFO:VERSION-2:
            /* newTermek = false;
            newBtncolor = 0;
            origBtncolor = 0;
            osszetevokHTML = ``;
            let arrowIndex = 0;
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
            $("#myModalTermek").modal();
            document.getElementById("newNev").value = "";
            document.getElementById("newElar").value = 0;
            renderBtnColor(origBtncolor);
            renderOsszetevok();
            console.log("osszetevoAlapanyagId");
            console.log(osszetevoAlapanyagId);

            const colorBtn = document.querySelector("#btnColorForm");
            colorBtn.onchange = function () {
                var x = document.getElementById("btnColorForm").value;
                newBtncolor = parseInt(selectColor.findIndex(checkColor));
                function checkColor(colorArrayNumber) {
                    return colorArrayNumber == x;
                }
            }; */
            //VERSION-2:INFO:VERSION-2:
        });
    //VERSION-2://VERSION-2://VERSION-2:
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
        $("#myModalTermek").modal();
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
    osszetevokHTML += `</tbody></table><button type="button" class="btn btn-warning " id="addOsszetevo">Alapanyag hozzáadása</button>`;
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
            await fetch("/deleteosszetevo/" + id, {
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
            //console.log(response);
            console.log("state.osszetevok ELOOTTE");
            console.log(state.osszetevok);
            await getdata();
            await renderOsszetevok();
            console.log("state.osszetevok 😋😋😋");
            console.log(state.osszetevok);
            /* INFO: insertosszetevok  INFO: INFO: INFO: INFO: */
        }
        //VERSION-2:
    });

    $("#addOsszetevo").click(function () {
        $("#myModalAdd").modal();
        selectOsszetevokHTML = "";
        let index = 0;
        for (alapanyag of state.alapanyagok) {
            if (alapanyag.mertekegyseg == "liter") {
                selectOsszetevokHTML += `<button type="button" class="btn btn-outline-dark m-2 selected" data-kiszereles=${alapanyag.kiszereles} data-nev="${alapanyag.nev}" id=${alapanyag.id}>${alapanyag.nev}</button>`;
            }
            index++;
        }
        document.getElementById("selectOsszetevo").innerHTML =
            selectOsszetevokHTML;

        $(".selected").click(function (e) {
            osszetevoAlapanyagId = this.id;
            alapanyagKiszereles = e.target.dataset.kiszereles;
            alapanyagNev = e.target.dataset.nev;
            console.log("this.id-------------------------");
            console.log(osszetevoAlapanyagId);
            $("#myModalAdd .close").click();
            $("#myModalFelhasznalt").modal();
            document.getElementById("felhasznalt").value = alapanyagKiszereles;
            document.getElementById("felhasznaltNev").innerHTML = alapanyagNev;
            console.log("this.id------SZAL-------------");
            console.log("origId");
            console.log(origId);
            console.log("origNev");
            console.log(origNev);
            console.log("osszetevoAlapanyagId");
            console.log(osszetevoAlapanyagId);
            //VERSION-2:INFO:
            //insertOsszetevokMySQL();insertOsszetevokMySQL()
            //$('#link').off('click').on('click',function(){});
            $("#felhasznaltBTN")
                .off("click")
                .on("click", function () {
                    insertOsszetevokMySQL();
                });
            /* $("#felhasznaltBTN").click(function () {
                insertOsszetevokMySQL();
            }); */
            //VERSION-2:INFO:
            //VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
            async function insertOsszetevokMySQL() {
                termek_id = origId;
                alapanyag_id = osszetevoAlapanyagId;
                //VERSION-2:INFO:
                felhasznaltmennyiseg =
                    document.getElementById("felhasznalt").value;
                //VERSION-2:INFO:
                //felhasznaltmennyiseg = alapanyagKiszereles;
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
                console.log("state.osszetevok elotte");
                console.log(state.osszetevok);
                await getdata();
                await renderOsszetevok();
                console.log("state.osszetevok 😋");
                console.log(state.osszetevok);
            }
            //VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
        });
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
function inserttermekek(vnev, velar, vbtncolor) {
    const nev = vnev;
    const elar = velar;
    const btncolor = vbtncolor;
    const urtartalom = 0;
    const visiblesequence = state.termekek.length + 1;
    console.log("itt vok");
    insertMySQL();
    async function insertMySQL() {
        //id = origId;
        const response = await fetch("/inserttermek/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                nev: nev,
                elar: elar,
                urtartalom: urtartalom,
                btncolor: btncolor,
                visiblesequence: visiblesequence,
            }),
        });
        /* console.log("response");
        console.log(response); */
        /* let arrowIndex = -1;
        for (let i = 0; i < state.termekek.length; i++) {
            if (state.termekek[i].id == id) {
                arrowIndex = i;
            }
        }
        state.termekek[arrowIndex].nev = nev;
        state.termekek[arrowIndex].elar = elar;
        state.termekek[arrowIndex].btncolor = btncolor; */
        //await renderOsszetevok();
        await getdataKatto();
        //await getdata();
        await addButton();
        function addButton() {
            var modalHTML = createModal();
            document.getElementById("newTermek").innerHTML =
                `<div class="card"><h1>${nev}</h1><h3>Eladási ár: ${elar}, Id: ${visiblesequence}, ${btncolor}</h3><button type="button" class="btn btn-warning " id="addOsszetevo">
            Alapanyag hozzáadása
        </button></div><div id="selectOsszetevo"></div>` + modalHTML;
        }
        console.log("state.termekek");
        console.log(state.termekek);
        await addOsszetevoKatto();
        function addOsszetevoKatto() {
            $("#addOsszetevo").click(function () {
                console.log("addOsszetevo click func NO modal");
                $("#myModalAdd").modal();
                selectOsszetevokHTML = "";
                let index = 0;
                for (alapanyag of state.alapanyagok) {
                    if (alapanyag.mertekegyseg == "liter") {
                        selectOsszetevokHTML += `<button type="button" class="btn btn-outline-dark m-2 selected" data-kiszereles=${alapanyag.kiszereles} data-nev="${alapanyag.nev}" id=${alapanyag.id}>${alapanyag.nev}</button>`;
                    }
                    index++;
                }
                document.getElementById("selectOsszetevo").innerHTML =
                    selectOsszetevokHTML;

                $(".selected").click(function (e) {
                    osszetevoAlapanyagId = this.id;
                    alapanyagKiszereles = e.target.dataset.kiszereles;
                    alapanyagNev = e.target.dataset.nev;
                    console.log("this.id-------------------------");
                    console.log(osszetevoAlapanyagId);
                    $("#myModalAdd .close").click();
                    $("#myModalFelhasznalt").modal();
                    document.getElementById("felhasznalt").value =
                        alapanyagKiszereles;
                    document.getElementById("felhasznaltNev").innerHTML =
                        alapanyagNev;
                    console.log("this.id------SZAL-------------");
                    console.log("origId");
                    console.log(origId);
                    console.log("origNev");
                    console.log(origNev);
                    console.log("osszetevoAlapanyagId");
                    console.log(osszetevoAlapanyagId);
                    //VERSION-2:INFO:
                    //insertOsszetevokMySQL();insertOsszetevokMySQL()
                    //$('#link').off('click').on('click',function(){});
                    $("#felhasznaltBTN")
                        .off("click")
                        .on("click", function () {
                            insertOsszetevokMySQL();
                        });
                    /* $("#felhasznaltBTN").click(function () {
                        insertOsszetevokMySQL();
                    }); */
                    //VERSION-2:INFO:
                    //VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
                    async function insertOsszetevokMySQL() {
                        termek_id = visiblesequence;
                        alapanyag_id = osszetevoAlapanyagId;
                        //VERSION-2:INFO:
                        felhasznaltmennyiseg =
                            document.getElementById("felhasznalt").value;
                        //VERSION-2:INFO:
                        //felhasznaltmennyiseg = alapanyagKiszereles;
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
                        window.location.href = "/termekek-adatlap";
                        /* console.log("state.osszetevok elotte");
                        console.log(state.osszetevok); */
                        /* await getdata();
                        await renderOsszetevok();
                        console.log("state.osszetevok 😋");
                        console.log(state.osszetevok); */
                    }
                    //VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
                });
            });
        }
        //await rendertermekek();
    }
}
function updatetermekek() {
    /* INFO:HACK:HACK:HACK: */
    const nev = document.getElementById("newNev").value;
    const elar = document.getElementById("newElar").value;
    const btncolor = newBtncolor;
    const urtartalom = 0;
    const visiblesequence = state.termekek.length + 1;
    /* HACK:HACK:HACK:INFO: */
    //VERSION-2://VERSION-2://VERSION-2:
    if (newTermek) {
        try {
            console.log("newTermek");
            //const btncolor = document.getElementById("colorBtn").value;
            insertMySQL();
            newTermek = false;
        } catch (e) {}
    } else {
        try {
            updateMySQL();
        } catch (e) {}
    }
    //VERSION-2://VERSION-2://VERSION-2:
    //updateMySQL();
    newTermek = false;
    /* HACK:HACK:HACK:INFO: */
    async function insertMySQL() {
        id = origId;
        const response = await fetch("/inserttermek/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                nev: nev,
                elar: elar,
                urtartalom: urtartalom,
                btncolor: btncolor,
                visiblesequence: visiblesequence,
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
        await getdata();
        await rendertermekek();
    }
    /* HACK:HACK:HACK:INFO: */
    async function updateMySQL() {
        id = origId;
        newTermek = false;
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
    document.getElementById("newTermek").innerHTML = "";
    /* $("#myModalAdd").modal();
    document.getElementById("newNev").value = "";
    document.getElementById("newElar").value = ""; */
    //VERSION-2://VERSION-2:
}
//VERSION-2:

function createModal() {
    return `<div class="modal" id="myModalFelhasznalt">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header bg-warning">
                <h4 class="modal-title">Milyen mennyiséget használjak fel?</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <h3 class="card" id="felhasznaltNev"></h3>
                <input type="number" id="felhasznalt" name="felhasznalt">

            </div>

            <!-- Modal footer -->
            <div class="modal-footer bg-warning">
                <button type="button" class="btn btn-info" data-dismiss="modal"
                    id="felhasznaltBTN">Rögzíten</button>
            </div>

        </div>
    </div>
</div>`;
}

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

//VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
/* $(document).ready(function () {
    $("#newdata").click(function () {
        insertMySQL();
        async function insertMySQL() {
            const nevInput = document.querySelector("#nev");
            const nev = nevInput.value == "" ? "noname" : nevInput.value;
            nevInput.value = "";
            const beszarInput = document.querySelector("#beszar");
            const beszar = beszarInput.value == "" ? "0" : beszarInput.value;
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
            leltarozandoInput.value = "";
            const kritikusInput = document.querySelector("#kritikus");
            const kritikus =
                kritikusInput.value == "" ? "0" : kritikusInput.value;
            kritikusInput.value = "";
            const gyujtoInput = document.querySelector("#gyujto");
            const gyujto = gyujtoInput.value == "" ? "0" : gyujtoInput.value;
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
            const cl = termekKiszereles == 2 ? parseInt(urtartalom) : 1;
            const sumcl = jelenlegiKeszlet * cl;
            var id = xid + 1;
            await fetch("/inserttermekek/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
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
                }),
            });
            var myArray = [];
            if (termekKiszereles == 2) {
                $("#createXkimeres").modal();
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
                    this.title == 1
                        ? (this.style.background = "greenyellow")
                        : (this.style.background = "coral");
                    this.title == 1
                        ? (myArray[index].xKim.tarolhato = 1)
                        : (myArray[index].xKim.tarolhato = 0);
                });
                $("#mDataSend").click(function () {
                    var termek_id = "";
                    var termek_nev = "";
                    var xkimeresnev_id = "";
                    var insertIndex = 0;
                    let index = 1;
                    id = id - 1;
                    for (insertId of myArray) {
                        if (insertId.xKim.tarolhato == 1) {
                            insertIndex = insertId.xKim.elemID;
                            insertXkimereMySQL();
                        }
                    }
                    async function insertXkimereMySQL() {
                        termek_id = id;
                        termek_nev = nev;
                        xkimeresnev_id = insertIndex;
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
                    }
                });
            }
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
}); */
//VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
