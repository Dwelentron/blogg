const Blog = require('../modules/blog');
const express = require('express');
//blog routes

const router = express.Router()
  router.get('/blogs',(req,res)=>{
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
  router.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body)
    blog.save()
    .then((result)=>{
          res.redirect('/')     
    })
    .catch((err)=>{
      console.log(err)
    })
  })
  router.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
      .then((result)=>{
          res.render('details', { title: "Blog details", blog: result })
      })
  })
  
  // handling the blog deleting
//   router.delete('/blogs/:id',(req,res)=>{
//     const id = req.params.id
  
//     Blog.findByIdAndDelete(id)
//     .then((result)=>{
//       res.json({ redirect: '/'})
//     })
//     .catch((err)=>{
//       console.log(err);
      
//     })
//   })

  module.exports = router