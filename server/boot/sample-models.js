// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function(app) {

  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Category = app.models.category;

  /***************** CREACIÓN DE USUARIOS INICIALES *****************/
  User.create([
    {
      username: 'John',
      email: 'john@doe.com', 
      password: 'jun',
      name: 'John',
      phone: '04143494487',
      address: 'Urb. Bello Monte III'
    },
    {
      username: 'Jane', 
      email: 'junior.uc.91@hotmail.com', 
      password: 'jun',
      name: 'Jane Foster',
      phone: '04244445673',
      address: 'Urb. La Isabelica'
    },
    {
      username: 'Bob', 
      email: 'bob@projects.com', 
      password: 'jun',
      name: 'Bob Restrepo',
      phone: '04123494487',
      address: 'Urb. Bella Vista'
    }
  ], function(err, users) {
    if (err) throw err;

    console.log('Usuarios creados:', users);

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
    });
  });
  /******************************************************************/

  /***************** CREACIÓN CATEGORIAS INICIALES *****************/
  Category.create([
    {name: "Xis", description: "Descripción Xis"},
    {name: "Bebidas", description: "Descripción Bebidas"},
    {name: "Petiscos", description: "Descripción Petiscos"},
    {name: "Sobremesa", description: "Descripción Sobremesa"}
  ], function(err, categorys) {
    if (err) throw err;

    console.log('Categorias creadas:', categorys);
  });
  /*****************************************************************/
};
