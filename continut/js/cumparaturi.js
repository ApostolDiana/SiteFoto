
var listaProduse = []; // lista de produse
var listaDB = [];
var storageLocal = new LocalStorageStorable('listaProduse');
var storageDB = new IndexedDBStorable('myDataBase', 'lista');

function adaugaProdus() {
    // Obținem valorile din input-uri
    var numeProdus = document.getElementById('numeprod').value;
    var cantitate = document.getElementById('cantit').value;
    var optiune = document.getElementById('salvare').value;
    var id, produs;
    if (optiune == 'LocalStorage') {
        id = listaProduse.length + 1;
        produs = new Fotografie(numeProdus, cantitate, id);
        listaProduse.push(produs);
    }
    else {
        id = listaDB.length + 1;
        produs = new Fotografie(numeProdus, cantitate, id);
        listaDB.push(produs);

    }
    worker.postMessage(produs);

    // Resetăm input-urile
    document.getElementById("numeprod").value = "";
    document.getElementById("cantit").value = "";
    if (optiune == 'LocalStorage') {
        storageLocal.save(listaProduse);
    }
    else {
        storageDB.save(listaDB);

    }
    //localStorage.setItem("listaProduse", JSON.stringify(listaProduse));

}
async function loadLocalStorage() {
    //var listaProduseSalvate = localStorage.getItem("listaProduse");
    //var listaProduseParsed = JSON.parse(listaProduseSalvate);
    var listaProduseParsed = storageLocal.load();
    if (listaProduseParsed) {
        listaProduse = listaProduseParsed.map(function (produs) {
            return new Fotografie(produs.nume, produs.cantitate, produs.id);
        });
        // Apelăm funcția pentru a actualiza tabelul cu lista de produse încărcate
        afiseazaTabel();

    }
    var listaProduseDBParsed = await storageDB.load();
    if (listaProduseDBParsed) {
        listaDB = listaProduseDBParsed.map(function (produs) {
            return new Fotografie(produs.nume, produs.cantitate, produs.id);
        });
    }

}

function stergeProduse() {
    var optiune = document.getElementById('salvare').value;
    if (optiune == 'LocalStorage') {
        listaProduse = [];
        storageLocal.clear();

    }
    else {
        listaDB = [];
        storageDB.clear();
    }
    // Salvăm lista actualizată în localStorage
    //localStorage.setItem("listaProduse", JSON.stringify(listaProduse));
    stergeTabel();
}


worker.onmessage = function (element) {
    if (element.data == "adauga") {
        adauga();

    }
}
function adauga() {
    // Obținem referința la tabel
    var optiune = document.getElementById('salvare').value;
    var tabel = document.getElementById("tabelProduse");
    var rand = tabel.insertRow(-1);
    var id = rand.insertCell(0);
    var numeProdus = rand.insertCell(1);
    var cantitate = rand.insertCell(2);
    if (optiune == 'LocalStorage') {
        id.innerHTML = listaProduse[listaProduse.length - 1].id;
        numeProdus.innerHTML = listaProduse[listaProduse.length - 1].nume;
        cantitate.innerHTML = listaProduse[listaProduse.length - 1].cantitate;

    }
    else{
        id.innerHTML = listaDB[listaDB.length - 1].id;
        numeProdus.innerHTML = listaDB[listaDB.length - 1].nume;
        cantitate.innerHTML = listaDB[listaDB.length - 1].cantitate;
    }

}

function afiseazaTabel() {
    var optiune = document.getElementById('salvare').value;
    var tabel = document.getElementById("tabelProduse");
    if(optiune=='LocalStorage'){
        for (var i = 0; i < listaProduse.length; i++) {
            var rand = tabel.insertRow(-1);
            var id = rand.insertCell(0);
            var numeProdus = rand.insertCell(1);
            var cantitate = rand.insertCell(2);
            id.innerHTML = listaProduse[i].id;
            numeProdus.innerHTML = listaProduse[i].nume;
            cantitate.innerHTML = listaProduse[i].cantitate;
        } 
    }
    else{
        for (var i = 0; i < listaDB.length; i++) {
            var rand = tabel.insertRow(-1);
            var id = rand.insertCell(0);
            var numeProdus = rand.insertCell(1);
            var cantitate = rand.insertCell(2);
            id.innerHTML = listaDB[i].id;
            numeProdus.innerHTML = listaDB[i].nume;
            cantitate.innerHTML = listaDB[i].cantitate;
        } 

    }
    

}

function stergeTabel() {
    var tabel = document.getElementById("tabelProduse");
    var nrLinii = tabel.rows.length;
    for (var i = 1; i < nrLinii; i++) {
        tabel.deleteRow(1);
    }
}
function refresh(){
    stergeTabel();
    afiseazaTabel();
}