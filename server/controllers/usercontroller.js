import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import User from '../models/user_model.js'; 

export const signout = (req, res, next) => {
    try {
        res.status(200).json('User has been signed out');
    } catch (error) {
        next(error);
    }
};


export const updateprofile = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Validate password if provided
    if (req.body.password) {
      if (req.body.password.length < 4) {
        return next(errorHandler(400, 'Password must be at least 4 characters'));
      }
    }

    // Validate email if provided
    if (req.body.email) {
      if (req.body.email !== currentUser.email) {
        return next(errorHandler(403, 'Access denied'));
      }
    }

    // Validate username if provided
    if (req.body.username) {
      if (req.body.username.length < 4 || req.body.username.length > 10) {
        return next(errorHandler(400, 'Username must be between 4 and 10 characters'));
      }

      if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Username cannot contain spaces'));
      }

      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Username must be lowercase'));
      }
    }

    const isSameUsername = req.body.username === currentUser.username;
    const isSameEmail = req.body.email === currentUser.email;

    let isSameProfilePicture = true;
    if (req.file) {
      isSameProfilePicture = req.file.buffer.toString('base64') === currentUser.profilePicture;
    } else if (req.body.profilePicture) {
      isSameProfilePicture = req.body.profilePicture === currentUser.profilePicture;
    }

    let isSamePassword = false;
    if (req.body.password) {
      isSamePassword = bcryptjs.compareSync(req.body.password, currentUser.password);
      if (!isSamePassword) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10); // Hash the new password
      }
    }

    if (isSameUsername && isSameEmail && isSameProfilePicture && isSamePassword) {
      return next(errorHandler(400, 'No changes detected. Please update at least one field.'));
    }

    const updatedFields = {};
    if (req.body.username && !isSameUsername) updatedFields.username = req.body.username;
    if (req.body.email && !isSameEmail) updatedFields.email = req.body.email;
    if (req.body.password && !isSamePassword) updatedFields.password = req.body.password;
    if (!isSameProfilePicture) {
      updatedFields.profilePicture = req.file 
        ? req.file.buffer.toString('base64') 
        : req.body.profilePicture;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};



  export const deleteprofile = async (req, res,next) => {
    try {
        const currentUser = await User.findByIdAndDelete(req.user.id);
        if(!currentUser) return next(errorHandler(404, 'User not found'))
        res.status(200).json('Account has been deleted');
    } catch (error) {
        next(error)
    }

  }


  export const getusers = async(req,res,next)=>{

    if(!req.user.isadmin) next(errorHandler(403, "You are not allowed to view users"))
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
    
        const usersWithoutPassword = users.map((user) => {
          const { password, ...rest } = user._doc;
          return rest;
        });
    
        const totalUsers = await User.countDocuments();
    
        const now = new Date();
    
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });
    
        res.status(200).json({
          users: usersWithoutPassword,
          totalUsers,
          lastMonthUsers,
        });
      } catch (error) {
        next(error);
      }
    };



    export const deleteuser = async (req, res,next) => {
      if(!req.user.isadmin) next(errorHandler(403,"You are not allowed to delete this user"))
      try {
          const currentUser = await User.findByIdAndDelete(req.params.userid);
          if(!currentUser) return next(errorHandler(404, 'User not found'))
          res.status(200).json('Account has been deleted');
      } catch (error) {
          next(error)
      }
  
    }

    export const getuser = async (req,res,next) => {
      try {
        const currentUser = await User.findById(req.params.userid);
        if(!currentUser) return next(errorHandler(404, 'User not found'))

        const { password, ...rest } = currentUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
    }
  
  
 