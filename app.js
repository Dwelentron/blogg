const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

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


// Defining routes 
app.get('/', (req, res) => {
  res.redirect('/blogs')
});

//blog routes
app.use(blogRoutes)
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
