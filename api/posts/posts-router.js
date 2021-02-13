// implement your posts router here
const express = require("express")
const posts = require("./posts-model")

const router = express.Router()

router.get("/", (req, res) => {
    res.json({ message: "Hello World"})
})

//GET all post objects
router.get("/", (req, res) => {
   console.log(req.query)

   posts.find()
   .then((posts) => {
       res.status(200).json(posts)
   })
   .catch((error) => {
       console.log(error)
       res.status(500).json({
           message: "The posts information could not be retrived"
       })
   })
})

//GET post object with specified ID
router.get("/", (req, res) => {
    
})
//POST the newly created POST object 

//PUT returns the modified document 

//DELETE deletes POST object

//GET array of all the comment objects