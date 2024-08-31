import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    postid : {
        type : String,
        required : true,
    },
    userid : {
        type : String,
        required : true,
    },
    comment : {
        type : String,
        required : true,
    },
    likes : {
        type : Array,
        default : [],
    },
    nooflikes : {
        type : Number,
        default : 0,
    }
},{timestamps:true}
)
const Comment= mongoose.model('Comment',CommentSchema)
export default Comment