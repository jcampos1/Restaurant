'use strict';

var htmlToPdf = require('html-to-pdf');
var fs = require('fs');
var ipp = require('ipp');

module.exports = function(Order) {

  /******Encontrar todas ordenes abiertas con fecha actual******/
  Order.orderFindOpen = function( cb ) {
      console.log ( new Date() )
    Order.find({where: {active:"true", stat:0}}, 
    function(err, models) {
        if (err) { cb (err); }
        console.log(models);
        cb (null, models);
    });
  }

  Order.remoteMethod('orderFindOpen', {
        returns: {arg: 'orders', type: 'array'},
        http: {verb: 'get', status: 200}
  });
  /******************************/

  /******Encontrar todas ordenes cerradas con fecha actual******/
  Order.orderFindClose = function( cb ) {
      console.log ( new Date() )
    Order.find({where: {active:"true", stat:1}},
    function(err, models) {
        if (err) { cb (err); }
        console.log(models);
        cb (null, models);
    });
  }

  Order.remoteMethod('orderFindClose', {
        returns: {arg: 'orders', type: 'array'},
        http: {verb: 'get', status: 200}
  });
  /******************************/

  /******Envia factura a impresora para impresion de factura******/
  Order.sendToPrinter = function( html, cb ) {
  
    //Juego de caracteres para el archivo a crear
    htmlToPdf.setInputEncoding('UTF-8');
    htmlToPdf.setOutputEncoding('UTF-8');

    //nombre del archivo
    var file = 'fact-'+(Date.now())+'.pdf';

    htmlToPdf.convertHTMLString(html, './server/facturas/'+file,
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                fs.readFile('./server/facturas/'+file, 'UTF-8', (err, data) => {
                  if(err) {
                    console.log('error: ', err);
                  } else {
                    console.log(data);
                  }
                });
            }
        }
    );
  }

  Order.remoteMethod('sendToPrinter', {
        accepts: {arg: 'html', type: 'string', required: true},
        http: {verb: 'get', status: 200}
  });
  /*******``***********************/
};
