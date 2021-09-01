var ventanaOrden,
    divComprar = document.getElementById('divComprar'),
    divVender = document.getElementById('divVender'),
    divBotoneras = document.getElementById('divBotoneras'),
    ventanaOrdenes = document.getElementById('ventanaOrdenes');

function cargarSelectorEsp(tr, esp) {
    selectorEspecie.innerHTML = '';
    var select = tr.children[0].innerHTML + ' ' + tr.children[2].innerHTML,
        trs = tr.parentElement.children;
    for (tr of trs) {
        let tds = tr.children,
            opt = document.createElement('option'),
            nombre = tds[0].innerHTML + ' ' + tds[2].innerHTML;
        opt.innerHTML = nombre;
        if (select == nombre)
            opt.selected = true;
        selectorEspecie.append(opt);
    }
}

// cambiar la orden
function ventanaCrearOrden(h, e) {

    cargarSelectorEsp(h.parentElement.parentElement, e);

    //var especie = celda.parentElement.parentElement.id;
    ventanaOrdenes.style.display = 'block';
    cancelOrdenCV();
    ventanaOrden = alertify.confirm(ventanaOrdenes, function () {
        alertify.confirm('aaa', '¿Confirma la operacion?<br><h5>delete</h5>');
        alertify.success('Agregado a favoritos');
        ventanaOrdenes.style.display = 'none';
    }, function () {
        //alertify.error('VENDER');
        ventanaOrdenes.style.display = 'none';
    }).set({ labels: { ok: '', cancel: '' }, padding: false })
        .setHeader('<em> Nueva orden </em> ');

    document.getElementsByClassName('ajs-footer')[0].style.display = 'none';

}

const PRECIO = 0, MONTO = 1, CANTIDAD = 2;

var ordenSelect = MONTO;

function onchangeOrden(tipo) {
    switch (tipo) {
        case PRECIO:
            if (ordenSelect == MONTO)
                ordenMonto.value = (ordenPrecio.value * 1) * (ordenCantidad.value * 1);
            else
                ordenMonto.value = (ordenCantidad.value * 1) / (ordenPrecio.value * 1);
            break;
        case CANTIDAD:
            ordenSelect = tipo;
            ordenTituloMonto.style = 'color:orangered';
            ordenTituloCantidad.style = '';
            ordenMonto.value = (ordenPrecio.value * 1) * (ordenCantidad.value * 1);
            break;
        case MONTO:
            ordenSelect = tipo;
            ordenTituloMonto.style = '';
            ordenTituloCantidad.style = 'color:orangered';
            ordenCantidad.value = (ordenMonto.value * 1) / (ordenPrecio.value * 1);
            break;
    }

}

var ventanaOrden;

function ventanaAceptarOrden() {
    //var especie = celda.parentElement.parentElement.id;
    ventanaOrdenes.style.display = 'block';
    ventanaOrden = alertify.confirm(htmlVentanaAceptarOrden, function () {
        alertify.success('Agregado a favoritos');
        ventanaOrdenes.style.display = 'none';
    }, function () {
        alertify.error('VENDER');
        ventanaOrdenes.style.display = 'none';
    }).set({ labels: { ok: 'Aceptar', cancel: 'Cancelar' }, padding: false })
        .setHeader('<em> Nueva orden </em> ');
}

function clickBtnCV(comprar) {

    const MSG = 'Ingrese un valor mayor a cero';

    var form = ventanaOrdenes.getElementsByTagName('form')[0],
        [precio, cantidad, monto] = ventanaOrdenes.getElementsByTagName('input');


    if (precio.value * 1 <= 0) {
        precio.setCustomValidity(MSG);
        precio.reportValidity();
    } else if (cantidad.value * 1 <= 0) {
        cantidad.setCustomValidity(MSG);
        cantidad.reportValidity();
    } else if (monto.value * 1 <= 0) {
        monto.setCustomValidity(MSG);
        monto.reportValidity();
    } else {
        let c, p;
        divBotoneras.style.display = 'none';
        if (comprar) {
            divComprar.style.display = 'block';
            [c, p] = divComprar.getElementsByTagName('b');
        } else {
            divVender.style.display = 'block';
            [c, p] = divVender.getElementsByTagName('b');
        }
        c.innerText = cantidad.value;
        p.innerText = precio.value;
    }
}

function cancelOrdenCV() {
    divComprar.style.display = 'none';
    divVender.style.display = 'none';
    divBotoneras.style.display = '';
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

let operaciones = []

function emitirOrdVender(especie,plazo, moneda) {

    let precio = parseInt(document.getElementById("ordenPrecio").value),
        cantidad = parseInt(document.getElementById("ordenCantidad").value),
        monto = parseInt(document.getElementById("ordenMonto").value),
        tipoOrden = document.getElementById("ordenTipo").value,
        vencimiento = document.getElementById("ordenVencimiento").value;

    let orden = {
        tipo: 'Venta',
        moneda: moneda,
        tipoOrden: tipoOrden,
        activo: especie,
        plazo: plazo,
        cantAmostrar:1,
        vencimiento: vencimiento,
        precio: precio,
        cantidad: cantidad,
        monto: monto
    };

    if (!(precio*1) || !(cantidad*1) || !(monto*1)) {
        return alertify.error('Se requiere completar el campo');
    }
    
    APIEmitirOrden(orden).then( response => {
        console.log(response);
        operaciones.push(orden);
        if (response.mensaje["estado"]) {
            alertify.success('ORDEN EMITIDA');
        } else {
            alertify.error(response.mensaje["mensaje"] + " " + response.mensaje["diferencia"]);
        }
    });

}


function emitirOrdComprar(especie,plazo, moneda) {

    let precio = parseInt(document.getElementById("ordenPrecio").value),
        cantidad = parseInt(document.getElementById("ordenCantidad").value),
        monto = parseInt(document.getElementById("ordenMonto").value),
        tipoOrden = document.getElementById("ordenTipo").value,
        vencimiento = document.getElementById("ordenVencimiento").value;

    let orden = {
        tipo: 'Compra',
        moneda:moneda,
        activo: especie,
        plazo: plazo,
        tipoOrden: tipoOrden,
        vencimiento: vencimiento,
        precio: precio,
        cantAmostrar:1,
        cantidad: cantidad,
        monto: monto
    };

    if (!(precio*1) || !(cantidad*1) || !(monto*1)) {
        return alertify.error('Se requiere completar el campo');
    }

    APIEmitirOrden(orden).then( response => {
        console.log(response);
        operaciones.push(orden);
        if (response.mensaje["estado"]) {
            alertify.success('ORDEN EMITIDA' + response.mensaje["mensaje"]);
        } else {
            alertify.error(response.mensaje["mensaje"] + " " + response.mensaje["diferencia"]);
        }
    });

}
