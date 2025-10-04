const bcrypt = require('bcryptjs');
// Register route
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        await client.connect();
        const db = client.db();
        const users = db.collection('users');
        const existing = await users.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { name, email, password: hashedPassword, role };
        await users.insertOne(user);
        res.json({ success: true, user: { name, email, role } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        await client.close();
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        await client.connect();
        const db = client.db();
        const users = db.collection('users');
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ success: false, error: 'Invalid password' });
        }
        res.json({ success: true, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        await client.close();
    }
});
// Express backend for /api/auth
require('dotenv').config({ path: '.env.local' });
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
console.log(uri)
const client = new MongoClient(uri);

app.post('/', async (req, res) => {
    const user = req.body;
    try {
        await client.connect();
        const db = client.db();
        const users = db.collection('users');
        console.log(users)
        const result = await users.updateOne(
            { email: user.email },
            { $set: user },
            { upsert: true }
        );
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        await client.close();
    }
});

app.get('/', async (req, res) => {
    console.log("hit")
    const email = req.query.email;
    try {
        await client.connect();
        const db = client.db();
        const users = db.collection('users');
        const user = await users.findOne({ email });
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        await client.close();
    }
});

app.get('/articles', async (req, res) => {
    console.log("hit articles");
    try {
        await client.connect();
        const db = client.db();
        const articles = db.collection('article');
        const allArticles = await articles.find({}).toArray();
        res.json({ success: true, articles: allArticles });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        await client.close();
    }
});

// comments.js route
app.post('/comments', async (req, res) => {
    const { articleId, comment } = req.body;
    try {
        await client.connect();
        const db = client.db();
        const articles = db.collection('article');

        const result = await articles.updateOne(
            { article_id: articleId },
            { $push: { comments: comment } }
        );

        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        await client.close();
    }
});

app.post('/replies', async (req, res) => {
    const { articleId, commentId, reply } = req.body;
    try {
        await client.connect();
        const db = client.db();
        const articles = db.collection('article');

        const result = await articles.updateOne(
            { article_id: articleId, "comments.id": commentId },
            { $push: { "comments.$.replies": reply } }
        );

        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        await client.close();
    }
});

app.post('/reactions', async (req, res) => {
    const { articleId, commentId, reactionType } = req.body;
    try {
        await client.connect();
        const db = client.db();
        const articles = db.collection('article');

        const result = await articles.updateOne(
            { article_id: articleId, "comments.id": commentId },
            { $inc: { [`comments.$.reactions.${reactionType}`]: 1 } }
        );

        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        await client.close();
    }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
