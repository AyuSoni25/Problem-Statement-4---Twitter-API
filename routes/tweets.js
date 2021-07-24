import express from 'express';
import {getTweets, getTweet, createTweet, updateTweet, deleteTweet, likeTweet, commentTweet, getTweetsBySearch} from '../controllers/tweets.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getTweetsBySearch);
router.get('/', getTweets);
router.get('/:id', getTweet);
router.post('/', auth, createTweet);
router.patch('/:id', auth, updateTweet);
router.delete('/:id', auth, deleteTweet);
router.patch('/:id/likeTweet', auth, likeTweet);
router.post('/:id/commentTweet', auth, commentTweet);
export default router;