//JS file to connect to the mlab database

let mongoose = require('mongoose');

const server = 'ds047335.mlab.com:47335';
const dbName = 'gbc-blogapp-db';
const user = 'moball';
const password = '123456a';

const connectionString = `mongodb://${user}:${password}@${server}/${dbName}`;

const connect = () => {
	mongoose.connect(connectionString, { useNewUrlParser: true })
		.then(() => { console.log(`Connected to mongodb at : ${connectionString}`)})
		.catch(err => { console.log(err)});
};

module.exports = connect;