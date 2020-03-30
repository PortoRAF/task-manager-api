const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
const clientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

MongoClient.connect(connectionURL, clientOptions, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database");
  }

  const db = client.db(databaseName);

  db.collection("tasks")
    .deleteOne({
      description: "Scratch the itch"
    })
    .then(result => console.log("Deleted count:", result.deletedCount))
    .catch(err => console.log(err));
});
