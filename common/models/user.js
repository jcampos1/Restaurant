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
    console.log("EL USUARIO A AGREGAR ES: ");
    console.log(user);
    console.log("LOS ROLES SON: ");
    console.log(roles);

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

  /******Encontrar roles de un usuario******/
  User.findRolesByUser = function(user, cb) {
    console.log("EL USUARIO A CONSEGUIR LOS ROLES ES: ");
    console.log(user);

    var app = User.app;
    var Role = app.models.Role;
    Role.getRoles({id: user.id}, function(err, roles){
      if(err){ cb(err); }
      cb(roles);
    });
  }

  User.remoteMethod('findRolesByUser', {
        accepts: {arg: 'user', type: 'object', required: true},
        returns: {arg: 'roles', type: 'array'},
        http: {verb: 'get', status: 200}
  });
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

  /**************RESETEO DE CONTRASEÑA DEL USUARIO******************/
  User.resetPass = function(info, cb) {
    console.log("CORREO ELECTRONICO");
    console.log(info.email);
    console.log("TOKEN TEMPORAL");
    console.log(info.accessToken.id);
    console.log("CONSTRASENA");
    console.log(info.newPassword);
    
    cb(null, "se ejecuto menol");
  }

  User.remoteMethod('resetPass', {
        accepts: [
          {arg: 'newPassword', type: 'string', required: true}],
        returns: {arg: 'greeting', type: 'string'},
        http: {verb: 'put', status: 200}
  });
  /*****************************************************************/

  /*User.setPassword = function (ctx, newPassword, cb) {
  var newErrMsg, newErr;
  try {
      console.log(ctx.req.accessToken.userId);
    this.findOne({where: {id: ctx.req.accessToken.userId}}, function (err, user) {
      if (err) {
        cb(err);
      } else if (!user) {
        newErrMsg = "No match between provided current logged user and email";
        newErr = new Error(newErrMsg);
        newErr.statusCode = 401;
        newErr.code = 'LOGIN_FAILED_EMAIL';
        cb(newErr);
        } else {
            user.updateAttributes({'password': newPassword}, function (err, instance) {
              if (err) {
                cb(err);
              } else {
                cb(null, true);
              }
            });
        } 
    });
  } catch (err) {
    console.error(err);
    cb(err);
  }
};

User.remoteMethod(
  'setPassword',
  {
    description: "Allows a logged user to change his/her password.",
    http: {verb: 'put'},
    accepts: [
      {arg: 'ctx', type: 'object', http: {source: 'context'}},
      {arg: 'newPassword', type: 'string', required: true, description: "The user NEW password"}
    ],
    returns: {arg: 'passwordChange', type: 'boolean'}
  }
);*/
}