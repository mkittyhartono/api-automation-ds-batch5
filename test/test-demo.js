// describe('Ini adalah test suite', () => {
//     it('Ini adalah test case 1', () => {
//         console.log('Isi dari test case 2')
//     });

//     it('Ini adalah test case 2', () => {
//         console.log('Isi dari test case 2')
//     });
//     describe('Test Suite didalam test Suite', () => {
//         it('Test case di dalam test suite 1', () => {
//             console.log('Isi dari test suite dalam test');
//         });
//     });
// });

// describe('Ini adalah test suite 2', () => {
//     it('Ini adalah test case 3', () => {
//         console.log('Isi dari test case 3')
//     });

//     it('Ini adalah test case 4', () => {
//         console.log('Isi dari test case 4')
//     });
// });

// fungsi pemanggilan supertest
// GET Request with supertest
const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');

// Belajar tentang chai sesi 7 lagi -- tentang json schema yang beda folders
// https://www.chaijs.com/guide/

const assert = chai.assert
const should = chai.should
const expect = chai.expect
// import { assert } from 'chai';
// import request from 'supertest';

describe('API Test for "restful-api.dev"', () => {
    const BASE_URL = "https://api.restful-api.dev/";

    it('Test - Get All Object', async () => {
        const response = await request(BASE_URL).get("objects");
    //     console.log(response.statusCode);
        // console.log(response.body);

        //assertions
        assert.equal(response.statusCode, 200);
        assert.equal(response.body[0].name, "Google Pixel 6 Pro");
        
        expect(response.statusCode).to.equal(200);
    });

    //POST Request with Supertest
    it('Test - Post Store Object', async () => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
        }
        const response = await request(BASE_URL)
        .post("objects")
        .send(body);
        // console.log(response.statusCode);
       // console.log(response.body);

        //assertions
        should(response.statusCode === 200);
        const schemaPath = "resources/jsonSchema/post-object-schema.json";
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        assert.jsonSchema(response.body, jsonSchema);
    });

    //Delete Request with Supertest
    it('Test - Delete Object', async () => {
        const response = await request(BASE_URL)
        .delete("objects/1");
        // console.log(response.statusCode);
       // console.log(response.body);

        //assertions
        should(response.statusCode === 200);
    });

    //Put Request with Supertest
    it('Test - Put UpdateObject', async () => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 2049.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "color": "silver"
            }
        }
        const response = await request(BASE_URL)
        .put("objects/1")
        .send(body);
        // console.log(response.statusCode);
       // console.log(response.body);
       
       //assertions
        should(response.statusCode === 200);
    });

});