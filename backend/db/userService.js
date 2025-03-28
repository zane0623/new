const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('./init');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

const userService = {
  // Create a new user
  createUser: async (userData) => {
    const { fullName, email, password, role } = userData;
    
    try {
      // Check if user already exists
      const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const stmt = db.prepare(`
        INSERT INTO users (fullName, email, password, role)
        VALUES (?, ?, ?, ?)
      `);

      const result = stmt.run(fullName, email, hashedPassword, role);
      
      // Get created user (without password)
      const user = db.prepare('SELECT id, fullName, email, role FROM users WHERE id = ?').get(result.lastInsertRowid);
      
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  loginUser: async (email, password) => {
    try {
      // Get user
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Create token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Store session
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      const stmt = db.prepare(`
        INSERT INTO sessions (userId, token, expiresAt)
        VALUES (?, ?, ?)
      `);

      stmt.run(user.id, token, expiresAt.toISOString());

      // Return user data and token (without password)
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      throw error;
    }
  },

  // Verify token
  verifyToken: async (token) => {
    try {
      // Check if token exists in sessions and is not expired
      const session = db.prepare(`
        SELECT * FROM sessions 
        WHERE token = ? AND expiresAt > datetime('now')
      `).get(token);

      if (!session) {
        throw new Error('Invalid or expired token');
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = db.prepare('SELECT id, fullName, email, role FROM users WHERE id = ?').get(decoded.userId);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logoutUser: async (token) => {
    try {
      const stmt = db.prepare('DELETE FROM sessions WHERE token = ?');
      stmt.run(token);
      return true;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = userService; 