
function crearMenu(json) {
    var ul = document.getElementById('listCurvas');
    var liModelo = document.getElementById('curvasMenu_bonosUsd');
    if (ul.childElementCount == 1) {
        for (let grafico in json) {
            var li = liModelo.cloneNode(true);
            li.style = "";
            li.id = "";
            li.children[0].textContent = json[grafico][0].titulo;
            li.onclick = () => {
                // let activos = document.getElementsByClassName("active");
                // activos[grafico].classList.remove('active');
                mostrarOcultar(document.getElementById('curvas'));
                // li.classList.add('active');
                // tituloGrafico.innerText = grafico + ' / ';
                var graf = procesarGraficoFilas(json[grafico]);
                graf.titulo = json[grafico][0].titulo;
                graficar(graf);
                bodyTabCierre.innerHTML = graf.filas;

            }
            ul.append(li);
        }
    }
}

var asideMenu = document.getElementById("asideMenu");

function collapse() {
    // debugger
    asideMenu.classList.toggle("asideMenu--collapsed");

    bootstrap.Tooltip.disable(tooltipTriggerEl);


}

function mostrarOcultar(seccion, subseccion) {
    let visibles = document.getElementsByClassName("mostrar");
    for (var i = 0; i < visibles.length; i++) {
        visibles[i].classList.add("ocultar");
        visibles[i].classList.remove("mostrar");
    }
    seccion.classList.remove("ocultar");
    seccion.classList.add("mostrar");
    if (subseccion) {
        subseccion.classList.remove("ocultar");
        subseccion.classList.add("mostrar");
    }

}

menuPaneles.onclick = function () {
    mostrarOcultar(document.getElementById('paneles'));
}

menuOrdenes.onclick = function () {
    mostrarOcultar(document.getElementById('ordenes'));
}

menuCurvas.onclick = function () {
    mostrarOcultar(document.getElementById('curvas'));
}

menuGraficos.onclick = function () {
    mostrarOcultar(document.getElementById('graficos'));
}

menuBooks.onclick = function () {
    mostrarOcultar(document.getElementById('books'));
}

menuPerfil.onclick = function () {
    mostrarOcultar(document.getElementById('perfil'));
}

menuPanelesNav.onclick = function (evto) {
    let a = evto.target, nombre = a.dataset.nombre;
    if (nombre) {
        let activo = this.getElementsByClassName("active")[0];
        if (activo) activo.classList.remove("active");
        a.classList.add('active');
        sincronizarTabla(nombre, PLAZO_ACTUAL);
    }
};

// -------------------------------------------------------------------
// Menu tablas
// -------------------------------------------------------------------

function crearMenuTabla(nombre, plazo='', active='', style='') { //#a7a71a
    //let id = nombre+plazo;
    listPaneles.innerHTML += `<li id="_mnuTabla${nombre}" class="nav-item">
    <a class="btn btn-sm btn-outline-secondary ${active}" style="${style}" href="#" data-nombre="${nombre}">${nombre.replace(/_/g, ' ')}</a>
    </li>`;
    // <a class="nav-link ${active}" style="${style}" href="#" data-nombre="${nombre}">${nombre.replace(/_/g,' ')}</a>
}

// -------------------------------------------------------------------
// Curvas
// -------------------------------------------------------------------


function graficar(grafico) {
    // debugger
    Highcharts.chart('chartdiv', {

        colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
            "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 0, 400],
                stops: [
                    [0, 'rgb(14, 23, 38)'],
                    [1, 'rgb(48, 48, 61)']
                ]
            },
            borderWidth: 0,
            borderRadius: 15,
            plotBackgroundColor: null,
            plotShadow: false,
            plotBorderWidth: 0
        },
        title: {

            text: grafico.titulo,
            style: {
                color: '#FFF',
                font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: '#DDD',
                font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
        },
        xAxis: {
            gridLineWidth: 0,
            lineColor: '#999',
            tickColor: '#999',
            labels: {
                style: {
                    color: '#999',
                    fontWeight: 'bold'
                }
            },
            title: {
                text: 'Duration (años)',
                style: {
                    color: '#AAA',
                    font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                }
            }
        },
        yAxis: {
            alternateGridColor: null,
            minorTickInterval: null,
            gridLineColor: 'rgba(255, 255, 255, .1)',
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                style: {
                    color: '#999',
                    fontWeight: 'bold'
                }
            },
            title: {
                text: 'TIR %',
                style: {
                    color: '#AAA',
                    font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                }
            }
        },
        legend: {
            itemStyle: {
                color: '#CCC'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#333'
            }
        },
        credits: {
            style: {
                right: '50px'
            }
        },
        labels: {
            style: {
                color: '#CCC'
            }
        },
        tooltip: {
            valueDecimals: 2,
            backgroundColor: {
                linearGradient: [0, 0, 0, 400],
                stops: [
                    [0, 'rgb(14, 23, 38)'],
                    [1, 'rgb(48, 48, 61)']
                ]
            },
            style: {
                color: '#FFF'
            }
        },

        toolbar: {
            itemStyle: {
                color: '#CCC'
            }
        },

        plotOptions: {
            series: {

                cursor: 'pointer',
                events: {

                    click: function (event) {
                        // debugger
                        const popup = document.getElementById('modalTicker');
                        // event.target = popup;
                        
                        alertify.alert(
                            
                            '<b> TICKER: </b>' + event.point.dataLabel.textStr + '<br>' +
                            '<b> DETALLE: </b>' + event.point.z + '<br>' + '<br>' +
                            '<b> TIR: </b>' + event.point.y + ' %<br>' +
                            '<b> DM: </b>' + event.point.x + '<br>' +
                            '<b> FECHA: </b>' + event.point.a + '<br>' +
                            '<b> PRECIO: </b>' + event.point.b + '<br>'
                            
                        ).set({transition:'fade'})
                        .setHeader('<h4>' + this.name + ' - ' + event.point.dataLabel.textStr +  '</h4>');
                        ;
                        console.log("detall");
                        console.log(event.point);

                    }
                }
            }
        },

        series: grafico.series

    });
}

