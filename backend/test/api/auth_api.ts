import * as chai from 'chai';
import chaiHttp = require('chai-http');
// https://stackoverflow.com/questions/39415661/
// what-does-resolves-to-a-non-module-entity-and-cannot-be-imported-using-this
import server from './../../src/server';
import {
  MONGODB_HOST, MONGODB_DATABASE, MONGODB_USER, MONGODB_PASSWORD,
} from './../../src/common/env';
import * as PromiseBluebird from 'bluebird';
import * as mongoose from 'mongoose';

chai.use(chaiHttp);

const { expect } = chai;

describe('api', () => {
  // before the tests setup the mongo constant first
  before(() => {
    const mongoDB = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;
    const opt = {
      useNewUrlParser: true,
      user: null,
      pass: null,
      auth: null,
    };

    if (MONGODB_USER !== '') {
      opt.user = MONGODB_USER;
      opt.pass = MONGODB_PASSWORD;
      opt.auth = {
        authdb: 'admin',
      };
    }

    mongoose.connect(mongoDB, opt);
  });

  after(() => {
    mongoose.connection.close();
  });

  describe('auth', () => {
    after((done) => {
      mongoose.connection.db.dropCollection('users', done);
    });

    it('it should return 401 if not logged in', async () => {
      const res = await chai.request(server).get('/me');
      expect(res.status).to.be.eq(401);
    });

    it('it should register a user', async () => {
      const res = await chai.request(server).post('/auth/register').type('json').send({
        username: 'abc',
        password: 'abc',
      });
      expect(res.status).to.be.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body.access_token).to.be.not.null;
    });

    it('it should return error for duplicated keys', async function () {
      this.timeout(5000);
      const requester = chai.request(server).keepOpen();
      let res = await requester.post('/auth/register').type('json').send({
        username: 'abc',
        password: 'abc',
      });
      expect(res.status).to.be.eq(200);

      res = await requester.post('/auth/register').type('json').send({
        username: 'abc',
        password: 'abc',
      });
      expect(res.status).to.be.eq(500);

    });
  });
});
