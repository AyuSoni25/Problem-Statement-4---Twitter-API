import mongoose from 'mongoose';

const tweetSchema = mongoose.Schema({
    creatorID: String,
    content: String,
    tags: [String],
    images: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    comments:{
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const TweetMessage = mongoose.model('TweetMessage', tweetSchema);
 
export default TweetMessage;