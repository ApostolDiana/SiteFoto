function display_c() {
    var refresh = 1000;
    mytime = setTimeout('fct()', refresh)
}
function fct() {

    document.getElementById("url").innerHTML = "Url: " + location.href;
    document.getElementById("numeBrowser").innerHTML = "Numele browserului este: " + navigator.appName;
    document.getElementById("versiuneBrowser").innerHTML = "Versiunea browserului este: " + navigator.appVersion;
    document.getElementById("sistemOperare").innerHTML = "Sistemul de operare este: " + navigator.platform;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("locatieCurenta").innerHTML =
            "Locația nu este suportata de browser.";
    }
    document.getElementById("timpCurent").innerHTML = "Timp curent: " + (new Date());
    dd = display_c();

}
function showPosition(position) {
    document.getElementById("locatieCurenta").innerHTML = "Locația <br>" +
        "Latitudine: " + position.coords.latitude + "<br>" +
        "Longitudine: " + position.coords.longitude;
}
function stergeCanvas() {
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var rectangle = 0;

/*function plot_pt() {
    var culoare = document.getElementById("culoare");
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = culoare.value;
    if (rectangle == 0) {
        clx = event.clientX - c.offsetLeft;
        cly = event.clientY - c.offsetTop;
        ctx.moveTo(clx, cly);
        rectangle++;
    } else {
        ulx = event.clientX - c.offsetLeft;
        uly = event.clientY - c.offsetTop;
        ctx.beginPath();
        ctx.moveTo(ulx, uly);
        ctx.strokeStyle = culoare;
        ctx.strokeRect(clx, cly, ulx - clx, uly - cly);
        ctx.stroke();
        rectangle = 0;
    }
}*/
function plot_pt() {
    var culoare = document.getElementById("culoare").value; // obține culoarea selectată
    var culoare1 = document.getElementById("culoare").value;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    if (rectangle == 0) {
        clx = event.clientX - c.offsetLeft;
        cly = event.clientY - c.offsetTop;
        ctx.moveTo(clx, cly);
        rectangle++;
    } else {
        ulx = event.clientX - c.offsetLeft;
        uly = event.clientY - c.offsetTop;
        ctx.beginPath();
        ctx.moveTo(ulx, uly);
        ctx.strokeStyle = culoare; // setează culoarea pentru contur
        ctx.fillStyle = culoare; // setează culoarea de umplere
        ctx.fillRect(clx, cly, ulx - clx, uly - cly); // desenează dreptunghiul umplut cu culoarea selectată
        ctx.strokeRect(clx, cly, ulx - clx, uly - cly); // desenează conturul dreptunghiului cu culoarea selectată
        rectangle = 0;
    }
    
}

function addTableRow() {
    var nume = document.getElementById("nume");
    var loc = document.getElementById("loc");
    var culoare = document.getElementById("culoare2");
    var linie = document.getElementById("linie").value;
    var table = document.getElementById("tableData");
    var rowCount = table.rows.length;
    if (linie == 0) {
        var row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML = nume.value;
        row.insertCell(1).innerHTML = loc.value;
        row.cells[0].style.backgroundColor = culoare.value;
        row.cells[1].style.backgroundColor = culoare.value;
    }
    else {
        var row = table.insertRow(linie);
        row.insertCell(0).innerHTML = nume.value;
        row.insertCell(1).innerHTML = loc.value;
        row.cells[0].style.backgroundColor = culoare.value;
        row.cells[1].style.backgroundColor = culoare.value;
    }
}


function addTableColumn() {
    let color = document.getElementById("culoare1").value
    let index = document.getElementById("coloana").value
    let table = document.getElementById("tableData")

    let cell;
    for (let i = 0; i < table.rows.length; ++i) {
        cell = table.rows[i].insertCell(index);
        cell.style.background = color;
    }
    row_nr += 1;
}

function schimbaContinut(resursa, jsFisier, jsFunctie) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;

            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }
    };
    xhttp.open("GET", resursa + ".html", true);
    xhttp.send();
}

function validareUtilizatorParola() {
    var utilizator = document.getElementById("utilizator").value;
    var parola = document.getElementById("parola").value;
    var req = new XMLHttpRequest();
    req.open("GET", "../resurse/utilizatori.json", true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            // Parsăm textul JSON la obiect JavaScript
            var utilizatori = JSON.parse(req.responseText);
            var gasit = false;

            // Verificăm dacă numele de utilizator și parola corespund cu lista din JSON
            for (var i = 0; i < utilizatori.length; i++) {
                if (utilizatori[i].utilizator === utilizator && utilizatori[i].parola === parola) {
                    gasit = true;
                    break;
                }
            }

            if (gasit) {
                document.getElementById("rezultat").innerHTML = "Utilizator și parolă corecte!";
            } else {
                document.getElementById("rezultat").innerHTML = "Utilizator sau parolă incorecte!";
            }
        }
    };
    req.send();


}


function adaugaDateUtilizator() {
    var utilizator = document.getElementById("numeutil").value;
    var parola = document.getElementById("parola").value;
    var obiectUtilizator = {
        "utilizator": utilizator,
        "parola": parola
    };
    var req = new XMLHttpRequest();
    req.open("POST", "/api/utilizatori");
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.onload = function () {
        if (req.status === 201) {
            document.getElementById("raspuns").innerHTML = "Utilizatorul a fost înregistrat cu succes!";
        } else {
            document.getElementById("raspuns").innerHTML = "Eroare la înregistrarea utilizatorului!";
        }
    };
    req.send(JSON.stringify(obiectUtilizator));
}
class Fotografie {
    constructor(nume, cantitate, id) {
        this.nume = nume;
        this.cantitate = cantitate;
        this.id = id;
    }
}

//worker

const worker = new Worker("./js/worker.js");
class Storable {
    constructor() {
        if (new.target === Storable) {
            throw new TypeError("Cannot construct abstract instances directly");
        }
    }

    save(data) {
        throw new Error("Method 'save(data)' must be implemented");
    }

    load() {
        throw new Error("Method 'load()' must be implemented");
    }

    clear() {
        throw new Error("Method 'clear()' must be implemented");
    }
}
//localStorage

class LocalStorageStorable extends Storable {
    constructor(key) {
        super();
        this.key = key;
    }

    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    load() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    }

    clear() {
        localStorage.removeItem(this.key);
    }
}


class IndexedDBStorable extends Storable {
    constructor(databaseName, storeName) {
        super();
        this.databaseName = databaseName;
        this.storeName = storeName;
    }

    async save(data) {
        const db = await this.openDatabase();
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        store.put(data, 1);
        await tx.complete;
        db.close();
    }

    async load() {
        const db = await this.openDatabase();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(this.storeName, "readonly");
            const store = tx.objectStore(this.storeName);
            const request = store.get(1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result);
                }
            };
        });
    }


    async clear() {
        const db = await this.openDatabase();
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        store.delete(1);
        await tx.complete;
        db.close();
    }

    async openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.databaseName);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = () => {
                const db = request.result;
                db.createObjectStore(this.storeName);
            };
        });
    }
}