const config = {
  env: process.env.NODE_ENV || "development", // Default to development
  port: process.env.PORT || 5000, // Default to port 5000
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", // Default JWT secret
  mongoUri: process.env.MONGODB_URI, // Load MongoDB URI from environment variable
};

export default config;
