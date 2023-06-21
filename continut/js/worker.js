onmessage = function (produs) {
    console.log("Produsul a fost adaugat!", produs);
    postMessage('adauga');
}