const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://admin:12345@library.1hxit.mongodb.net/?retryWrites=true&w=majority&appName=library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = client.connect();
