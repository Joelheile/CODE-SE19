const request = require('supertest');
const app = require("./app");

describe('POST /success', () => {
  it('return 200 when correct', async () => {
    const response = await request(app)
      .post('/success')
      .send({
        description: 'Florian Heinemann, Daniel Krauss: Diese Szeneköpfe finanzieren die Code University',
        media: 'Gründerszene',
        articleLink: 'https://www.businessinsider.de/gruenderszene/perspektive/florian-heinemann-daniel-kraus-diese-szenekoepfe-finanzieren-die-code-university-audio-feb-24/',
        imageLink: 'https://cdn.businessinsider.de/wp-content/uploads/2024/01/202401_GS_Artikel_Bachem_1800x1200-1536x1024.jpg?ver=1706281216',
      });

    expect(response.statusCode).toBe(200);
  });
});