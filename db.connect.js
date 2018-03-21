var config = require('./config.json');
var mongoose = require('mongoose');

const dbConfig = config.db1;

const db = {
	dbuser: dbConfig.dbuser,
	dbpassword: dbConfig.dbpassword,
	host: dbConfig.host,
	port: dbConfig.port,
	database: dbConfig.database,
	url : `mongodb://${dbConfig.dbuser}:${dbConfig.dbpassword}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
	connect: function(){
		return mongoose.connect(`mongodb://${this.dbuser}:${this.dbpassword}@${this.host}:${this.port}/${this.database}`);
	}
};

module.exports = db;