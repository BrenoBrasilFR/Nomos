import colors from 'colors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ProductRoutes from './productRoutes.js';
import UserRoutes from './userRoutes.js';
import { executeQuery } from './database.js';
import * as path from 'path'

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

dotenv.config();

app.get('/api/token', (req, res) => {
    executeQuery(req, res, 'Get Access Token')
})

app.get('/api/categories', (req, res) => {
    executeQuery(req, res, 'Select Categories Binder')
})

app.get('/api/product_reviews', (req, res) => {
    executeQuery(req, res, 'Select Reviews');
})

app.use('/api/products', ProductRoutes)

app.use('/api/user_session', UserRoutes)

const __dirname = path.resolve()

/* if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
} */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.green)
})