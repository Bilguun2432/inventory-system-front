module.exports = {
  apps: [
    {
      name: "corporate_gateway_admn",
      script: "node_modules/next/dist/bin/next",
      args: "start", // Command to start Next.js in production mode
      // args: "dev", // Command to dev Next.js in production mode
      instances: 2, // Number of instances to run (usually 1 in production)
      autorestart: true, // Enable automatic restarts
      watch: false, // Set to true if you want PM2 to watch for file changes and restart the process
      max_memory_restart: "1G", // Maximum memory usage before automatic restart
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
