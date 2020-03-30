const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
const clientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

MongoClient.connect(connectionURL, clientOptions, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database");
  }

  const db = client.db(databaseName);

  // db.collection("users")
  //   .updateOne(
  //     {
  //       _id: new ObjectID("5e80eb236a8f8d3b04582c6a")
  //     },
  //     {
  //       $inc: {
  //         age: -5
  //       }
  //     }
  //   )
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  db.collection("tasks")
    .updateMany(
      { completed: false },
      {
        $set: {
          completed: true
        }
      }
    )
    .then(result => {
      const { matchedCount, modifiedCount } = result;
      console.log(
        `Successfully matched ${matchedCount} and modified ${modifiedCount} items.`
      );
    })
    .catch(err => console.log(err));
});
