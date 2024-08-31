import { errorHandler } from "../utils/error.js"
import Post from "../models/postmodel.js";
import { query } from "express";

export const create = async(req, res, next) =>
{
    if(!req.user.isadmin)
    {
        return next(errorHandler(403,'You are not allowed to create post'))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }
      const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
      const newPost = new Post({
        ...req.body,
        slug,
        userid: req.user.id,
      });
      try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
      } catch (error) {
        next(error);
      }
};

export const getposts = async(req,res,next)=>{
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const query = {
        ...(req.query.userId && { userid: req.query.userId }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postid && { _id: req.query.postid }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      };
        let postsQuery = Post.find(query)
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)

        if(req.query.limit) postsQuery =  postsQuery.limit(parseInt(req.query.limit))

        const  posts = await postsQuery
      const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
}



export const deletepost = async(req,res,next) =>
{
  if(!req.user.isadmin || req.user.id!==req.params.userid )
  {
    return next(errorHandler(403, "You are not allowed to delete this post"))
  }
  try {
    const post = await Post.findByIdAndDelete(req.params.postid);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });

  } catch (error) {
    next(error)
  }
}


export const updatepost = async (req, res, next) => {
  if (!req.user.isadmin || req.user.id !== req.params.userid) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postid,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

