// Temporary variable posts available for views
// ToDo: Replace posts & post with a Mongoose Model

var posts = [
  { title: "My First Blog Post",
    tags: ["blockchain", "web development"],
    created_at: "2018-10-16T23:45:24.565Z",
    slug: "my-first-blog-post",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
               tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie nunc \
               non blandit. Diam in arcu cursus euismod. Imperdiet nulla malesuada pellentesque \
               elit eget gravida. Sollicitudin tempor id eu nisl nunc mi ipsum. Tincidunt eget nullam \
               non nisi est sit amet facilisis. Volutpat est velit egestas dui id ornare arcu odio. \
               Nulla at volutpat diam ut venenatis tellus in metus. Commodo odio aenean sed adipiscing diam. \
               Tellus mauris a diam maecenas sed. Nisl rhoncus mattis rhoncus urna neque viverra justo. \
               Tempor orci dapibus ultrices in iaculis nunc. Sit amet nisl suscipit adipiscing.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\
    	        tempor incididunt ut labore et dolore magna aliqua.Nibh tellus molestie nunc\
              non blandit.",
    image_url: "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2018/01/Blockchain-Funds.png"
  },
  {
  	title: "My Second Blog Post",
  	tags: ["smart contracts"],
  	created_at: "2018-10-16T23:45:24.565Z",
  	slug: "my-second-blog-post",
  	content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
               tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie nunc \
               non blandit. Diam in arcu cursus euismod. Imperdiet nulla malesuada pellentesque \
               elit eget gravida. Sollicitudin tempor id eu nisl nunc mi ipsum. Tincidunt eget nullam \
               non nisi est sit amet facilisis. Volutpat est velit egestas dui id ornare arcu odio. \
               Nulla at volutpat diam ut venenatis tellus in metus. Commodo odio aenean sed adipiscing diam. \
               Tellus mauris a diam maecenas sed. Nisl rhoncus mattis rhoncus urna neque viverra justo. \
               Tempor orci dapibus ultrices in iaculis nunc. Sit amet nisl suscipit adipiscing.",
  	summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\
    	        tempor incididunt ut labore et dolore magna aliqua.Nibh tellus molestie nunc\
              non blandit.",
  	image_url: "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2018/01/Blockchain-Funds.png"
  }]


  // Displays a list of all blog posts
  exports.index = function(req, res, next) {
    res.render('posts/index', { title: "Blog", posts: posts });
  };

  exports.show = function(req, res, next) {
    let post = posts.filter(x => x['slug'] === req.params['slug'])[0]
    console.log(post['title'])
    res.render('posts/show', { title: post['title'], post: post });
  };


