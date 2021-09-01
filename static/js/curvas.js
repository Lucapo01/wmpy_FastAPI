
let updateMenu = true;

function actualizarCurvas() {
    APIGetDatosCurvas()
        .then(json => {

            json = json.Graficos;

            if (updateMenu) {
                crearMenu(json);
                updateMenu = false;
            }

            let graf = procesarGraficoFilas(Object.values(json)[0]);

            graf.titulo = json[0][0].titulo;

            graficar(graf);

            bodyTabCierre.innerHTML = graf.filas;

        }).catch(err => console.error(err));
}

function procesarGraficoFilas(datos = []) {

    var lenGraficos = datos.length, series = [], filas = [];

    for (let i = 0; i < lenGraficos; i++) {

        let lenPuntos = datos[i].puntos.length;
        let puntos = datos[i].puntos;
        let data = [];
        let dataPolinomial = [];
        let resultPolinomial = [];
        let curva = [];

        for (let j = 0; j < lenPuntos; j++) {
            dataPolinomial.push([datos[i].puntos[j].dm, datos[i].puntos[j].tir]);

            data.push({
                "x": datos[i].puntos[j].dm,
                "y": datos[i].puntos[j].tir,
                "z": datos[i].puntos[j].detalle,
                "a": datos[i].puntos[j].fecactual,
                "b": datos[i].puntos[j].pactual,
                "dataLabels": {
                    enabled: true,
                    format: datos[i].puntos[j].ticker.toUpperCase(),
                    style: {
                        font: 'bold 18px "Trebuchet MS", roboto, sans-serif',
                        color: 'white',
                    },
                    y: -5

                }
            });

            filas.push('<tr><td>' + [j, puntos[j].ticker, puntos[j].tir, puntos[j].dm].join('</td><td>') + '</td></tr>');

        }

        resultPolinomial = regression.polynomial(dataPolinomial, { order: 2, precision: 20 });

        for (let i = 0; i < resultPolinomial.points.length; i++) {
            let x = resultPolinomial.points[i][0];
            let y = resultPolinomial.points[i][1];

            curva.push([x, y]);
        }

        console.log(curva)
        colores = ['#2a9d8f', '#e76f51', '#264653', '#28E', '#4A0'];
        series.push(
            {
                "type": 'scatter',
                "name": datos[i].nombre,
                "data": data,
                "marker": {
                    radius: 6
                },
                "color": colores[i],
            },
            {

                "name": datos[i].nombre,
                "color": colores[i],
                "dashStyle": "Dash",
                "type": 'spline',
                "data": curva,
                "showInLegend": false

            }
        )
    }

    return {
        series,
        filas: filas.join('')
    }
}

// -------------------------------------------------------------------
// Tradingview
// -------------------------------------------------------------------

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// crearGraficoTradingView('SYMBOL')
function crearGraficoTradingView(symbol) {
    var widget = window.tvWidget = new TradingView.widget({
        fullscreen: true,
        symbol: symbol,
        interval: '1D',
        container: "tradingView",
        datafeed: new Datafeeds.UDFCompatibleDatafeed("http://localhost:8000"),
        library_path: "charting_library/",
        locale: getParameterByName('lang') || "en",
        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["study_templates"],
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: "1.1",
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        theme: getParameterByName('theme'),
    });
};
