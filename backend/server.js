require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db/init');
const authRoutes = require('./api/auth');

// Start the application
async function startApp() {
  try {
    // Initialize database
    await initializeDatabase();
    
    const app = express();
    
    // Middleware
    app.use(cors());
    app.use(express.json());
    
    // Routes
    app.use('/api/auth', authRoutes);
    
    // Error handling
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something broke!' });
    });
    
    const PORT = process.env.PORT || 3001;
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Run the application
startApp(); 