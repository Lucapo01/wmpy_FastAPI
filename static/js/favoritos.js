
// -------------------------------------------------------------------
// FAVORITOS
// -------------------------------------------------------------------

let FAVORITOS = {}, hcheckboxFav = checkboxFav, conteinerItemsFavs = itemsFavs, htmlFavoritos = trFavoritos;

trFavoritos.remove();

// Cargar favoritos desde el servidor y setear html favoritos
function iniciarFavoritos(){
    return APIGetFavoritos().then(fav => {
        FAVORITOS = fav || {};
        // POR CADA FAV CREAR UNA TABLA
        datos => dibujarTabla ('PANEL_GENERAL', datos);
        // Agregar los favoritos a la configuracion HTML
        setFavoritosHTML();
        // Crear link menu tablas
        crearMenuTablasFav();
    })
}

function crearMenuTablasFav() {
    // Crear las tablas favoritos
    for(fav in FAVORITOS) {
        //crearTablaFavoritos('_'+fav,FAVORITOS[fav]);
        crearMenuTabla('_'+fav,0,0,'color:#a7a71a');
    }
}

// indica si la especie id esta asociada a un favorito
function hayFavSeleccionado(tabla,especie,plazo) {
    for(let categoria in FAVORITOS) {
        if (estaFavSeleccionado(categoria,tabla,especie,plazo)) {
            return true;
        }
    }
}

function estaFavSeleccionado(categoria,tabla,especie,plazo){
    let plazos = (FAVORITOS[categoria][tabla] || [])[especie];
    if (plazos && plazos.indexOf(plazo*1)>=0) {
        return true;
    }
}

// Setear diseño favorito a partir de las categorias
function setFavoritosHTML () {
    for(let categoria in FAVORITOS) {
        //FAVORITOS[nombre]
        insertItemFavHTML(categoria);   
    }
}

function insertItemFavHTML(categoria) {
    let hfav = itemFav.cloneNode(true), text = document.createTextNode(categoria);
    hfav.id = 'idFav'+categoria;
    hfav.children[0].onclick = function() {
        console.log(this)
        this.parentElement.remove();
        document.getElementById("_mnuTabla_"+categoria).remove();
        deleteFavorito = true;
    }
    hfav.prepend(text);
    hfav.classList.remove('ocultar');
    itemFav.parentElement.append(hfav);
}

function insertarFavEnDesplegable(h,tabla,especie,plazo){
    conteinerItemsFavs.innerHTML = '';
    for(let categoria in FAVORITOS) {
        let divCheckbox = hcheckboxFav.cloneNode(true),
            checkbox = divCheckbox.children[0], 
            especiesFav = FAVORITOS[categoria][tabla],
            id='cx'+categoria;
        divCheckbox.classList.remove('d-none');
        divCheckbox.children[1].for = id;
        divCheckbox.children[1].innerHTML = categoria;
        checkbox.id = id; 
        checkbox.checked = estaFavSeleccionado(categoria,tabla,especie,plazo);
        checkbox.onclick = function(evto) {
            if (this.checked) {
                if (!especiesFav) {
                    especiesFav =  FAVORITOS[categoria][tabla] = {};
                }
                // agregamos
                if (especiesFav[especie]) 
                    especiesFav[especie].push(plazo);
                else {
                    especiesFav[especie] = [plazo];
                }
            } else {
                // eliminamos
                especiesFav[especie].splice(especiesFav[especie].indexOf(plazo),1);
                if (especiesFav[especie].length==0) {
                    delete especiesFav[especie];
                } 
            }
            document.getElementById('F'+tabla+plazo+especie).innerHTML = 'star' + (hayFavSeleccionado(tabla,especie,plazo)?'':'_border');
            APISetFavoritos(FAVORITOS);
        };
        conteinerItemsFavs.append(divCheckbox);   
    }
    h.append(htmlFavoritos);
}

function existeFavorito(especie,fav){
    var b;
    if(fav){
        b = favoritos[fav].especies.indexOf(especie)>=0;
    }else{
        b = getFavoritos(especie).length>0;
    }
    return b;
}

function agregarFavorito(especie,nombre){
    favoritos[nombre].especies.push(especie);
}

function eliminarFavorito(especie,nombre){
    if(favoritos[nombre].especies.indexOf(especie)>=0)
        favoritos[nombre].especies.splice(favoritos[nombre].especies.indexOf(especie),1);
}

function ventanaAgregarFavoritos(){
    htmlVentanaFavorito.style.display = 'block';
    alertify.confirm(htmlVentanaFavorito, function(){
        let nombre = inputNombreFiltro.value.toUpperCase();
        //htmlVentanaFavorito.style.display = 'none';
        if(!nombre){
            alertify.error('Nombre invalido');
            return false;
        }else if(nombre in FAVORITOS){
            alertify.error('Favorito existente');
            return false;
        }else{
            inputNombreFiltro.value='';
            FAVORITOS[nombre] = {};
            crearMenuTabla('_'+nombre,0,0,'color:#a7a71a');
            APISetFavoritos(FAVORITOS).then( guardado => {
                if(guardado){
                    alertify.success('Favorito creado con exito');
                    insertItemFavHTML(nombre);
                }else{
                    alertify.error('No se pudo crear el Favorito');
                }
            });
        }
    },function(){
        htmlVentanaFavorito.style.display = 'none';
    }).set({labels:{ok:'Aceptar', cancel: 'Cancelar'}, padding: false, transition:'fade'})
    .setHeader('<h4><i class="material-icons" style="color: rgb(255, 255, 0);">star</i> Mis favoritos</h4>')
}

function cargarOpcionMnuFavorito(fav,nombre){
    let div = document.getElementById('compFavorito').cloneNode(true);
    div.id = '';
    div.classList.add(fav.color);
    div.style = "display:block";
    div.getElementsByTagName('strong')[0].innerText = nombre;
    div.onclick = () => {
        debugger;
        cambiarVista(PREFIJO_FAV+nombre);
    }
    div.children[1].onclick = () => {
        delete favoritos[nombre];
        setFavToServer();
    }
    hOpMenu.append(div);
    //contenedorTabla.append(generarTablaFavorito(fav,{},nombre));
}

menuFav.onclick = ventanaAgregarFavoritos;

function cargarTablasFavorito(fav,nombre){
    contenedorTablaFav.append(generarTablaFavorito(fav,{},nombre));
}
