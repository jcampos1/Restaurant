'use strict';

module.exports = function(Item) {
    Item.addProduct = function(itemId, productId, cb) {
        var app = Item.app;
        var Product = app.models.product;

        Item.findOne({where: {id:itemId}}, function(err, item){
          if (err) {cb(err)};

          Product.findOne({where: {id:productId}}, function(err, product){
            if (err) {cb(err)};
            item.product(product);
          });
        });
    };
    Item.remoteMethod(
        'addProduct', {
            accepts: [
                {arg: 'itemId', type: 'number', required: true},
                {arg: 'productId', type: 'number', required: true}
            ],
            http: {
                path: '/addProduct',
                verb: 'post',
                status: 200
            },
            returns: {
                arg: 'item',
                type: 'object'
            }
        }
    );
};
