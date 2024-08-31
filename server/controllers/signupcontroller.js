import User from "../models/user_model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const userExists = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (userExists) {
            return next(errorHandler(400, 'User already exists'));
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: "Successful signup" });
    } catch (error) {
        next(error); 
    }
};

const signin = async (req, res, next) => {
    const { email, password } = req.body || {}; 
    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }
    try {
        const userin = await User.findOne({ email });
        if (!userin) {
            return next(errorHandler(404, 'Invalid credentials'));
        }
        const validPassword = bcryptjs.compareSync(password, userin.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid credentials'));
        }

        const { password: pass, ...rest } = userin._doc;

        const token = jwt.sign({ id: userin._id, isadmin: userin.isadmin },process.env.JWT_SECRET);

        res.status(200).json(
            {
                ...rest,
                "access_token" : token
            }
        )
    } catch (error) {
        next(error);
    }
};



export {signup, signin}