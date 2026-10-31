import * as util from 'util';
import app from './app';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = () => {
  try {
    app.listen(PORT, () => {
      process.stdout.write(util.format(`🚀 API Server running on port ${PORT}`) + "\n");
    });
  } catch (error) {
    process.stderr.write(util.format('Failed to start server:', error) + "\n");
    process.exit(1);
  }
};

startServer();
