const app = require('../app');
const User = require('../models/user');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { userOne, userTwo, userThree, userFour, setupDatabase } = require('./fixtures/database');
const URL = '/api/users';

beforeEach(setupDatabase);

test('Should signup new user', async () => {
    const newUser = {
        firstName: 'Joy',
        lastName: 'A',
        email: 'joy@gmail.com',
        password: 'bananinha'
    };
    const response = await request(app).post(`${URL}/signup`).send(newUser).expect(201);
    const data = await jwt.verify(response.body.token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(data.user._id);
    expect(user).not.toBeNull();
    expect(data).toMatchObject({
        user: {
            firstName: 'Joy',
            lastName: 'A'
        }
    });
});

test('Should login existing user', async () => {
    const response = await request(app)
        .post(`${URL}/login`)
        .send({ email: userOne.email, password: userOne.password })
        .expect(200);
    const data = await jwt.verify(response.body.token, process.env.JWT_SECRET_KEY);
    expect(data).toMatchObject({
        user: {
            firstName: userOne.firstName,
            lastName: userOne.lastName
        }
    });
});

test('Should not login user, bad credentials', async () => {
    await request(app)
        .post(`${URL}/login`)
        .send({
            email: userTwo.email,
            password: userTwo.password + 'bad password'
        })
        .expect(400);
});

test('Should get user profile authenticated user', async () => {
    const response = await request(app)
        .get(`${URL}/me`)
        .set('Authorization', `Bearer ${userThree.token}`)
        .expect(200);
    expect(response.body).toMatchObject({
        firstName: userThree.firstName,
        lastName: userThree.lastName
    });
});

test('Should not get user profile unauthenticated user', async () => {
    await request(app).get(`${URL}/me`).expect(401);
});

test('Should delete authenticated user', async () => {
    const response = await request(app)
        .delete(`${URL}/me`)
        .set('Authorization', `Bearer ${userThree.token}`)
        .expect(200);
    const user = await User.findById(response.body._id);
    expect(user).toBeNull();
});

test('Should not delete unauthenticated user', async () => {
    await request(app).delete(`${URL}/me`).expect(401);
});

test('Should update profile authenticated user', async () => {
    const response = await request(app)
        .put(`${URL}/me`)
        .set('Authorization', `Bearer ${userFour.token}`)
        .send({
            firstName: 'Mike',
            lastName: 'Cabecinha'
        })
        .expect(200);
    const user = await User.findById(response.body._id);
    expect(user).not.toBeNull();
    expect(user).toMatchObject({
        firstName: 'Mike',
        lastName: 'Cabecinha'
    });
});

test('Should not update profile unauthenticated user', async () => {
    await request(app)
        .put(`${URL}/me`)
        .send({
            firstName: 'Mike',
            lastName: 'Cabecinha'
        })
        .expect(401);
});

test('Should not update profile authenticated user, invalid fields', async () => {
    await request(app)
        .put(`${URL}/me`)
        .set('Authorization', `Bearer ${userFour.token}`)
        .send({
            name: 'Mike',
            last: 'Cabecinha'
        })
        .expect(400);
    const user = await User.findById(userFour._id);
    expect(user).not.toBeNull();
    expect(user).toMatchObject({
        firstName: 'Mike',
        lastName: 'T'
    });
});
