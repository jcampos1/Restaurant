// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

var config = require('../../server/config.json');
var ds = require('../../server/datasources.json');
var path = require('path');

module.exports = function(User) {

  /******Creación de usuario******/
  User.createWhithRoles = function(user, roles, cb) {
    console.log("EL USUARIO A AGREGAR ES: ");
    console.log(user);
    console.log("LOS ROLES SON: ");
    console.log(roles);
    cb(null, 'Greetings... ');
  }

  User.remoteMethod('createWhithRoles', {
        accepts: [
          {arg: 'user', type: 'objet', required: true},
          {arg: 'roles', type: 'array', required: true}],
        returns: {arg: 'greeting', type: 'string'},
        http: {verb: 'post', status: 200}
  });
  /******************************/

  //Envia link para cambio de contraseña
  User.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '#/resetPassword';
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

  User.setPassword = function (ctx, newPassword, cb) {
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
);
}