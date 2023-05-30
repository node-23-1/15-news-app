const request = require('supertest');
const app = require('../app');

let userId;

test('POST /users', async () => {
    const user = {
        firstName: "Kevin",
        lastName: "Villarruel",
        email: "kevin@gmail.com",
        password: "kevin1234",
        phone: "1234567890"
    }
    const res = await request(app)
        .post('/users')
        .send(user);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /users/:id', async () => {
    const userUpdated = {
        firstName: "Kevin actualizado"
    }
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(userUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdated.firstName);
});

test('DELETE /users/:id', async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.status).toBe(204);
});
