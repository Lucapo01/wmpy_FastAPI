
function TEST() {}

function API(url, dato, metodo='POST'){
    if ( TEST(url,dato) ) return TEST(url,dato);
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest, csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
      xhttp.open(metodo, url, true);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.setRequestHeader("X-CSRFToken", csrftoken);
      xhttp.onreadystatechange = (() => {
          if (xhttp.readyState === 4) {
              (xhttp.status == 200)
                  ? resolve(JSON.parse(xhttp.responseText))
                  : reject(new Error('Error ', url))
          }
      });
      xhttp.send(dato?`0=`+JSON.stringify(dato):undefined);
  });
}

function APIJquery(metodo, url, dato) {
    return new Promise( resolve => {
        //dataPost.activo = '1';
        let csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
        $.ajax({
            type: metodo, //'POST',
            url: window.location.origin + url, //"/testSave",
            data: JSON.stringify(dato),
            success: resolve,
            error: e =>console.log(e)
        });
    });
}

const APIGetDatosCurvas = () => API('/getDatosCurvas');
const APIGetEspecies = (tabla,plazo) => API('/especies', [tabla,plazo]);
const APIGetEspecie = especies => API('/especie', especies);
const APIHistoricoEspecie = (especie) => API('/historicoEspecie',especie);
const APIGetDatosTenencia = () => API('/getDatosTenencia');
const APIGetDatosComitente = () => API('/getDatosComitente');
const APIGetProfundidad = (especie,plazo) => API('/GetProfundidad');
const APIEmitirOrden = orden => APIJquery('/emitirOrden',orden);
const APIGetOperaciones = () => API('/getDatosOperaciones');
const APIGetFavoritos = () => API('/getFav');
const APISetFavoritos = favoritos => API('/setFav',favoritos);
