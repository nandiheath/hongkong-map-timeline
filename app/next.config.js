require('dotenv').config();
const withTypescript = require('@zeit/next-typescript');

module.exports = Object.assign({
  publicRuntimeConfig: { // Will be available on both server and client
    API_HOST: process.env.API_HOST
  }
}, withTypescript());