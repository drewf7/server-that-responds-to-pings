const chai = require('chai');
const expect = chai.expect;
const axios = require('axios');

const baseURL = 'http://localhost:3000/'

/**
 * Generates a random number and returns it as a string
 */
function getRandomizedString() {
    return Math.random(36).toString().slice(2); // Slice gets rid of 0.
}

describe('Tests', function() {
    it('Should respond "pong" on the base URL', async function() {
        const res = await axios.get(baseURL);

        expect(res.status).to.equal(200);

        expect(res.data).to.equal("Pong");
    });

    it('Should respond "pong" on a random URL', async function() {
        const res = await axios.get(baseURL + getRandomizedString());

        expect(res.status).to.equal(200);

        expect(res.data).to.equal("Pong");
    });
})