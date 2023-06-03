const request = require('supertest');
const app = require('../app');
const News = require('../models/News');
require('../models');

let token;
let favoriteId;

beforeAll(async() => {
    const credentials = {
        email: "testuser@gmail.com",
        password: "testuser1234"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})


test('POST /favorites should create a favorite', async () => {
    const news = await News.create({
        headline: "My headline",
        lead: "My lead",
        author: "My author",
        body: "my body"
    })
    const favorite = {
        newsId: news.id,
        rate: 5
    }
    const res = await request(app)
        .post('/favorites')
        .send(favorite)
        .set('Authorization', `Bearer ${token}`);
    await news.destroy();
    favoriteId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /favorites', async () => {
    const res = await request(app)
        .get('/favorites')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /favorites/:id', async () => {
    const favoriteUpdated = {
        rate: 1
    }
    const res = await request(app)
        .put(`/favorites/${favoriteId}`)
        .send(favoriteUpdated)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.rate).toBe(favoriteUpdated.rate);
});

test('DELETE /favorites/:id', async () => {
    const res = await request(app)
        .delete(`/favorites/${favoriteId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
