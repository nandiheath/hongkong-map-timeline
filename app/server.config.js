module.exports = {
  apps: [{
    name: 'hongkong-timeline-map-frontend',
    script: 'npm',
    args: 'run start',
    watch: false,
    max_restarts: 5,
    restart_delay: 1000,
    env: {
      "NODE_ENV": "production",
    }
  }],
};