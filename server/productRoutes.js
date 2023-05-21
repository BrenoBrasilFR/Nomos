import express from 'express';
import { executeQuery } from './database.js';
const router = express.Router();

router.get('/', (req, res) => {
    executeQuery(req, res, 'Select All Products');
})

router.get('/:id', (req, res) => {
    executeQuery(req, res, 'Select Product by Id');
})

export default router;