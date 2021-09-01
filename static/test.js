// panel.html?test=getDatosCurvas,especies,getDatosTenencia,getDatosComitente

this.ARR_TEST = (test => /test=/.test(test) ? test.substr(6).split(',') : [])(window.location.search);

if (this.ARR_TEST.length)
  document.title = 'Robin TESTING';

function TEST(url, dato) {
  console.log('API', url, dato || '');
  url = url.substr(1);
  if (TEST_DATOS_API[url] && ARR_TEST.indexOf(url) >= 0) {
    let respuesta = JSON.parse(JSON.stringify(TEST_DATOS_API[url]));
    switch (url) {
      case 'especies': respuesta[0][2] = Math.ceil(Math.random() * 100); break;
      case 'especie': debugger
        let _especie = JSON.parse(JSON.stringify(TEST_DATOS_API.especies))[0];
        for (d of dato) {
          especie = JSON.parse(JSON.stringify(TEST_DATOS_API.especies))[0];
          especie[0] = d[0];
          especie[1] = d[1];
          respuesta.push(especie);
        }
        break;
      default: break;
    }
    return new Promise(r => r(respuesta));
  }
}

const TEST_DATOS_API = {
  'getDatosCurvas': { "Graficos": [[{ "titulo": "BADLAR", "nombre": "Curva Badlar", "puntos": [{ "dm": 0.07, "ticker": "tb21", "tir": 44.026, "detalle": "Bono en pesos BADLAR + 200bps Vto. 2021", "fecactual": "2021-07-07", "pactual": 105.75 }, { "dm": 0.36, "ticker": "bny22", "tir": 55.863, "detalle": "Bonos de deuda proveedores 2022 Neuquen", "fecactual": "2021-07-07", "pactual": 78.7 }, { "dm": 0.39, "ticker": "bdc22", "tir": 46.26, "detalle": "BDC22 - CDAD. BS. AS. 2022 $ BADLAR + 500pb", "fecactual": "2021-07-07", "pactual": 108.0 }, { "dm": 0.55, "ticker": "aa22", "tir": 44.93, "detalle": "Bono en pesos BADLAR + 200bps Vto. 2021", "fecactual": "2021-07-07", "pactual": 98.5 }, { "dm": 0.58, "ticker": "pr15", "tir": 46.211, "detalle": "Bono de Consolidaci\u00f3n - Serie 8", "fecactual": "2021-07-07", "pactual": 69.4 }, { "dm": 0.61, "ticker": "pby22", "tir": 51.654, "detalle": "PBY22 - PCIA. BS. AS. 2022 $ BADLAR + 383pb", "fecactual": "2021-07-07", "pactual": 99.5 }, { "dm": 0.63, "ticker": "bay23", "tir": 65.387, "detalle": "Bonos de deuda proveedores 2020 - Municipalidad de C\u00f3rdoba", "fecactual": "2021-07-07", "pactual": 90.0 }, { "dm": 1.37, "ticker": "bdc24", "tir": 53.388, "detalle": "BDC24 - CDAD. BS. AS. 2024 $ BADLAR + 325pb", "fecactual": "2021-07-07", "pactual": 89.75 }, { "dm": 1.44, "ticker": "pba25", "tir": 54.999, "detalle": "PBA25 - PCIA. BS. AS. 2025 $ 2025 BADLAR + 375pb", "fecactual": "2021-07-07", "pactual": 94.2 }, { "dm": 1.8, "ticker": "bdc28", "tir": 52.558, "detalle": "Bono en pesos BADLAR + 375bps Vto. 2028", "fecactual": "2021-07-07", "pactual": 90.5 }] }], [{ "titulo": "CER", "nombre": "Curva Cer", "puntos": [{ "dm": 0.04, "ticker": "tc21", "tir": -2.746, "detalle": "BONCER 2021", "fecactual": "2021-07-07", "pactual": 525.1 }, { "dm": 0.08, "ticker": "tx21", "tir": -0.684, "detalle": "Bono en pesos CER al 1% Vto. 2021", "fecactual": "2021-07-07", "pactual": 166.8 }, { "dm": 0.68, "ticker": "tx22", "tir": 2.49, "detalle": "Bono en pesos CER al 1,20% Vto. 2022", "fecactual": "2021-07-07", "pactual": 158.2 }, { "dm": 1.18, "ticker": "t2x2", "tir": 2.585, "detalle": "Bono en pesos CER al 1,30% Vto. 2022", "fecactual": "2021-07-07", "pactual": 149.4 }, { "dm": 1.57, "ticker": "tc23", "tir": 3.942, "detalle": "BONCER 2023", "fecactual": "2021-07-07", "pactual": 371.0 }, { "dm": 1.66, "ticker": "tx23", "tir": 4.004, "detalle": "Bono en pesos CER al 1,40% Vto. 2023", "fecactual": "2021-07-07", "pactual": 152.35 }, { "dm": 2.03, "ticker": "t2x3", "tir": 4.113, "detalle": "Bono en pesos CER al 1,45% Vto. 2023", "fecactual": "2021-07-07", "pactual": 137.0 }, { "dm": 2.59, "ticker": "tx24", "tir": 5.364, "detalle": "Bono en pesos CER al 1,40% Vto. 2024", "fecactual": "2021-07-07", "pactual": 143.6 }, { "dm": 2.83, "ticker": "t2x4", "tir": 9.475, "detalle": "Bono en pesos CER al 1,55% Vto. 2024", "fecactual": "2021-07-07", "pactual": 96.11 }, { "dm": 3.45, "ticker": "tc25p", "tir": 5.133, "detalle": "BONCER 2025", "fecactual": "2021-07-07", "pactual": 342.0 }, { "dm": 3.98, "ticker": "tx26", "tir": 7.102, "detalle": "Bono en pesos CER al 2% Vto. 2026", "fecactual": "2021-07-07", "pactual": 116.1 }, { "dm": 4.47, "ticker": "tx28", "tir": 8.242, "detalle": "Bono en pesos CER al 2,25% Vto. 2028", "fecactual": "2021-07-07", "pactual": 108.6 }, { "dm": 5.65, "ticker": "dicp", "tir": 8.811, "detalle": "Bono Discount en pesos Vto 2033", "fecactual": "2021-07-07", "pactual": 2369.0 }, { "dm": 9.42, "ticker": "parp", "tir": 11.065, "detalle": "Bono Cuasipar en pesos Vto 2045", "fecactual": "2021-07-07", "pactual": 887.0 }, { "dm": 10.8, "ticker": "cuap", "tir": 10.052, "detalle": "Bono Cuasipar en pesos Vto 2045", "fecactual": "2021-07-07", "pactual": 1345.0 }] }], [{ "titulo": "DOLAR", "nombre": "Curva Ley Nacional", "puntos": [{ "dm": 4.6, "ticker": "al29", "tir": 20.533, "detalle": "Bonar USD 2029 1%", "fecactual": "2021-06-23", "pactual": 39.21 }, { "dm": 4.96, "ticker": "al30", "tir": 19.675, "detalle": "Bonar USD 2030", "fecactual": "2021-06-23", "pactual": 37.3 }, { "dm": 6.57, "ticker": "ae38", "tir": 17.789, "detalle": "Bonar USD 2038", "fecactual": "2021-06-23", "pactual": 37.9 }, { "dm": 7.52, "ticker": "al41", "tir": 15.569, "detalle": "Bonar USD 2041", "fecactual": "2021-06-23", "pactual": 36.9 }, { "dm": 7.82, "ticker": "al35", "tir": 16.809, "detalle": "Bonar USD 2035", "fecactual": "2021-06-23", "pactual": 33.81 }] }, { "titulo": "DOLAR", "nombre": "Curva Ley Extranjera", "puntos": [{ "dm": 4.69, "ticker": "gd29", "tir": 18.694, "detalle": "New USD 2029 1%", "fecactual": "2021-06-23", "pactual": 42.4 }, { "dm": 5.01, "ticker": "gd30", "tir": 18.656, "detalle": "New USD 2030", "fecactual": "2021-06-23", "pactual": 39.09 }, { "dm": 6.75, "ticker": "gd38", "tir": 16.642, "detalle": "New USD 2038", "fecactual": "2021-06-23", "pactual": 40.68 }, { "dm": 7.11, "ticker": "gd46", "tir": 16.428, "detalle": "New USD 2046", "fecactual": "2021-06-23", "pactual": 35.03 }, { "dm": 7.64, "ticker": "gd41", "tir": 14.999, "detalle": "New USD 2041", "fecactual": "2021-06-23", "pactual": 38.42 }, { "dm": 7.87, "ticker": "gd35", "tir": 16.452, "detalle": "New USD 2035", "fecactual": "2021-06-23", "pactual": 34.7 }] }], [{ "titulo": "ON", "nombre": "Curva ON", "puntos": [{ "dm": -0.02, "ticker": "jhceo", "tir": 33.301, "detalle": "John Deere", "fecactual": "2021-07-06", "pactual": 98.0 }, { "dm": -0.01, "ticker": "mtcfo", "tir": -33.346, "detalle": "Mastellone", "fecactual": "2021-07-06", "pactual": 108.0 }, { "dm": 0.08, "ticker": "vsc1o", "tir": -22.861, "detalle": "Vista Oil & Gas", "fecactual": "2021-07-06", "pactual": 103.8 }, { "dm": 0.5, "ticker": "gnclo", "tir": 8.544, "detalle": "Genneia", "fecactual": "2021-07-06", "pactual": 104.2 }, { "dm": 1.01, "ticker": "vsc2d", "tir": 6.103, "detalle": "Vista Oil & Gas", "fecactual": "2021-07-06", "pactual": 104.0 }, { "dm": 1.23, "ticker": "irc8o", "tir": 6.609, "detalle": "IRSA SA", "fecactual": "2021-07-06", "pactual": 106.0 }, { "dm": 1.24, "ticker": "gncwo", "tir": 6.924, "detalle": "Genneia", "fecactual": "2021-07-06", "pactual": 108.25 }, { "dm": 1.3, "ticker": "lms1o", "tir": 3.079, "detalle": "Aluar", "fecactual": "2021-07-06", "pactual": 106.5 }, { "dm": 1.33, "ticker": "ttc1o", "tir": 5.517, "detalle": "Tecpetrol", "fecactual": "2021-07-06", "pactual": 102.0 }, { "dm": 1.41, "ticker": "pqcdo", "tir": 7.424, "detalle": "PCR", "fecactual": "2021-07-06", "pactual": 104.25 }, { "dm": 1.46, "ticker": "csdoo", "tir": 8.875, "detalle": "Cresud", "fecactual": "2021-07-06", "pactual": 99.25 }, { "dm": 1.47, "ticker": "irc9o", "tir": 8.115, "detalle": "IRSA SA", "fecactual": "2021-07-06", "pactual": 104.75 }, { "dm": 1.51, "ticker": "rpc2o", "tir": 10.793, "detalle": "IRCP", "fecactual": "2021-07-06", "pactual": 99.8 }, { "dm": 1.51, "ticker": "ttc4o", "tir": 4.47, "detalle": "Tecpetrol", "fecactual": "2021-07-06", "pactual": 100.0 }, { "dm": 1.55, "ticker": "ypcud", "tir": 13.328, "detalle": "YPF", "fecactual": "2021-07-06", "pactual": 95.7 }, { "dm": 1.81, "ticker": "ptsto", "tir": 6.627, "detalle": "Pampa Energ\u00eda", "fecactual": "2021-07-06", "pactual": 105.0 }, { "dm": 1.82, "ticker": "rcc9o", "tir": 4.464, "detalle": "Arcor", "fecactual": "2021-07-06", "pactual": 106.0 }, { "dm": 2.18, "ticker": "pnc9o", "tir": 3.726, "detalle": "PAE", "fecactual": "2021-07-06", "pactual": 106.0 }, { "dm": 2.2, "ticker": "cp17o", "tir": 10.735, "detalle": "CGC", "fecactual": "2021-07-06", "pactual": 100.9 }, { "dm": 2.43, "ticker": "vsc3o", "tir": 5.776, "detalle": "Vista Oil & Gas", "fecactual": "2021-07-06", "pactual": 96.0 }, { "dm": 2.52, "ticker": "cac2o", "tir": 7.799, "detalle": "Capex", "fecactual": "2021-07-06", "pactual": 99.0 }, { "dm": 3.09, "ticker": "yca6p", "tir": 14.525, "detalle": "YPF", "fecactual": "2021-07-06", "pactual": 87.0 }, { "dm": 3.9, "ticker": "pndco", "tir": 5.607, "detalle": "PAE", "fecactual": "2021-07-06", "pactual": 116.6 }] }]] },
  'especie': [],
  'especies': [
    ['ALUA', 'Aluar Argentina', 0, 700, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['BBAR', 'BBVA Frances', 0, 600, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['BMA', 'Banco Macro', 0, 800, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['BYMA', 'Bolsas y Mercados Argentinos', 0, 500, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['CEPU', 'Central Puerto SA', 0, 900, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['COME', 'Sociedad Comercial de La Plata', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['CRES', 'Cresud SACIF y A*', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['CVH', 'Cablevision Holding SA', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['EDN', 'Edenor', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['GGAL', 'Grupo Financiero Galicia', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['LOMA', 'Loma Negra', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['MIRG', 'Mirgor', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['PAMP', 'Pampa Energia', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['SUPV', 'Grupo Supervielle SA', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['TECO2', 'Telecom Argentina', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['TGNO4', 'Transportadora de Gas del Norte SA', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['TGSU2', 'Transportadora de Gas del Sur SA', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['TRAN', 'Transener', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['TXAR', 'Ternium Argentina SA', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['VALO', 'Grupo Financiero Valores', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
    ['YPFD', 'Yacimientos Petroliferos Fiscales (YPF)*', 0, 799, 57.400, 57.500, 6826, 57.2, 58500, 57870, 7533.0, 272, 1627503508416, 0],
  ],
  'historicoEspecie': [],
  'getDatosTenencia': [{
    especie: "PESOS",
    tipo: "EFECTIVO",
    moneda: "PESOS",
    t0: 999134,
    t1: 50000,
    t2: 8894191,
    cantidad: 9943325,
    precio: 1,
    totalizado: 9943326
  }, {
    especie: "PESOS",
    tipo: "EFECTIVO",
    moneda: "PESOS",
    t0: 999134,
    t1: 50000,
    t2: 8894191,
    cantidad: 9943325,
    precio: 1,
    totalizado: 9943326
  }],
  'getDatosComitente': {
    comitente: 77984,
    nombre: "John",
    apellido: "Doe",
    email: "john_doe@email.com",
    perfil: "John_doe_794",
    cbu: 20300104011,
    telcel: 2616005513,
    telfijo: 4233300,
    domlegal: "1234 Boulevard Street",
    domreal: "Mi casa",
    creditopesos: 100000,
    creditodolares: 6000,
    comprapesos: 0,
    compradolares: 0,
    usadopesos: 0,
    usadodolares: 0,
    tenenciapesos: 100000,
    tenenciadolares: 6000,
    tenenciatotal: 200000,
    titulares: [{/*HACERLO*/ }]
  },
  'GetProfundidad': [
    57.1, 57.5, 58.1, 58.5,
    59.1, 59.5, 60.1, 60.5
  ],
  'setFav': true,
  'getFav': {
    FAVDEMO: {
      LIDER: {
        ALUA: [48, 24], 
        BBAR: [48, 24], 
        GALICIA: [48, 24, 0], 
        MACRO: [48, 24, 0]
      },
      ADR: {
        ALUA: [48, 24], 
        BBAR: [48, 24], 
        GALICIA: [48, 24, 0], 
        MACRO: [48, 24, 0]
      }
    }
  }, 
  'getDatosOperaciones': [{
      "id": 431,
      "comitente_id": 1,
      "status": "orden ejecutada total",
      "activo": "BMA 48Hs",
      "precio": 10,
      "cantidad": 5,
      "monto": 50,
      "tipo_de_orden": "Limit",
      "vencimiento": "Day",
      "cantidad_a_mostrar": 2,
      "tipo": "Venta",
      "fecha": "2021-04-22T18:18:14.532Z",
      "ejecutados": 5,
      "fix_id":
        "O2Ghiv3LoxnwljSV",
      "efectivo": "0.00",
      "deuda": "0.00",
      "t0": "0.00",
      "t1": "0.00",
      "t2": "0.00"
    }]
  };
