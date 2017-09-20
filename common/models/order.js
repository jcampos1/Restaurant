'use strict';

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
};
