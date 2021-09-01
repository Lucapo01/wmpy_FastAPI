const BOOKS = 'BKS_';

function updateBook(nombre,valor){
  var h, htmls = document.getElementsByName(nombre), len=htmls.length;
  while(len--){
      setValor(htmls[len],valor);
  }
}

function updateBooks(especie,plazo,compras,ventas){
  var CC, PC, PV, CV, nombre,
    LEN = len = compras.length;

  while (len--) {
    [CC, PC] = compras[len];
    [PV, CV] = ventas[len];
    nombre = BOOKS+especie+plazo+(LEN-len-1);
    updateBook(nombre+'CC',CC);
    updateBook(nombre+'PC',PC);
    updateBook(nombre+'PV',PV);
    updateBook(nombre+'CV',CV);
  }
  
}

function crearTablaBooks(datos) {

  var CC, PC, PV, CV, A = [],
    h4 = document.createElement('h1'),
    plazo = datos[2],
    compras = datos[3],
    ventas = datos[4],
    LEN = len = compras.length;

  h4.innerText = datos[1]+' '+PLAZOS[plazo];

  while (len--) {
    [CC, PC] = compras[len];
    [PV, CV] = ventas[len];
    A.unshift({
      CC,
      PC,
      PV,
      CV,
      $:{
        id: BOOKS+datos[1]+plazo+(LEN-len-1),
        acceso: BOOKS+datos[1]+plazo+(LEN-len-1)
      }
    });
  }

  A = generarObjetoVirtual(A);

  contenedorBooks.innerHTML = '';
  contenedorBooks.append(h4);
  contenedorBooks.append(generarTabla(A, {
    CC: colVerde,
    PC: colVerde,
    PV: colRoja,
    CV: colRoja
  }));

}