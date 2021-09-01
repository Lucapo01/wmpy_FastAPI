function menuManual(){
    if(document.body.clientWidth>990){
      if(mnuTituloLogo.innerText){
          sidebar.style.height="0%";
          contenedor.style.padding = "78px 30px 30px 15px"
          sidebarwrapper.style.display="none";
          mnuTituloLogo.innerText = '';
          mnuSubtituloLogo.innerText = '';
      }else {
          sidebar.style.height="100%";
          sidebarwrapper.style.display="block";
          mnuTituloLogo.innerText = 'BAVSA';
          mnuSubtituloLogo.innerText = 'BS.AS';
      }
    }
}

function ventanaComprarVender(){
  //show as confirm
  var h1 = document.createElement("h1")
  h1.innerText = "demo"
  htmlVentanaComprarVender.style.display = 'block';
  htmlVentanaComprarVender.append(h1)
  alertify.confirm(htmlVentanaComprarVender, function(){
          alertify.success('COMPRAR');
          htmlVentanaComprarVender.style.display = 'none';
      },function(){
          alertify.error('VENDER');
          htmlVentanaComprarVender.style.display = 'none';
      }).set({labels:{ok:'COMPRAR', cancel: 'VENDER'}, padding: false})
      .setHeader('<em> Titulo de la COMPRA</em> ')
}
