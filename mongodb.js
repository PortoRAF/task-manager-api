const { MongoClient, ObjectID } = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
const clientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

MongoClient.connect(connectionURL, clientOptions, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database");
  }

  const db = client.db(databaseName);

  // db.collection("users").findOne(
  //   { _id: new ObjectID("5e80ecedc76c5f1d489e4c4d") },
  //   (error, user) => {
  //     if (error) {
  //       return console.log("Unable to fetch");
  //     }

  //     if (!user) {
  //       return console.log("No entries found");
  //     }

  //     console.log(user);
  //   }
  // );

  // db.collection("users")
  //   .find({ name: "Renato" })
  //   .toArray((error, users) => {
  //     console.log(users);
  //   });

  db.collection("tasks").findOne(
    { _id: new ObjectID("5e80edd5c5712b1ee88ce379") },
    (error, task) => {
      console.log(task);
    }
  );

  db.collection("tasks")
    .find({ completed: false })
    .toArray((error, tasks) => {
      console.log(tasks);
    });
});
