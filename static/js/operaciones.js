// -------------------search------------------------//
// ----------------tabla operaciones----------------//

trFilter.onchange = function () {
    let tabla = document.getElementById("tableBody");
    let trs = tabla.getElementsByTagName("tr");
    let checkeados = document.querySelectorAll("input[type=checkbox]:checked");
    let arr = [];

    for (let i = 0; i < checkeados.length; i++) {
        arr.push(checkeados[i].dataset.filtro);
    }

    for (const tr of trs) {
        if (new RegExp(arr.join('|')).test(tr.innerHTML)) {
            tr.style.display = "";
        } else {
            tr.style.display = "none";
        }

    }

}

