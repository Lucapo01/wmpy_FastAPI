
let htmlFilaLider = trLider, TABLA_ACTUAL, PLAZO_ACTUAL=48;

trLider.remove();

tipoDePlazo.onchange = function(evto) {
  sincronizarTabla(TABLA_ACTUAL.dataset.nombre,PLAZO_ACTUAL=evto.target.id);
}

function removerExpand (html) {
  let htmls = html.querySelectorAll('[data-expand="1"]');
  for(let h of htmls) h.remove();
}

function obtenerHora(timestamp){
  d = new Date(timestamp);
  return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

function agregarEventoFilaTabla(tabla) {
  let trs = tabla.tBodies[0].querySelectorAll('tr');
  for (let tr of trs) {
    tr.onclick = function (evto) {
      let td = document.createElement('td'),
        tr = document.createElement('tr'),
        tropen = tabla.querySelector('tr[data-open]'),
        trAnt = tabla.querySelector('td[colspan]'),
        desc = this.dataset.descripcion;

      removerExpand(tabla);

      if (trAnt) trAnt.parentElement.remove();
      if (this.dataset.open) {
        return this.dataset.open = '';
      } else if (tropen) {
        tropen.dataset.open = '';
      }
      this.dataset.open = true;

      td.setAttribute('colspan', this.querySelectorAll('td').length);
      tr.append(td);

      // ----------------------------------
      if (evto.target.closest("td").cellIndex == 0) {
        // CLICK FAVORITOS
        let especie = this.children[1].innerText;
        insertarFavEnDesplegable(td,tabla.dataset.nombre,especie,tabla.dataset.plazo*1);
        this.after(tr);
      } else if (evto.target.closest("td").cellIndex == 3) {
        // CLICK PROFUNDIDAD
        APIGetProfundidad('especie','plazo').then(dato=>{
          let pos = dato.length;
          while(pos>0) {
            // debugger
            // copiar la fila actual y colocarle los valores nuevos
            let tr = this.cloneNode(true), tds = tr.children;
            tr.setAttribute('name','');
            tr.dataset.expand = 1;
            tds[0].colSpan=4;
            if(pos==4){
              tds[0].innerHTML = desc;
              tds[0].style="color:orange; margin-bottom: .5rem; font-weight: 500; line-height: 1.2; font-size: 1.25rem";
            }else{
              tds[0].innerHTML = '';
            }
            tds[1].style="display:none";
            tds[2].style="display:none";
            tds[3].style="display:none";
            tds[4].innerHTML = '';
            tds[8].innerHTML = dato[--pos];
            tds[7].innerHTML = dato[--pos];
            tds[6].innerHTML = dato[--pos];
            tds[5].innerHTML = dato[--pos];
            tds[9].innerHTML = '';
            tds[10].innerHTML = '';
            tds[11].innerHTML = '';
            tds[12].innerHTML = '';
            tds[13].innerHTML = '';
            tds[14].innerHTML = '';
            tr.style='border-bottom: 0px; background-color: #30303d';
            this.after(tr);
          }
        });

        //this.after(newTr);
        //htmlFilaLiderCola.newTr
        //td.append(htmlFilaLiderCola);

      } else {
        // COMPRAR o VENDER
        let especie = this.children[1].innerText, 
            moneda = evto.target.closest("tr").dataset.moneda*1,
            plazo = this.children[4].innerText.replace('Hs',''),
            precio = 0,
            cantidad = 0;
            
         switch (evto.target.closest("td").cellIndex) {
           case 6: case 5: 
              precio = this.children[6].textContent;
              cantidad = this.children[5].textContent; 
              break;
            case 7: case 8: 
              precio = this.children[7].textContent;
              cantidad = this.children[8].textContent;
              break;
           default:
             break;
         }   
            
        htmlFilaLider.querySelector("[data-id='btnComprar']").onclick = ()=>emitirOrdComprar(especie,plazo,moneda);
        htmlFilaLider.querySelector("[data-id='btnVender']").onclick = ()=>emitirOrdVender(especie,plazo,moneda);
        htmlFilaLider.querySelector("[data-id='ordenEspecie']").innerHTML = desc;
        htmlFilaLider.querySelector("[data-id='ordenPrecio']").value = precio;
        htmlFilaLider.querySelector("[data-id='ordenCantidad']").value = cantidad;

        // htmlFilaLider.children[1].value = this.children[1].textContent;
        tr.dataset.expand = 1;
        td.append(htmlFilaLider);
        this.after(tr);

      } 
    };
  }
}

// Muestra la tabla con id=id
function mostrarTabla(id){
  let tablas = paneles.querySelectorAll('table');
  for(let t of tablas) {
    if (t.id) {
        if (t.id==id) {
            t.classList.remove('ocultar');
            TABLA_ACTUAL = t;
        } else
          t.classList.add('ocultar');
    }
  }
}

// Sincroniza los datos a una tabla
function sincronizarTabla(nombre, plazo, mostrar=true) {
  return new Promise( resolve => {
    let id = nombre + plazo;
    if (!document.getElementById(id) ) {
      // La tabla no existe => crearla
      APIGetEspecies(nombre,plazo).then( especies => { 
        dibujarTabla(id, nombre, plazo, especies);
        if (mostrar) mostrarTabla(id);
        resolve(id);
      });
    } else if (mostrar) {
      // Si existe la muestro
      mostrarTabla(id);
      resolve(id);
    }
  });
}

// Creamos una tabla nueva
function crearTabla(id, nombre, plazo) {
  // 1 - CREAMOS LA TABLA
  let tabla = htabla.cloneNode(true);
  tabla.id = id;
  if(plazo) tabla.dataset.plazo = plazo;
  if(nombre) tabla.dataset.nombre = nombre;
  // 2 -EVENTO SORT
  let tbody = tabla.querySelector('tbody'), ths = tabla.querySelectorAll('th'), len=ths.length;
  for(let pos=0;pos<len;pos++) {
    let th = ths[pos];
    th.onclick = function(e){
      let tr = tbody.querySelector('tr');
      sortTableByColumn(tr.children[pos+(pos==0?1:3)],th);
    }
  }
  // 3 - INSERT INTO DOM;
  htabla.before(tabla);
  return tabla;
}

// Dibujar la tabla
function dibujarTabla(id, nombre, plazo, especies) {

  let tabla = crearTabla(id, nombre, plazo), especie, especiePlazo, descripcion, moneda, filas = '', tbody = tabla.querySelector('tbody');

  for (let e of especies) {

    e[2] = plazo;

    // ['ALUA', 'descripcion', 48, 799, 57.400, 57.500, 6826, 57.200, 58500, 57870, 7.533.000, 272, 1627503508416]
    especie = e[0];

    descripcion = e[1]; e.splice(1,1); // obtenerlo y eliminarlo


    especiePlazo = e[0] + e[1]; // especie+plazo

    moneda = e.pop();
    
    e[11] = obtenerHora(e[11]);

    e[1] += 'Hs';

    // agregamos la estrella al inicio
    e.unshift(
      `<div><i id="F${id+especie}" class="material-icons md-18 icon-line-yellow">star${hayFavSeleccionado(nombre,especie, plazo)?'':'_border'}</i></div>`,
      e[0], // especie
      `<a onclick="crearGraficoTradingView('${e[0]}')">
          <div id="iconoGrafico">
              <i class="material-icons md-18 icono-grafico icon-line-gray">bar_chart</i>
          </div>
      </a>`
    );

    e[3] = `<a href="#" data-bs-toggle="modal">
          <div id="iconoCompress">
              <i class="material-icons md-18 iconoCompress icon-line-gray">unfold_less</i>
          </div>
      </a>`;

    filas += `<tr id="${nombre+especiePlazo}" name="${especiePlazo}" data-descripcion="${descripcion}" data-moneda="${moneda}"><td>` + e.join('</td><td>') + '</td></tr>';
  }

  tbody.innerHTML = filas;

  agregarEventoFilaTabla(tabla);
}

// -------------------------------------------------------------------
// Blinker
// -------------------------------------------------------------------

// Se recibe una especie modificada
function addBlinker(dato) {
  // buscar nombre
  dato = [0,0,['ALUA','GGAL','BYMA', 'APLE'][Math.floor(Math.random() * 5)],[0,24,48][Math.floor(Math.random() * 3)]];
  let tr, trs = document.body.querySelectorAll('[name="' + dato[2] + dato[3] + '"]');
  for(tr of trs) {
    tr.children[6].dataset.seg = 0;
    tr.children[6].classList.add('blink');
    tr.children[7].dataset.seg = 0;
    tr.children[7].classList.add('blink');
  }
}


function removeBlinker(dato) {
  // buscar nombre
  let h, htmls = document.body.getElementsByClassName('blink');
  for(h of htmls) {
    let segundos = h.dataset.seg*1 + 1;
    h.dataset.seg = segundos;
    if (segundos > 3) h.classList.remove('blink');
  }
}

setInterval(addBlinker,1000);
setInterval(removeBlinker,1000);

// -------------------------------------------------------------------
// Tabla favoritos
// -------------------------------------------------------------------

/*{
  LIDER: { 
    ALUA:[48,24],
    BBAR:[48,24]
  },
  ADR: {ALUA:[48,24]}
}*/

function crearTablaFavoritos (id, tablas) {
  var trespecies=[], tabla, especie, plazo, plazos, htabla = crearTabla(id), tbody = htabla.querySelector('tbody');
  for(tabla in tablas){
    especies = tablas[tabla];
    for(especie in especies){
      plazos = especies[especie];
      for(plazo of plazos){
        htabla = document.getElementById(tabla+plazo);
        if (htabla) {
          // Buscar la fila y copiarla
          let tr = document.getElementById(tabla+especie+plazo);
          if (tr) trespecies.push(tr);
        } else {
          // Buscar la tabla y luego 
          console.log(tabla+especie+plazo,'buscar');
        }
      }
    }
  }
}

function sincronizarTablaFavoritos(){
  var trespecies=[], tabla, especie, plazo, plazos, buscarTablas = {};
  for (tabla in tablas) {
    especies = tablas[tabla];
    for(especie in especies){
      plazos = especies[especie];
      for(plazo of plazos){
        if (document.getElementById(tabla+plazo)) {
          // Buscar la fila
          let tr = document.getElementById(tabla+especie+plazo);
          if (tr) trespecies.push(tr);
        } else{
          // Buscar la tabla 
          buscarTablas[id] = [tabla, plazo];
        }
      }
    }
  }
}

