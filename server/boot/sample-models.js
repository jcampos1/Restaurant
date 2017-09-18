// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function(app) {

  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Category = app.models.category;
  var Ingrediente = app.models.Ingrediente;
  var Order = app.models.order;

  /***************** CREACIÓN DE USUARIOS INICIALES *****************/
  User.create([
    {
      username: 'john',
      email: 'john@doe.com', 
      password: 'jun',
      name: 'John',
      phone: '04143494487',
      address: 'Urb. Bello Monte III'
    },
    {
      username: 'jane', 
      email: 'junior.uc.91@hotmail.com', 
      password: 'jun',
      name: 'Jane Foster',
      phone: '04244445673',
      address: 'Urb. La Isabelica'
    },
    {
      username: 'bob', 
      email: 'bob@projects.com', 
      password: 'jun',
      name: 'Bob Restrepo',
      phone: '04123494487',
      address: 'Urb. Bella Vista'
    }
  ], function(err, users) {
    if (err) throw err;

    console.log('Usuarios creados:', users);

    //creacion rol camarero
    Role.create({
      name: 'Camarero'
    }, function(err, role) {
      if (err) throw err;

      console.log('Rol camarero creado:', role);

      //Asociar rol camarero
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[1].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Asociado rol camarero:', principal);
      });
    });

    //creacion rol cajero
    Role.create({
      name: 'Cajero'
    }, function(err, role) {
      if (err) throw err;

      console.log('Rol cajero creado:', role);

      //Asociar rol cajero
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Rol cajero asociado:', principal);
      });

      //Asociar rol cajero
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Rol cajero asociado:', principal);
      });
    });

    //Crear rol admin
    Role.create({
      name: 'Administrador'
    }, function(err, role) {
      if (err) throw err;

      console.log('Rol admin creado:', role);

      //Asociar rol admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Asociado rol admin:', principal);
      });
    });
  });
  /******************************************************************/

  /***************** CREACIÓN CATEGORIAS INICIALES *****************/
  /*Category.create([
    {name: "Xis", description: "Descripción Xis", image: 'sin-img-01.png'},
    {name: "Bebidas", description: "Descripción Bebidas", image: 'sin-img-01.png'},
    {name: "Petiscos", description: "Descripción Petiscos", image: 'sin-img-01.png'},
    {name: "Sobremesa", description: "Descripción Sobremesa", image: 'sin-img-01.png'}
  ], function(err, categorys) {
    if (err) throw err;

    console.log('Categorias creadas:', categorys);
  });

  Ingrediente.create([
    {name: "Jamon", type: "1", price: "100", description: "Jamon de pavo", image: 'sin-img-01.png'},
    {name: "Queso", type: "1", price: "120", description: "Queso", image: 'sin-img-01.png'},
    {name: "Sin lechuga", type: "0", description: "Descripción sin lechuga", image: 'sin-img-01.png'},
    {name: "Sin mostaza", type: "0", image: 'sin-img-01.png'},
    {name: "Tocineta", type: "1", price: "150", description: "Mucha tocineta", image: 'sin-img-01.png'}
  ], function(err, ingredientes) {
    if (err) throw err;

    console.log('Ingredientes creados:', ingredientes);
  });*/
  /*****************************************************************/
  //  Order.create([
  //   {number: "00001", total: 1000, boardnumb: '1'},
  //   {number: "00002", total: 2000, boardnumb: '2'},
  //   {number: "00003", total: 3000, boardnumb: '3'}
  // ], function(err, orders) {
  //   if (err) throw err;
  //   orders[0].products.create({
  //     code: "prod1",
  //     name: "pizza",
  //     price: 3000,
  //     description: "pizza"
  //   });
  //   console.log('Ordenes creadas:', orders);
  // });
};
