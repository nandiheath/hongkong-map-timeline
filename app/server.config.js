module.exports = {
  apps: [{
    name: 'hongkong-timeline-map-frontend',
    script: './production-server/server/app.js',
    watch: false,
    max_restarts: 5,
    restart_delay: 1000,
    env: {
      "NODE_ENV": "production",
    }
  }],
};
