const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

beforeAll(async () => {});

beforeEach(async () => {
  await User.deleteMany();
});

// afterAll(async () => {
//   // await request(app).close();
// });

test('Should sign up a new user', async () => {
  request(app)
    .post('/users')
    .send({
      name: 'mike',
      email: 'paul@example.com',
      password: 'MyPass777!'
    })
    .expect(201);
});
