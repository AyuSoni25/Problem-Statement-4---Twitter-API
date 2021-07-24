import Mongoose from 'mongoose';
import TweetMessage from '../models/tweetMessage.js';

export const getTweet = async(req, res) => {
    const { id } = req.params;

    try {
    if(!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: "No post with that id"});
    const tweet = await TweetMessage.findById(id);
        res.status(200).json(tweet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTweets = async (req, res) => {

    try {
        const tweets = await TweetMessage.find().sort({_id: -1});
        res.status(200).json({data: tweets});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const getTweetsBySearch = async (req, res) => {
    const { searchQuery, tags} = req.query;

    try {
        const content = new RegExp(searchQuery, 'i');
        const tweets = await TweetMessage.find({ $or :[ {content}, {tags:{ $in : tags.split(',') } }] });
        res.json({data: tweets});
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

export const createTweet = async (req, res) => {
    const tweet = req.body;
    tweet.images.splice(4);
    tweet.content = tweet.content.slice(0, 10000);
    
    const newTweet = new TweetMessage({...tweet, creatorID: req.userId, createdAt: new Date().toISOString() });

    try {
        await newTweet.save();
        res.status(201).json(newTweet);
    } catch(error) { 
        res.status(409).json({message: error.message});
    }
}

export const updateTweet = async (req, res) => {
    const { id: _id } = req.params;
    const tweet = req.body;
    if(!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: "No post with that id"});

    const updatedTweet = await TweetMessage.findByIdAndUpdate(_id, {...tweet, _id}, {new:true});
    res.json(updatedTweet);
}

export const deleteTweet = async (req, res) => {
    const { id } = req.params;

    if(!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No post with that id"});
    await TweetMessage.findByIdAndRemove(id);
    res.json({message: 'Post Deleted Successfully'});
}

export const likeTweet = async (req, res) => {
    const { id } = req.params;

    if(!req.userId)
        return res.json({message:"Unauthenticated"});

    if(!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No post with that id"});

    const tweet = await TweetMessage.findById(id);
    const index = tweet.likes.findIndex((id) => id === String(req.userId));
    if(index === -1)
        tweet.likes.push(req.userId);
    else
        tweet.likes = tweet.likes.filter((id) => id !== String(req.userId));

    const updatedTweet = await TweetMessage.findByIdAndUpdate(id, tweet, {new:true});
    res.json(updatedTweet);
}

export const commentTweet = async(req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const tweet = await TweetMessage.findById(id);
    tweet.comments.push(value);

    const updatedTweet = await TweetMessage.findByIdAndUpdate(id, tweet, {new:true});
    res.json(updatedTweet);
}