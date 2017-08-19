// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

var config = require('../../server/config.json');
var ds = require('../../server/datasources.json');
var path = require('path');

module.exports = function(User) {

  /******Creación de usuario y asignacion de roles******/
  User.createWithRoles = function(user, roles, cb) {
    var app = User.app;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    User.create(user, function(err, userInstance) {
      if (err) cb (err);

      console.log('Usuario creado:', userInstance);

      roles.forEach(function(item) {
        Role.findOne({where: {name:item.name}}, function(err, role){
          if (err) {cb(err)};

          console.log('ROL FUE ENCONTRADO:', role);

          //Asociar rol admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: userInstance.id
          }, function(err, principal) {
            if (err) throw err;

            console.log('ASOCIADO ROL:', role.name);
          });
        });
      }, this);
      cb(null, userInstance);
    });
  }

  User.remoteMethod('createWithRoles', {
        accepts: [
          {arg: 'user', type: 'object', required: true},
          {arg: 'roles', type: 'array', required: true}],
        returns: {arg: 'user', type: 'object'},
        http: {verb: 'post', status: 200}
  });
  /******************************************/

  /******Actualización de usuario******/
  User.updateWithRoles = function(user, roles, cb) {
    var app = User.app;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    //Se actualiza los datos del usuario
    User.upsert(user, function(err, userInstance) {
      if (err) cb (err);

      console.log('Usuario actualizado:', userInstance);

      roles.forEach(function(item) {
            //Asociar rol admin
            Role.findOne({where: {name:item.name}}, function(err, role){
              if (err) {cb(err)};
              //Asociar rol admin
              role.principals.create({
                principalType: RoleMapping.USER,
                principalId: userInstance.id
              }, function(err, principal) {
                if (err){ cb(err); }
                console.log('ASOCIADO ROL:', role.name);
              }); 
            }); 
      });
      
      cb(null, userInstance); 
    });
  }

  User.remoteMethod('updateWithRoles', {
        accepts: [
          {arg: 'user', type: 'object', required: true},
          {arg: 'roles', type: 'array', required: true}],
        returns: {arg: 'user', type: 'object'},
        http: {verb: 'put', status: 200}
  });
  /******************************************/

  /******Eliminación de roles de usuario******/
  User.dropRoles = function(user, cb) {
    var app = User.app;
    var RoleMapping = app.models.RoleMapping;

    //Se encuentra todos los perfiles del usuario
    RoleMapping.find({where: {principalId: user.id }},
      function(err, models) {
      if (err) { cb (err); }
      
      //Se elimina cada perfil
      models.forEach(function(item) {
        RoleMapping.destroyById(item.id,
        function (err) {
          if (err) { cb (err); }
          console.log("perfil eliminado: "+item.name);
        });
      });
      cb(null);
    });
  }

  User.remoteMethod('dropRoles', {
        accepts:{arg: 'user', type: 'object', required: true},
        http: {verb: 'post', status: 200}
  });
  /******************************************/

  /******Encontrar todos los perfiles de un usuario******/
  /*User.findRolesByUser = function(user, cb) {
    var app = User.app;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var roles = new Array();
    //Se encuentra todos los perfiles del usuario
    RoleMapping.find({where: {principalId: user.id }},
      function(err, models) {
      if (err) { cb (err); }

      models.forEach(function(item) {
          Role.findById(item.roleId,
            function(err, role) {
              if (err) { cb (err); }
              roles.push(role);
          });
      });
    });

    var RoleMapping = User.app.models.RoleMapping;
    RoleMapping.find({"where": {"principalId": userInstance.id}}, function(err, models){
      if(err){ cb(err); }
      cb(roles);
    });
  }

  User.remoteMethod('findRolesByUser', {
        accepts: {arg: 'user', type: 'object', required: true},
        returns: {arg: 'roles', type: 'array'},
        http: {verb: 'get', status: 200}
  });*/
  /******************************/

  /*****Evento para el envio de email de reseteo de contraseña*****/
  User.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '#!/resetPassword';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">Aquí</a> para cambiar su clave';

    console.log("EL USUARIO ES:");
    console.log(info.email);
    User.app.models.Email.send({
      to: info.email,
      from: ds.emailDs.transports[0].auth.user,
      subject: 'Contraseña',
      html: html
    }, function(err) {
      if (err) return console.log('Erro al enviar reinicio de contraseña');
      console.log('Enviando reinicio de contraseña:', info.email);
    });
  });
  /************************************************************** */
}