const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'users';
const eventsDb = 'events';
const groupsDb = 'groups';
const userSetttingsDb = 'settings';
const userInboxDb = 'inbox';

const messageSchema = {
    sender: String,
    receiver: String,
    content: String,
    date: Date
};

const Message = mongoose.model("Message", messageSchema);

const eventSchema = {
    name: String,
    description: String,
    date: Date,
    time: String,
    location: String,
    attendees: [String],
    creator: String
};

const Event = mongoose.model("Event", eventSchema);

const groupSchema = {
    name: String,
    description: String,
    events: [eventSchema],
    members: [String]
};

const Group = mongoose.model("Group", groupSchema);

const userSchema = {
    name: String,
    email: String,
    password: String,
    messages: [groupSchema],
    events: [eventSchema]
};

const User = mongoose.model("User", userSchema);


// Create Express app
const app = express();
app.use(express.json());

//Get Client
function getClient() {
    return MongoClient.connect(url);
}

// Route for getting data from MongoDB
app.get('/data', async (req, res) => {
    try {
        // Connect to MongoDB
        var client = getClient()
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('myCollection');
        const documents = await collection.find({}).toArray();
        console.log('Documents:', documents);
        client.close();
        res.json(documents);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Route for getting events from MongoDB
app.get('/events', async (req,res) => {
    try {
        var client = getClient();
        var db = client.db(eventsDb);
        var collection = db.collection('events');
        const events = await collection.find({}).toArray();
        client.close();
        res.json(events);
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Route for getting groups from MongoDB
app.get('/groups', async (req,res) => {
    try {
        var client = getClient();
        var db = client.db(groupsDb);
        var collection = db.collection('groups');
        const groups = await collection.find({}).toArray();
        client.close();
        res.json(events);
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users', async (req,res) => {
    try {
        var client = getClient();
        var db = client.db(usersDb);
        var collection = db.collection('users');
        const users = await collection.find({}).toArray();
        client.close();
        res.json(users);
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/settings', async (req,res) => {
    try {
        var client = getClient();
        var db = client.db(userSetttingsDb);
        var collection = db.collection('settings');
        const settings = await collection.find({}).toArray();
        client.close();
        res.json(settings);
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.get('/inbox', async (req,res,userId) => {
    try {
        var client = getClient();
        var db = client.db(userInboxDb);
        var collection = db.collection('inbox');
        const inbox = await collection.findOne(userId).toArray();
        client.close();
        res.json(inbox);
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
