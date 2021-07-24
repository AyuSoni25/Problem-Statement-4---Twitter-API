import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import tweetRoutes from './routes/tweets.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use('/tweets', tweetRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Twitter API.');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

export default app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));