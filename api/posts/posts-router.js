// implement your posts router here
const express = require("express")
const posts = require("./posts-model")

const postsRouter = express.Router()

//working
//GET all post objects
postsRouter.get("/api/posts", (req, res) => {
    posts.find()
        .then((posts) => {
            res.status(200).json({ posts })
        })
        .catch(() => {
            res.status(500).json({
                message: "The posts information could not be retrived"
            })
        })
})

//working
//GET post object with specified ID
postsRouter.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})


//POST the newly created POST object 
postsRouter.post("/api/posts", (req, res) => {
    const newPost = {
        title: req.body.title,
        contents: req.body.contents,
    }
    if (!req.body.title && !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    posts.insert(req.body)
        .then((post) => {
            res.status(201).json({
                ...newPost,
                id: post.id
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
})

// PUT returns the modified document 
postsRouter.put("/api/posts/:id", (req, res) => {
    if (!req.body.title && !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    posts.update(req.params.id, req.params.body)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
})

//DELETE deletes POST object
postsRouter.delete("/api/posts/:id", (req, res) => {
    posts.remove(req.params.id)
    .then((post) => {
        if(post) {
            res.status(200).json({
                message: `Post id has been deleted`
            })
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            message: "The post could not be removed"
        })
    })
})

//GET array of all the comment objects
postsRouter.get("/api/posts/:id/comments", (req, res) => {
    posts.findPostComments(req.params.postId)
    .then(comment => {
        if(comment){
            res.status(200).json(comment)
        }else{
            res.status(404).json({
                 message: "The post with the specified ID does not exist" 
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    })
})


module.exports = postsRouter