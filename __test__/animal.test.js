const request = require('supertest');
const app = require('../src/app');
const animais = require('../src/data/animals.json');
const fs = require('fs');

describe('Adiciona animal', () => {
    it('Deve cadastrar um animal com sucesso', async () => {
        const res = await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3');
        expect(res.status).toBe(201);
    });

    it('Deve cadastrar um animal com sucesso', async () => {
        const res = await request(app).post('/animais?nome=Mimi&especie=Gato&idade=jovem');
        expect(res.status).toBe(400);
    });
    
    it('Deve cadastrar um animal com sucesso', async () => {
        const res = await request(app).post('/animais?nome=J&especie=Hamster&idade=1');
        expect(res.status).toBe(400);
    });
    
    afterAll(() => {
        while(animais.length > 0) {
            animais.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animais));
    })
});

describe('Busca animal', () => {
    beforeAll(() => {
        animais.push({
            nome: 'Fred',
            especie: 'Gato',
            idade: 10,
        })

        animais.push({
            nome: 'James',
            especie: 'Cachorro',
            idade: 3,
        })

        animais.push({
            nome: 'Paty',
            especie: 'Gato',
            idade: 2,
        })
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animais));
    });

    it('Busca animal', async () => {
        const res = await request(app).get('/animais');
        expect(res.body.length).toBe(3);
    });
    
    afterAll(() => {
        while(animais.length > 0) {
            animais.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animais));
    })
});
