const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },
        text: {
            type: String,
            maxLenght: 500
        },
        img: {
            type: String,
        },
        likes: {
           type : [mongoose.Schema.Types.ObjectId],
           ref : "User",
           default : []
        },
        replies: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true

                },
                text: {
                    type: String,
                    require: true

                },
                userProfilePic: {
                    type: String

                },
                username: {
                    type: String,
                },
                img_rep:{
                    type:String
                }
            }
        ]


    }, 
    {
    timestamps: true
}
)

const post = mongoose.model('Post', postSchema);
module.exports = post;