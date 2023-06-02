const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const NewsImg = require('../models/NewsImg');
require('../models');

let token;
let newsId;

beforeAll(async() => {
    const credentials = {
        email: "testuser@gmail.com",
        password: "testuser1234",
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token;
})

test('POST /news should create a news', async () => {
    const category = await Category.create({ name: "tech"});
    const news = {
        headline: "How Microsoft could use chatGPT to supercharge its products",
        lead: "The company’s move to double down on AI tools offers the promise of doing what Clippy never quite achieved: transforming how we work.",
        author: "Samantha Murphy Kelly",
        body: "Shortly after Microsoft confirmed plans this week to invest billions in OpenAI, the company behind the viral new AI chatbot tool ChatGPT, some people began joking on social media that the technology would help supercharge the much-hated, wide-eyed, paperclip-shaped virtual assistant. “There is a kernel of truth to the Clippy comparison,” David Lobina, an artificial intelligence analyst at ABI Research. “Clippy was not based on AI – or machine learning – but ChatGPT is a rather sophisticated auto-completion tool, and in that sense it is a much better version of Clippy.” Since it was made available in late November, ChatGPT has been used to generate original essays, stories and song lyrics in response to user prompts. It has drafted research paper abstracts that fooled some scientists. Some CEOs have even used it to write emails or do accounting work.",
        categoryId: category.id
    }
    const res = await request(app)
        .post('/news')
        .send(news)
        .set('Authorization', `Bearer ${token}`);
    newsId = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /news', async () => {
    const res = await request(app).get('/news');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /news/:id/images should set the news images', async () => {
    const image = await NewsImg.create({
        url: "http://falseurl.com",
        publicId: "false id",
    })
    const res = await request(app)
        .post(`/news/${newsId}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`)
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
