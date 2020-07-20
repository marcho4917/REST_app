const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require('../../../server');
const Concert = require('../../../models/concert.model');


describe('GET /api/concerts', () => {
    before(async () => {
        const testConcertOne = new Concert ({_id: '5d9f1140f10a81216cfd4408', performer: 'Shakira', genre: 'POP', price: 5, day: 1});
        await testConcertOne.save();

        const testConcertTwo = new Concert ({_id: '5d9f1140f10a81216cfd5487', performer: 'Ricky Martin', genre: 'POP', price: 25, day: 2});
        await testConcertTwo.save();
    });
    after(async () => {
        await Concert.deleteMany();
    });
    it('should return concerts by performer', async () => {
        const res = await request(server).get('/api/concerts/performer/Shakira');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });
    it('should return concerts by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/POP');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });
    it('should return concerts by price', async () => {
        const res = await request(server).get('/api/concerts/price/10/30');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });
    it('should return concerts by day', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });
});