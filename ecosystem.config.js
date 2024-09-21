module.exports = {
    apps: [
      {
        name: 'vendure-server',
        script: 'yarn',
        args: 'run start:server',
        env: {
          NODE_ENV: 'production',
        },
        autorestart: true
      },
      {
        name: 'vendure-server-worker',
        script: 'yarn',
        args: 'run start:worker',
        env: {
          NODE_ENV: 'production',
        },
        autorestart: true
      },
    ],
  };