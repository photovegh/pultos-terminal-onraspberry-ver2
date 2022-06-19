const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); /* NOTE: környezeti változó */
const conf = dotenv.config();
const fs = require("fs");

var port = conf.parsed.ADMINPORT;
var mysql = require("mysql");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static("public/js"));
app.use(express.static("public/css"));
app.use(express.static("public/img"));

/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
app.post("/updatepultosok", bodyParser.json(), (req, res) => {
    console.log("req.body.data");
    console.log(req.body.data);
    const content = req.body.data;
    console.log(content);
    fs.writeFile("psw.json", JSON.stringify(content), (err) => {
        if (err) {
            console.error(err);
        }
        console.log("file write OK");
    });
    //res.sendFile(__dirname + "/views/admin.html");
});

/* INFO: pultosokadmin BUG:BUG: test version 😁 BUG:BUG:*/
app.get("/pultosokadmin", (req, res) => {
    res.sendFile(__dirname + "/views/pultosok-admin.html");
    /* res.sendFile(__dirname + "/psw.json"); */
    console.log("backEnd pultosokadmin ok");
});
/* INFO: pultosokadminpsw BUG:BUG: password JSON send 😁 BUG:BUG:*/
app.get("/pultosokadminpsw", (req, res) => {
    /* res.sendFile(__dirname + "/views/pultosok-admin.html"); */
    res.sendFile(__dirname + "/psw.json");
    console.log("backEnd PSW ok");
});

//VERSION-2:
/* INFO: lasttransaction BUG:BUG: TOROLNI ??? NEM KELL??? BUG:BUG:*/
app.get("/lasttransaction", (req, res) => {
    res.sendFile(__dirname + "/last-transaction.json");
});
//VERSION-2:

/* INFO: MySQL connection */
/* var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pultosterminal",
}); */
var con = mysql.createConnection({
    host: "localhost",
    user: "pultos",
    password: "Terminal-2022",
    database: "pultosterminal",
});

con.connect(function (err) {
    if (err) throw err;
});

/* INFO: termek nev lekeres */
con.query("SELECT * FROM termekek", (err, data) => {
    if (err) throw err;
    termekeks = data;
});

/* INFO: induló képernyő */
app.get("/", (req, res) => {
    console.log("ADMIN console OK");
    res.sendFile(__dirname + "/views/admin.html");
});

//VERSION-2://VERSION-2://VERSION-2:
/* INFO: /datareadtermekek */
app.get("/datareadtermekek", (req, res) => {
    con.query("SELECT * FROM termekek", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
//VERSION-2://VERSION-2://VERSION-2:

//VERSION-2://VERSION-2:
// INFO: alapanyagok HTML
app.get("/alapanyagok", (req, res) => {
    //console.log("ALAPANYAG console OK");
    res.sendFile(__dirname + "/views/alapanyagok.html");
});
// INFO: /alapanyagok DATA
app.get("/datareadalapanyagok", (req, res) => {
    con.query("SELECT * FROM alapanyagok", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
// INFO: /deleteosszetevo DATA
app.delete("/deleteosszetevo/:id", bodyParser.json(), (req, res) => {
    const id = req.params.id;
    console.log(id);
    con.query(
        "DELETE FROM termekek_has_alapanyagok WHERE id = ?",
        id,
        (err, data) => {
            if (err) throw err;
            res.send(data);
        }
    );
});
// INFO: /osszetevok DATA
app.get("/datareadosszetevok", (req, res) => {
    con.query("SELECT * FROM termekek_has_alapanyagok", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
// INFO: /alapanyagok DATA insert
app.post("/insertalapanyagok", bodyParser.json(), (req, res) => {
    //var keszletsum = [req.body.keszlet * req.body.kiszereles];
    var insertData = [
        req.body.nev,
        req.body.mertekegyseg,
        req.body.kiszereles,
        req.body.leltarozando,
        req.body.kritikus,
        req.body.gyujto,
        req.body.keszlet,
        req.body.beszar,
        req.body.keszletsum,
    ];
    console.log("insertData");
    console.log(insertData);
    con.query(
        "INSERT INTO alapanyagok (nev, mertekegyseg, kiszereles, leltarozando, kritikus, gyujto, keszlet,  beszar, keszletsum) VALUES (?)",
        [insertData],
        (err, data) => {
            if (err) throw err;
            insertData = [""];
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
    res.sendFile(__dirname + "/views/alapanyagok.html");
});
// INFO: /insertosszetevok DATA insert
app.post("/insertosszetevok", bodyParser.json(), (req, res) => {
    //var keszletsum = [req.body.keszlet * req.body.kiszereles];
    var insertData = [
        req.body.termek_id,
        req.body.alapanyag_id,
        req.body.felhasznaltmennyiseg,
    ];
    console.log("insertData");
    console.log(insertData);
    con.query(
        "INSERT INTO termekek_has_alapanyagok (termek_id, alapanyag_id, felhasznaltmennyiseg) VALUES (?)",
        [insertData],
        (err, data) => {
            if (err) throw err;
            insertData = [""];
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
    res.sendFile(__dirname + "/views/termekek-adatlap.html");
});
// INFO: /alapanyagok DATA update
app.patch("/updatealapanyagok", bodyParser.json(), (req, res) => {
    var nev = [req.body.nev];
    var mertekegyseg = [req.body.mertekegyseg];
    var kiszereles = [req.body.kiszereles];
    var leltarozando = [req.body.leltarozando];
    var kritikus = [req.body.kritikus];
    var gyujto = [req.body.gyujto];
    var keszlet = [req.body.keszlet];
    var beszar = [req.body.beszar];
    var keszletsum = [req.body.keszletsum];

    var id = req.body.id;
    console.log("id");
    console.log(id);
    console.log("nev");
    console.log(nev);
    console.log("kiszereles");
    console.log(kiszereles);
    console.log("keszlet");
    console.log(keszlet);
    console.log("keszletsum");
    console.log(keszletsum);
    con.query(
        "UPDATE alapanyagok SET nev = ?, mertekegyseg = ?, kiszereles = ?, leltarozando = ?, kritikus = ?, gyujto = ?, keszlet = ?, beszar = ?, keszletsum = ? WHERE id = ?",
        [
            nev,
            mertekegyseg,
            kiszereles,
            leltarozando,
            kritikus,
            gyujto,
            keszlet,
            beszar,
            keszletsum,
            id,
        ],
        (err, data) => {
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
});
// INFO: /updatealapanyagbeszerzes DATA update
app.patch("/updatealapanyagbeszerzes", bodyParser.json(), (req, res) => {
    var id = req.body.id;
    var keszlet = [req.body.keszlet];
    var keszletsum = [req.body.keszletsum];
    console.log("keszlet id keszletsum");
    console.log(id);
    console.log(keszlet);
    console.log(keszletsum);
    con.query(
        "UPDATE alapanyagok SET keszlet = ?, keszletsum = ? WHERE id = ?",
        [keszlet, keszletsum, id],
        (err, data) => {
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
});
//VERSION-2://VERSION-2:

/* INFO: /datareadforgalom 😋😋😋😋😋😋*/
app.get("/datareadforgalom", (req, res) => {
    con.query("SELECT * FROM forgalom", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

/* TODO: /datareadtermekek 😋😋😋😋😋😋*/
/* app.get("/datareadtermekek", (req, res) => {
    con.query("SELECT * FROM termekek", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
}); */

/* INFO: config */
app.get("/config", (req, res) => {
    res.sendFile(__dirname + "/views/config.html");
});

/* INFO: forgalom */
app.get("/forgalom", (req, res) => {
    res.sendFile(__dirname + "/views/forgalom.html");
});

/* INFO: termekek */
app.get("/termekek", (req, res) => {
    res.sendFile(__dirname + "/views/termekek.html");
});
/* INFO: termekek-adatlap */
app.get("/termekek-adatlap", (req, res) => {
    res.sendFile(__dirname + "/views/termekek-adatlap.html");
});

app.patch("/updatetermekekbeszerzes", bodyParser.json(), (req, res) => {
    var id = req.body.id;
    console.log(id);
    var insertKeszlet = [req.body.keszlet];
    var insertCl = [req.body.cl];
    var insertSumcl = [req.body.sumcl];
    console.log("insertKeszlet");
    console.log(insertKeszlet);
    console.log(insertCl);
    console.log(insertSumcl);
    con.query(
        "UPDATE termekek SET keszlet = ?, cl = ?, sumcl = ? WHERE id = ?",
        [insertKeszlet, insertCl, insertSumcl, id],
        (err, data) => {
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
});
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */

/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
app.patch("/updatetermekek", bodyParser.json(), (req, res) => {
    var insertNev = [req.body.nev];
    //var insertBeszar = [req.body.beszar];
    var insertElar = [req.body.elar];
    var insertBtncolor = [req.body.btncolor];
    //var insertKritikus = [req.body.kritikus];
    //var insertGyujto = [req.body.gyujto];

    var id = req.body.id;
    console.log(insertNev);
    console.log(id);
    con.query(
        "UPDATE termekek SET nev = ?,  elar = ?, btncolor = ? WHERE id = ?",
        [insertNev, insertElar, insertBtncolor, id],
        (err, data) => {
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
});
/* req.body.nev,
        req.body.beszar,
        req.body.elar,
        req.body.leltarozando,
        req.body.kritikus,
        req.body.gyujto,
    ]; */

/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
/* BUG: inserttermekek  BUG:BUG:BUG:BUG:BUG:BUG:BUG: */
app.post("/inserttermekek", bodyParser.json(), (req, res) => {
    //const nev = req.body.nev;
    //const beszar = req.body.beszar;
    /* NOTE:NOTE:NOTE:NOTE:NOTE: */
    var insertData = [
        req.body.nev,
        req.body.beszar,
        req.body.elar,
        req.body.leltarozando,
        req.body.kritikus,
        req.body.gyujto,
        req.body.urtartalom,
        req.body.jelenlegiKeszlet,
        req.body.cl,
        req.body.sumcl,
        req.body.kiszerelesId,
        req.body.csoportId,
    ];
    /* NOTE:NOTE:NOTE:NOTE:NOTE: */

    /* FIXME:FIXME:FIXME: */
    con.query(
        "INSERT INTO termekek (nev, beszar, elar, leltarozando, kritikus, gyujto, urtartalom, keszlet,  cl, sumcl, kiszereles_id, csoport_id) VALUES (?)",
        [insertData],
        (err, data) => {
            if (err) throw err;
            insertData = [""];
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
    /* FIXME:FIXME:FIXME: */

    res.sendFile(__dirname + "/views/termekek.html");
});
/* BUG: inserttermekek  BUG:BUG:BUG:BUG:BUG:BUG:BUG: */

/* INFO: password authentication */
function loggerMiddleWare(req, res, next) {
    const pin = true;
    if (pin) {
        //console.log("loggerMiddleWare is OK 😋 ");
        next();
    } else {
        //console.log(body);
        /* res.status(401).send("Authentical error is NEMOK 🤔 "); */
        res.status(200).sendFile(__dirname + "/views/index.html");
        /* console.log("loggerMiddleWare is NEMOK 🤔 ");
        return; */
    }
}

app.get("/pult", loggerMiddleWare, (req, res) => {
    res.sendFile(__dirname + "/views/pult.html");
});
app.listen(port, () => console.log("server is OK 😋 ADMINPORT: " + port));
//app.listen(7766, () => console.log("server is OK 😋 ADMINPORT: " + port));

//VERSION-2: INFO: NEM KELL! INFO:
/* HACK: /datareadkiszereles 😋😋😋😋😋😋 HACK:*/
/* app.get("/datareadkiszereles", (req, res) => {
    con.query("SELECT * FROM kiszereles", (err, data) => {
        if (err) throw err;
        console.log(data[1].urtartalom + " " + data[1].nev);
        res.send(data);
    });
}); */
/* HACK: /datareadkiszereles 😋😋😋😋😋😋 HACK:*/
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* INFO: /datareadcsoport 😋😋😋😋😋😋*/
/* app.get("/datareadcsoport", (req, res) => {
    con.query("SELECT * FROM csoportok", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
}); */
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* TODO: /datareadkiszerelés 😋😋😋😋😋😋*/
app.get("/datareadkiszereles", (req, res) => {
    con.query("SELECT * FROM kiszereles", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* TODO: /datareadxkimeres 😋😋😋😋😋😋*/
/* app.get("/datareadxkimeres", (req, res) => {
    con.query("SELECT * FROM xkimeres", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
}); */
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* TODO: /datareadxkimeresnev 😋😋😋😋😋😋*/
/* app.get("/datareadxkimeresnev", (req, res) => {
    con.query("SELECT * FROM xkimeresnev", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
}); */
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* TODO: //datareadkevert 😋😋😋😋😋😋*/
app.get("/datareadkevert", (req, res) => {
    con.query("SELECT * FROM kevert", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* INFO: xkimeresnev */
app.get("/xkimeresnev", (req, res) => {
    res.sendFile(__dirname + "/views/xkimeresnev.html");
});
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* INFO: kiszereles */
app.get("/kiszereles", (req, res) => {
    res.sendFile(__dirname + "/views/kiszereles.html");
});
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* INFO: csoportok */
app.get("/csoportok", (req, res) => {
    console.log("csoportok console OK");
    res.sendFile(__dirname + "/views/csoportok.html");
});
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* INFO: kevert */
/* app.get("/kevert", (req, res) => {
    res.sendFile(__dirname + "/views/kevert.html");
}); */
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* INFO: insertxkimeresnev  INFO:INFO:INFO:INFO:INFO:INFO:INFO: */
app.post("/insertxkimeresnev", bodyParser.json(), (req, res) => {
    const insertData = [req.body.nev, req.body.urtartalom];
    const nev = req.body.nev;
    const urtartalom = req.body.urtartalom;
    /* FIXME:FIXME:FIXME: */
    con.query(
        "INSERT INTO xkimeresnev (nev, urtartalom) VALUES (?)",
        [insertData],
        (err, data) => {
            if (err) throw err;
            //insertData = [""];
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
    res.sendFile(__dirname + "/views/xkimeresnev.html");
});
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
app.patch("/updatexkimeresnev", bodyParser.json(), (req, res) => {
    var insertNev = [req.body.nev];
    var insertUrtartalom = [req.body.urtartalom];
    var id = req.body.id;
    console.log(insertNev);
    console.log(insertUrtartalom);
    con.query(
        "UPDATE xkimeresnev SET nev = ? , urtartalom = ? WHERE id = ?",
        [insertNev, insertUrtartalom, id],
        (err, data) => {
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
});
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* NOTE: inserxkimeres  NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE: */
app.post("/inserxkimeres", bodyParser.json(), (req, res) => {
    const insertData = [
        req.body.termek_id,
        req.body.termek_nev,
        req.body.xkimeresnev_id,
    ];
    /* FIXME:FIXME:FIXME: */
    console.log(insertData);
    /* FIXME:FIXME:FIXME: */
    con.query(
        "INSERT INTO xkimeres (termek_id, termek_nev, xkimeresnev_id) VALUES (?)",
        [insertData],
        (err, data) => {
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
    /* FIXME:FIXME:FIXME: */
    res.sendFile(__dirname + "/views/xkimeresnev.html");
});
/* NOTE: inserxkimeres  NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE: */
//VERSION-2:
//VERSION-2: INFO: NEM KELL! INFO:
/* INFO: insertkiszereles  INFO:INFO:INFO:INFO:INFO:INFO:INFO: */
app.post("/insertkiszereles", bodyParser.json(), (req, res) => {
    const insertData = [req.body.nev, req.body.urtartalom];
    const nev = req.body.nev;
    const urtartalom = req.body.urtartalom;
    /* FIXME:FIXME:FIXME: */
    con.query(
        "INSERT INTO kiszereles (nev, urtartalom) VALUES (?)",
        [insertData],
        (err, data) => {
            if (err) throw err;
            //insertData = [""];
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
    res.sendFile(__dirname + "/views/termekek.html");
    //BUG:res.sendFile(__dirname + "/views/kiszereles.html");
});
//VERSION-2:
//VERSION-2:
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
app.patch("/updatekiszereles", bodyParser.json(), (req, res) => {
    var insertNev = [req.body.nev];
    var insertUrtartalom = [req.body.urtartalom];
    var id = req.body.id;
    console.log(insertNev);
    console.log(insertUrtartalom);
    con.query(
        "UPDATE kiszereles SET nev = ? , urtartalom = ? WHERE id = ?",
        [insertNev, insertUrtartalom, id],
        (err, data) => {
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
});
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
//VERSION-2:
//VERSION-2:
/* INFO: insertcsoportok  INFO:INFO:INFO:INFO:INFO:INFO:INFO: */
app.post("/insertcsoportok", bodyParser.json(), (req, res) => {
    const insertData = [req.body.nev];
    const nev = req.body.nev;
    /* FIXME:FIXME:FIXME: */
    con.query(
        "INSERT INTO csoportok (nev) VALUES (?)",
        [insertData],
        (err, data) => {
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
    res.sendFile(__dirname + "/views/csoportok.html");
});
//VERSION-2:
//VERSION-2:
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
app.patch("/updatecsoportok", bodyParser.json(), (req, res) => {
    var insertData = [req.body.nev];
    var id = req.body.id;
    console.log(insertData);
    con.query(
        "UPDATE csoportok SET nev = ? WHERE id = ?",
        [insertData, id],
        (err, data) => {
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
});
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
/* TODO:TODO:TODO:INFO:TODO:TODO:TODO:TODO: */
//VERSION-2:
//VERSION-2:
/* BUG: insertkevert  BUG:BUG:BUG:BUG:BUG:BUG:BUG: */
app.post("/insertkevert", bodyParser.json(), (req, res) => {
    //const nev = req.body.nev;
    //const beszar = req.body.beszar;
    /* NOTE:NOTE:NOTE:NOTE:NOTE: */
    /* var insertData = [
        req.body.nev,
        req.body.beszar,
        req.body.elar,
        req.body.leltarozando,
        req.body.kritikus,
        req.body.gyujto,
        req.body.jelenlegiKeszlet,
        req.body.urtartalom,
        req.body.cl,
        req.body.kiszerelesId,
        req.body.csoportId,
    ]; */
    var insertData = [
        req.body.termek_id,
        req.body.adalek_id,
        req.body.xkimeresnev_id,
    ];
    /* NOTE:NOTE:NOTE:NOTE:NOTE: */

    /* FIXME:FIXME:FIXME: */
    con.query(
        "INSERT INTO kevert (termek_id, adalek_id, xkimeresnev_id) VALUES (?)",
        /* "INSERT INTO termekek (nev, beszar, elar, leltarozando, kritikus, gyujto, keszlet, urtartalom, cl, kiszereles_id, csoport_id) VALUES (?)" , */
        [insertData],
        (err, data) => {
            if (err) throw err;
            insertData = [""];
            try {
                res.send(data);
            } catch {
                if (err) throw err;
            }
        }
    );
    /* FIXME:FIXME:FIXME: */

    res.sendFile(__dirname + "/views/kevert.html");
});
/* BUG: insertkevert  BUG:BUG:BUG:BUG:BUG:BUG:BUG: */
//VERSION-2:
