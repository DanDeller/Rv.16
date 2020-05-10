const config = require('../server.config.js'),
      async = require('async'),
      r = require('./r.js');

exports.setDatabaseAndTables = () => {
	async.waterfall([
    function connec(callback) {
      r.connect(config.db, callback);
    },
    function createDatabase(connection, callback) {
      r.dbList().contains(config.db.name).do((containsDb) => {
        return r.branch(
          containsDb,
          {created: 0},
          r.dbCreate(config.db.name)
        );
      }).run(connection, (err) => {
        callback(err, connection);
      });
    },
    function createTable(connection, callback) {
      r.db('tinyWeather').tableList().contains('currentWeather').do((containsTable) => {
        return r.branch(
          containsTable,
          {created: 0},
          r.db('tinyWeather').tableCreate('currentWeather')
        );
      }).run(connection, (err) => {
        callback(err, connection);
      });
    },
    function createIndex(connection, callback) {
      r.db('tinyWeather').table('currentWeather').indexList().contains('createdAt').do((hasIndex) => {
        return r.branch(
          hasIndex,
          {created: 0},
          r.db('tinyWeather').table('currentWeather').indexCreate('createdAt')
        );
      }).run(connection, (err) => {
        callback(err, connection);
      });
    },
    function waitForIndex(connection, callback) {
      r.db('tinyWeather').table('currentWeather').indexWait('createdAt').run(connection, (err) => {
        callback(err, connection);
      });
    }
  ], (err) => {
    if(err) {
      console.error(err);
      process.exit(1);
      return;
    }
  });
};