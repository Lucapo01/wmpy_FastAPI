
function dibujarTablaTenencia(datos) {
  let tabla = document.getElementById("tenenciaTable"),
    body = document.getElementById("tenenciaTableBody"),
    resultHtml = '';
  for (const dato of datos) {

    resultHtml += `
    <tr>
        <td>${dato.especie}</td>
        <td>${dato.tipo}</td>
        <td>${dato.moneda}</td>
        <td>${dato.t0}</td>
        <td>${dato.t1}</td>
        <td>${dato.t2}</td>
        <td>${dato.cantidad}</td>
        <td>${dato.precio}</td>
        <td>${dato.totalizado}</td>
    </tr>`;
  }

  body.innerHTML = resultHtml;
}

function completarFormComitente(datos){
  
  comitente.querySelector("[data-id='comitente']").innerHTML=datos.comitente || "999999999";
  comitente.querySelector("[data-id='nombre']").innerHTML=datos.nombre || "Jhon";
  comitente.querySelector("[data-id='apellido']").innerHTML=datos.apellido || "Doe";
  comitente.querySelector("[data-id='email']").innerHTML=datos.email || "john_doe@email.com";
  comitente.querySelector("[data-id='perfil']").value=datos.perfil || "mi_perfil";
  comitente.querySelector("[data-id='cbu']").value=datos.cbu || "20-3304946-3";
  comitente.querySelector("[data-id='telcel']").value=datos.tel_cel || "2636884413";
  comitente.querySelector("[data-id='telfijo']").value=datos.tel_fijo || "2624233300";
  comitente.querySelector("[data-id='domlegal']").value=datos.dom_legal || "Evergreen Terrace 742";
  comitente.querySelector("[data-id='domreal']").value=datos.dom_real || "Mi casa";
  comitente.querySelector("[data-id='disponiblepesos']").value=datos.creditoTotalPesos || "100000";
  comitente.querySelector("[data-id='disponibledolares']").value=datos.creditoTotalDolares || "6000";
  comitente.querySelector("[data-id='comppesos']").value=datos.compPesos || "0";
  comitente.querySelector("[data-id='compdolares']").value=datos.compDolares || "0";
  comitente.querySelector("[data-id='usadopesos']").value=datos.creditoUsadoPesos || "0";
  comitente.querySelector("[data-id='usadodolares']").value=datos.creditoUsadoDolares || "0";
  comitente.querySelector("[data-id='tenenciapesos']").value=datos.tenenciaTotalPesos || "100000";
  comitente.querySelector("[data-id='tenenciadolares']").value=datos.tenenciaTotalDolares || "6000";
  comitente.querySelector("[data-id='aforo']").value=datos.aforo || "1";
  comitente.querySelector("[data-id='tenenciatotal']").value=datos.tenenciaTotal || "200000";





  

  



  

}