const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./modules/blog');
const { result } = require('lodash');

// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//middle ware
app.use(express.urlencoded({extended: true}))

// Listen for requests
app.listen(3000);

// Connect to the database using the environment variable
const dbURL = "mongodb+srv://suelshustle:suelshustle12345@blogg.341z1.mongodb.net/?retryWrites=true&w=majority&appName=blogg"
mongoose.connect(dbURL)
  .then((result) => console.log("")
  )
  .catch((err) => console.log(err));

//testing the schema
app.get('/add-blog',(req, res)=>{
  const blog = new Blog(
  {
    title:"The Future of Work: Trends and Predictions",
    Snippet:"Discover essential self-care tips for busy parents.",
    body:"Parenting can be demanding, so it's important for parents to prioritize self-care. Learn how to find time for yourself, reduce stress, and maintain your mental and physical health."
  },
  
)

  blog.save()
  .then((result)=>{
        res.send(result);     
  })
  .catch((err)=>{
    console.log(err)
  })
})

app.get('/all-blogs',(req, res)=>{
  Blog.find()
    .then((result)=>{
      res.send(result);     
    })
    .catch((err)=>{
    console.log(err)
    })

})
app.get('/single-blog',(req,res)=>{
  Blog.findById("66cc4efa84babf5b7fba79ea")
  .then((result)=>{
    res.send(result);     
  })
  .catch((err)=>{
  console.log(err)
  })
})

// Defining routes 
app.get('/', (req, res) => {
  res.redirect('/blogs')
});


//blog routes
app.get('/blogs',(req,res)=>{
  Blog.find().sort({ createdAt: -1})
  .then((result)=>{
    res.render('index', { 
            title: 'Techla Blog', 
            description: 'Unleash your creativity with inspiring ideas and tutorials on art, writing, music, and design. Find your passion and express yourself.', 
            heading: 'All Blogs',
            blogPosts : result
        });
  })
  .catch((err)=>{
    console.log(err);
  })
})

// handling the post redirects and saving to the server
app.post('/blogs',(req,res)=>{
  const blog = new Blog(req.body)
  blog.save()
  .then((result)=>{
        res.redirect('/')     
  })
  .catch((err)=>{
    console.log(err)
  })
})
app.get('/blogs/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findById(id)
    .then((result)=>{
        res.render('details', { title: "Blog details", blog: result })
    })
})

// handling the blog deleting
app.delete('/blogs/:id',(req,res)=>{
  const id = req.params.id

  Blog.findByIdAndDelete(id)
  .then((result)=>{
    res.json({ redirect: '/'})
  })
  .catch((err)=>{
    console.log(err);
    
  })
})

// the about page

app.get('/about', (req, res) => {
  const aboutUs = [
    {
      name: "John Doe",
      title: "CEO & Founder",
      description: "With over 10 years of experience in the industry, John is passionate about...",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe"
      }
    },
  ]
    res.render('about', {
        title: "About Page",
        aboutUs
    });
});

// handling the posting form 
app.get('/create', (req, res) => {
    res.render('create', {
        title: "Create a blog"
    });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404',
        description: 'This is a 404 page .... '
    });
});
