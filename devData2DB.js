// let mongoose = require('mongoose');


const database = () => {
	mongoose.connect('mongodb://moball:123456a@ds047335.mlab.com:47335/gbc-blogapp-db')
		.then(() => { console.log(`Connected to mongodb`)})
		.catch(err => { console.log(err)});
};//end database stuff

var userSchema = mongoose.Schema(
    {
        userName: String,
    });

var Users = mongoose.model('Users', userSchema);

var user1 = new Users({userName:"Mark"});
var user2 = new Users({userName:"Dylan"});

user1.save(function (err) {
    if (err) return handleError(err);
    // saved!
});

user2.save(function (err) {
    if (err) return handleError(err);
    // saved!
});  

/// ahhh, no clue how to do this...


