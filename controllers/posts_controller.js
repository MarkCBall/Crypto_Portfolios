// Temporary variable posts available for views
// ToDo: Replace posts & post with a Mongoose Model

// var posts = [
//   { title: "My First Blog Post title",
//     tags: ["blockchain", "web development"],
//     created_at: "2018-10-16T23:45:24.565Z",
//     slug: "my-first-blog-post",
//     content: "content my first blog post",
//     summary: "summary my first blog post",
//     image_url: "../assets/Dev_Img1.jpg"
//   },
//   {
//   	title: "My Second Blog Post title",
//   	tags: ["smart contracts"],
//   	created_at: "2018-10-16T23:45:24.565Z",
//   	slug: "my-second-blog-post",
//   	content: "content my second blog post",
//   	summary: "summary my second blog post",
//   	image_url: "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2018/01/Blockchain-Funds.png"
//   }]

//to make into a model and do something about capital letters
var coins =[
  {tokenTicker: "btc", tokenName:"Bitcoin"},
  {tokenTicker: "eth", tokenName:"Ethereum"},
  {tokenTicker: "xrp", tokenName:"Ripple"},
  {tokenTicker: "bch" , tokenName:"BitcoinCash"},
  {tokenTicker: "eos", tokenName:"EOS"},
  {tokenTicker: "xlm", tokenName:"Stellar"},
  {tokenTicker: "ltc", tokenName:"Litecoin"},
  {tokenTicker: "usdt", tokenName:"Tether"},
  {tokenTicker: "ada", tokenName:"Cardano"},
  {tokenTicker: "xmr", tokenName:"Monero"}
];


  // Displays a list of all blog posts
  exports.index = function(req, res, next) {
    res.render('posts/index', { title: "Blog", coins: coins });
  };

  // exports.show = function(req, res, next) {
  //   let post = posts.filter(x => x['slug'] === req.params['slug'])[0]
  //   console.log(post['title'])
  //   res.render('posts/show', {  post: post }); //title: post['title'], content: post['content'],
  // };


