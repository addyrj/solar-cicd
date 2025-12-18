const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require('express');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');

const app = express();

// CRITICAL: Increase payload limits (Docker might have stricter limits)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// CORS - must be before routes
// In your backend index.js
app.use(cors({
    origin: ['http://localhost:3000', 'http://frontend:80'], // Both dev and prod
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(useragent.express());

// Debug middleware - KEEP THIS to see what's happening in Docker
app.use((req, res, next) => {
    console.log('=== Incoming Request ===');
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body:', JSON.stringify(req.body));
    console.log('Query:', req.query);
    console.log('======================');
    next();
});

// Port configuration
const port = process.env.PORT || 5000;
console.log('=== ENVIRONMENT VARIABLES ===');
console.log('SECRET_KEY_ADMIN_AUTH_TOKEN:', process.env.SECRET_KEY_ADMIN_AUTH_TOKEN ? 'SET' : 'NOT SET');

// Database connection (your existing code)
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB || 'iot_solar',
    process.env.USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.HOST || 'mysql',
        dialect: process.env.DIALECT || 'mysql',
        port: 3306,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// API routes
const router = require("./Resources/Router/Routes.js");
app.use(process.env.ROOT_ROUTES || '/api', router);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Test POST endpoint to verify body parsing
app.post('/test-post', (req, res) => {
    res.json({
        message: 'POST received in Docker',
        body: req.body,
        contentType: req.headers['content-type']
    });
});

// Start server
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
    
    app.listen(port, '0.0.0.0', () => {
        console.log(`🚀 Server running on http://0.0.0.0:${port}`);
        console.log(`📡 API: http://0.0.0.0:${port}${process.env.ROOT_ROUTES}`);
    });
}

startServer();

module.exports = { app, sequelize };