import express from 'express';
import { executeQuery } from './database.js';
const router = express.Router();

router.post('/login', (req, res) => {
    executeQuery(req, res, 'Login');
})

router.post('/register', (req, res) => {
    executeQuery(req, res, 'Register')
})

router.get('/logout', (req, res) => {
    executeQuery(req, res, 'Logout');
})

router.post('/user_update', (req, res) => {
    executeQuery(req, res, 'Update User')
})

router.post('/add_address', (req, res) => {
    executeQuery(req, res, 'Add Address')
})

router.post('/delete_address', (req, res) => {
    executeQuery(req, res, 'Delete Address')
})

router.post('/create_order', (req, res) => {
    executeQuery(req, res, 'Create Order')
})

router.post('/create_review', (req, res) => {
    executeQuery(req, res, 'Create Review')
})

router.get('/delete_account', (req, res) => {
    executeQuery(req, res, 'Delete Account')
})

export default router; 