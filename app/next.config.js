const withTypescript = require('@zeit/next-typescript');

module.exports = Object.assign({
  publicRuntimeConfig: { // Will be available on both server and client
    API_HOST: 'http://localhost:1337'
  }
}, withTypescript());