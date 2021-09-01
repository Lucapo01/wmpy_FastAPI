window.onload = function () {
    document.getElementById("contenedor-loader").remove();
    document.getElementById("contenedor-main").style = '';
    //var contenedor = document.getElementById("contenedor-loader");
    //contenedor.style.visibility = "hidden";
    // contenedor.style.display = "none";
    //contenedor.style.opacity = 0;

    // -------------------------------------------------------------------
    // Publicidad
    // -------------------------------------------------------------------

    alertify.error('<img src="https://http2.mlstatic.com/D_NQ_NP_658011-MLA32927632083_112019-O.webp" style="width:100%">');

}

if((this.ARR_TEST||[]).length==0){
    
    document.getElementById("asideMenu").style.display="none";
    document.getElementById("paneles").classList.remove("mostrar");
    document.getElementById("paneles").classList.add("ocultar");
    document.getElementById("curvas").classList.remove("ocultar");
    document.getElementById("curvas").classList.add("mostrar");

    
}else{

// -------------------------------------------------------------------
// Menu de las tablas
// -------------------------------------------------------------------

crearMenuTabla('LIDER',48,'active'); 
crearMenuTabla('PANELGENERAL',48);
crearMenuTabla('ADR',24);
crearMenuTabla('RENTAFIJA',24);
crearMenuTabla('ON',24);
crearMenuTabla('CAUCION',24);
crearMenuTabla('LETRAS',24);
crearMenuTabla('OPCIONES',24);

// -------------------------------------------------------------------
// Favoritos y Sincronizamos la tabla inicial
// -------------------------------------------------------------------

iniciarFavoritos().then(()=>sincronizarTabla('LIDER',48));

// -------------------------------------------------------------------
// CANALES Y ACTUALIZACIONES DE LAS TABLAS
// -------------------------------------------------------------------

setInterval(function () {
    spanConexion.style = 'background:' + (chatSocket.readyState == 1 ? 'green' : 'red');
  }, 1000)


// -------------------------------------------------------------------
// DATOS DEL PERFIL
// -------------------------------------------------------------------

APIGetDatosTenencia().then(datos => dibujarTablaTenencia(datos));
APIGetDatosComitente().then(datos => completarFormComitente(datos));


}

// Al iniciar solicitar los datos de la curva

// -------------------------------------------------------------------
// Datos de las curvas en segundo plano
// -------------------------------------------------------------------

actualizarCurvas();

setInterval(actualizarCurvas, 60000);

// -------------------------------------------------------------------
// Inicializa tooltips Bootstrap
// -------------------------------------------------------------------

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

