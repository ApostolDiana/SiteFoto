function incarcaPersoane() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var xmlString = this.responseText;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlString, "text/xml");
        var root = xmlDoc.documentElement;
        var table = "<table><tr><th>Nume</th><th>Prenume</th><th>Varsta</th><th>Liceu</th><th>Job</th></tr>";
        var persoane = root.getElementsByTagName("persoana");
        for (var i = 0; i < persoane.length; i++) {
          var nume = persoane[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue;
          var prenume = persoane[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue;
          var varsta = persoane[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue;
          var liceu = persoane[i].getElementsByTagName("liceu")[0].childNodes[0].nodeValue; // actualizare pentru liceu
          var job = persoane[i].getElementsByTagName("job")[0].childNodes[0].nodeValue; // adăugare pentru job
          table += "<tr><td>" + nume + "</td><td>" + prenume + "</td><td>" + varsta + "</td><td>" + liceu + "</td><td>" + job + "</td></tr>";
        }
        table += "</table>";
        document.getElementById("tabel_persoane").innerHTML = table;
        document.querySelector('p').style.display = 'none';

      }
    };
    xhttp.open("GET", "../resurse/persoane.xml", true);
    xhttp.send();
  }
  