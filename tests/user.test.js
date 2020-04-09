const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mike@example.com',
  password: 'MyPass123@',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

// beforeAll(async () => {});

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

// afterAll(async () => {
//   await setTimeout(() => {}, 2000);
// });

test('Should sign up a new user', async () => {
  const response = await request(app).post('/users').send({
    name: 'Paul',
    email: 'paul@example.com',
    password: 'MyPass777!'
  });

  expect(response.status).toEqual(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Paul',
      email: 'paul@example.com'
    },
    token: user.tokens[0].token
  });
  expect(user.password).not.toBe('MyPass777!');
});

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  });

  expect(response.status).toEqual(200);

  // Assert that the response contains the same token stored in the database
  const user = await User.findById(response.body.user._id);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not not login nonexistent user', async () => {
  const res = await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'ThisIsNotTheCorrectPass'
  });

  expect(res.status).toBe(400);
});

test('Should get profile for user', async () => {
  const res = await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send();

  expect(res.status).toBe(200);
});

test('Should not get profile for user without valid authentication', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assert that the user was removed from the database
  const user = await User.findById(response.body._id);
  expect(user).toBeNull();
});

test('Should not delete account for user without valid authentication', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Anthony',
      age: 37
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual('Anthony');
  expect(user.age).toEqual(37);
});

test('Should not update invalid user fields', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      _id: new mongoose.Types.ObjectId()
    })
    .expect(400);
});
