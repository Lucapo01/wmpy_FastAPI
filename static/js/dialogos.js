if(!alertify.alertHtml){
    //define a new dialog
    alertify.dialog('alertHtml',function factory(){
      return{
        main:function(message){
          this.message = message;
        },
        setup:function(){
            return { 
              buttons:[],
              focus: { element:0 }
            };
        },
        prepare:function(){
          this.setContent(this.message);
        }
    }});
  }

  //launch it.
  //alertify.alertHtml("Browser dialogs made easy!");

  // Extend existing 'alert' dialog
if(!alertify.errorAlert){
    //define a new errorAlert base on alert
    alertify.dialog('errorAlert',function factory(){
      return{
              build:function(){
                ventanaOrdenes.style='display:block'
                //this.elements.body.innherHTML='';
                this.elements.body.append(ventanaOrdenes);
                this.setHeader('NADA');
              }
          };
      },true,'alert');
  }
  //launch it.
  // since this was transient, we can launch another instance at the same time.
