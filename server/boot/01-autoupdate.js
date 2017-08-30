module.exports = function(app) {
    var path = require('path');
    var nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV + '.' : '';
    var models = require(path.resolve(__dirname, '../model-config.' + nodeEnv + 'json'));
    var datasources = require(path.resolve(__dirname, '../datasources.' + nodeEnv + 'json'));

    // Automatically alter the table schemas based on the model definitions.
    function autoUpdateAll(){
        Object.keys(models).forEach(function(key) {
            if (typeof models[key].dataSource != 'undefined') {
                if (typeof datasources[models[key].dataSource] != 'undefined') {
                    app.dataSources[models[key].dataSource].autoupdate(key, function (err) {
                        if (err) throw err;
                        console.log('Model ' + key + ' updated');
                    });
                }
            }
        });
    }
    // Automatically create or re-create the table schemas based on the model definitions.
    function autoMigrateAll(){
        Object.keys(models).forEach(function(key) {
            if (typeof models[key].dataSource != 'undefined') {
                if (typeof datasources[models[key].dataSource] != 'undefined') {
                    app.dataSources[models[key].dataSource].automigrate(key, function (err) {
                        if (err) throw err;
                        console.log('Model ' + key + ' migrated');
                    });
                }
            }
        });
    }
    //TODO: change to autoUpdateAll when ready for CI deployment to production
    //Auto-migration will drop an existing table if its name matches a model name. When tables with data exist, use auto-update to avoid data loss.
    //autoMigrateAll();
    //autoUpdateAll();

};
