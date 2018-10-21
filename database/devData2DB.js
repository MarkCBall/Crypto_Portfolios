

const mongoose = require('mongoose');
const dbConnect = require('./database');

//put into separate file
let testSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    portfolioName: { type: String, required: true },
    tokenTicker: { type: String, required: true },
    tokenName: { type: String, required: true },
    tokenAmount: { type: Number, required: true }
});

let Post = mongoose.model('Post', testSchema);

dbConnect();

var posts = [
    new Post({
        userName: "Mark",
        portfolioName: "P1",
        tokenTicker: "btc",
        tokenName: "bitcoin",
        tokenAmount: 100
    }),
    new Post({
        userName: "Mark",
        portfolioName: "P1",
        tokenTicker: "eth",
        tokenName: "etherum",
        tokenAmount: 1300
    }),
    new Post({
        userName: "Mark",
        portfolioName: "P2",
        tokenTicker: "xrp",
        tokenName: "ripple",
        tokenAmount: 3300
    }),
    new Post({
        userName: "Dyla",
        portfolioName: "MyP",
        tokenTicker: "xrp",
        tokenName: "ripple",
        tokenAmount: 3300
    }),
    new Post({
        userName: "Dylan",
        portfolioName: "MyP",
        tokenTicker: "bcc",
        tokenName: "Bitcoin Cash",
        tokenAmount: 39300
    })
]

// seeding to mongodb
var done = 0;

// for (var i = 0; i < posts.length; ++i) {
//     posts[i].save((err, result) => {
//         done++;
//         if (done === posts.length) {
//             mongoose.disconnect();
//         }
//     });
// }

Post.distinct('userName', function(error, users) {
    for (var i=0;i<users.length;i++)
        console.log(users[i])
});
