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
            type: Number,
            default: 0.
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
                }
            }
        ]


    }, {
    timestamp: true
}
)

const post = mongoose.model('Post', postSchema);
module.exports = post;