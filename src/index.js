const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter, taskRouter);

app.listen(port, () => {
  console.log('Server is running on port', port);
});

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisismynewtoken', {
//     expiresIn: '7 days'
//   });
//   console.log(token);

//   const data = jwt.verify(token, 'thisismynewtoken');
//   console.log(data);
// };

// myFunction();
