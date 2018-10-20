
// let mongoose = require('mongoose');

// const connect = () => {
// 	mongoose.connect('mongodb://moball:123456a@ds047335.mlab.com:47335/gbc-blogapp-db')
// 		.then(() => { console.log(`Connected to mongodb`)})
// 		.catch(err => { console.log(err)});
// };


// module.exports = connect;


//mongodb://<dbuser>:<dbpassword>@ds047335.mlab.com:47335/gbc-blogapp-db

let mongoose = require('mongoose');

const server = 'ds047335.mlab.com:47335';
const dbName = 'gbc-blogapp-db';
const user = 'moball';
const password = '123456a';

const connectionString = `mongodb://${user}:${password}@${server}/${dbName}`;

const connect = () => {
	mongoose.connect(connectionString)
		.then(() => { console.log(`Connected to mongodb at : ${connectionString}`)})
		.catch(err => { console.log(err)});
};

module.exports = connect;