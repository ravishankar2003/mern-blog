import Comment from "../models/comment_model.js"
import { errorHandler } from "../utils/error.js"






export const createcomment = async(req,res,next) =>{
    try {

        if(req.user.id !== req.body.userid )
        {
            return next(errorHandler(403, "You are not allowed to create this comment"))
        }
        const newcomment = new Comment({
            ...req.body
        })

        await newcomment.save()
        res.status(200).json(newcomment)
        
    } catch (error) {
        next(error)
    }

}


export const getcomments = async(req,res,next)=>{
    try {
        const comments = await Comment.find({postid: req.params.postid})
        .sort({ createdAt: -1 })

        res.status(200).json(comments)
        
    } catch (error) {
        next(error)
    }
}


export const editcomment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commid)
        if(!comment) next(errorHandler(404, "Comment not found"))
        if(req.user.id === comment.userid || req.user.isadmin)
        {
            const updatedcomment = await Comment.findByIdAndUpdate(
                req.params.commid,
                { $set: {comment : req.body.comment} },
                { new: true }
              );

              res.status(200).json(updatedcomment)
        }else next(errorHandler(403, "You are not allowed to edit this comment"))
    } catch (error) {
        next(error)
    }
}


export const deletecomment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commid)
        if(!comment) next(errorHandler(404, "Comment not found"))
        if(req.user.id === comment.userid || req.user.isadmin)
        {
            const updatedcomment = await Comment.findByIdAndDelete(req.params.commid);
            res.status(200).json("comment deleted")
        }else next(errorHandler(403, "You are not allowed to edit this comment"))
    } catch (error) {
        next(error)
    }
}

export const likecomment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commid);
      if (!comment) {
        return next(errorHandler(404, 'Comment not found'));
      }
      const userIndex = comment.likes.indexOf(req.user.id);
      if (userIndex === -1) {
        comment.likes.push(req.user.id);
        comment.nooflikes += 1;
      } else {
        comment.nooflikes -= 1;
        comment.likes.splice(userIndex, 1);
      }
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };