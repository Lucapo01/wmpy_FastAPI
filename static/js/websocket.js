
function llenarTabla(user_id) {
    $.get('/getVentaUser?user=' + user_id, function (data) {
        $('#tableBody').empty();
        data.forEach(dato => {
            console.log(dato.status);
            if (!(dato.cantidad == dato.ejecutados)){
                let fix_id = dato.fix_id
                //$('#tableBody').append('<tr><td>' + dato.status + '</td><td>' + dato.activo + '</td><td>' + dato.precio + '</td><td>' + dato.cantidad + '</td><td>' + dato.monto + '</td><td>' + dato.tipo_de_orden + '</td><td>' + dato.vencimiento + '</td><td>' + dato.tipo + '</td><td>' + dato.ejecutados + '</td><td><button data-id="' + dato.fix_id + '" type="button" onclick="deleteOperacion(fix_id)" class="btn btn-danger">CANCELAR</button></td></tr>');
                $('#tableBody').append("<tr><td>" + dato.status + "</td><td>" + dato.activo + "</td><td>" + dato.precio + "</td><td>" + dato.cantidad + "</td><td>" + dato.monto + "</td><td>" + dato.tipo_de_orden + "</td><td>" + dato.vencimiento + "</td><td>" + dato.tipo + "</td><td>" + dato.ejecutados + "</td><td><button data-id='" + dato.fix_id + "' type='button' onclick='deleteOperacion(\""+fix_id+"\")' class='btn btn-danger'>CANCELAR</button></td></tr>");
            }
        });
    });
}

var chatSocket = new WebSocket('ws://' + window.location.host + '/socketcluster/');

chatSocket.onmessage = function (e) { // Cuando llega un mensaje del canal del ws
    let dato = JSON.parse(e.data);  // Primero lo convierto a JSON
    //console.log(dato)
     if (dato.hasOwnProperty("id")) { // Pregunto si ese JSON tiene el atributo id para poder diferenciar el tipo de mensaje.
        console.log(dato);
        // console.log(getUSerID());
        // console.log(dato.id);
        //  if (getUSerID() == dato.id) {

             llenarTabla(dato.id); // Hace que se actualize la tabla cuando el ws lo pide.
        //  }
     } else { //Mete el array de datos que llega del ws a la tabla y actualiza los valores.
        addBlinker(dato);
     }
    //     dato = dato.message;
    //     if (dato.shift() == canal) return
    //     if (dato[2]) {
    //         valor = dato[2];
    //     } else if (dato[3]) {
    //         valor = dato[3];
    //     } else if (dato[4]) {
    //         valor = dato[4];
    //     } else {
    //         return;
    //     }

    //     //var valor = dato.qy;
    //     if (valor > 100 && valor < 200) {
    //         valor = [valor, 'background:red'];
    //     } else if (valor > 250 && valor < 500) {
    //         valor = [valor, 'background:green'];
    //     } else {
    //         valor = [valor, 'background:#27293d'];
    //     }

    //     setDatoFilaTabla(dato, datosVirtuales[canal]);
    // }
   
};

// chatSocket.onclose = function (e) {
//     console.error('Chat socket closed unexpectedly');
// };
