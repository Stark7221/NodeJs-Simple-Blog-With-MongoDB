const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async function (req,res) {
    try {
          const locals ={
            title:"NodeJs Blog",
            description:"Simple Blog created with NodeJs, Express and MongoDB"
            }
            let perPage = 6;
            let page = req.query.page || 1;

            const data = await Post.aggregate([{$sort:{createdAt:-1}}])
            .skip(perPage*page-perPage)
            .limit(perPage)
            .exec();

            const count = await Post.countDocuments();
            const nextPage = parseInt(page) + 1;
            const hashNextPage = nextPage <= Math.ceil(count/perPage);
            
            res.render("index",{
               locals,
               data,
               current: page,
               nextPage: hashNextPage ? nextPage : null
              });
    } catch (error) {
        console.log(error);
    }
   
});

 router.get("/post/:id", async function (req,res) {

     try {
        let slug = req.params.id;

         const data = await Post.findById({_id:slug});

         const locals ={
            title:data.title,
            description:"Simple Blog created with NodeJs, Express and MongoDB"
            }
         res.render("post",{ locals, data});
   } catch (error) {
         console.log(error);
     }
 });

// router.get("/", async function (req,res) {
//     const locals ={
//     title:"NodeJs Blog",
//     description:"Simple Blog created with NodeJs, Express and MongoDB"
//     }

//     try {
//         const data = await Post.find();
//         res.render("index",{ locals, data});
//     } catch (error) {
//         console.log(error);
//     }
// });

router.get("/about", function (req,res) {
    res.render("about");
});

module.exports = router;