import mysql from 'mysql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from 'express';
import crypto from 'crypto';

const generateToken = (id, type) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: type === 'access' ? '10m' : '1d' })
}

export const executeQuery = (req, res, queryType) => {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })

    const serverUserInfo = (id, fname, lname, email, admin) => {
        let accessToken = generateToken(id, 'access');
        let refreshToken = generateToken(id, 'refresh');

        connection.query('UPDATE users SET token = ? WHERE id = ?',
            [refreshToken, id], (error, results, fields) => {
                if (error) res.status(500).send('Error setting token on database')
            }
        )
        /* connection.query('CREATE EVENT delete_token ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 DAY DO BEGIN UPDATE users SET token = NULL WHERE id = ?; END;',
            [id], (error, results, fields) => {
                if (error) res.status(500).send('Error creating delete token event')
            }
        ) */
        connection.query('SELECT * FROM addresses WHERE user_id = ?',
            [id], (error, resultsAddresses, fields) => {
                if (error) {
                    res.status(500).send('Error selecting addresses')
                } else {
                    connection.query('SELECT * FROM orders WHERE user_id = ?',
                        [id], (error, resultsOrders, fields) => {
                            if (error) {
                                res.status(500).send('Error selecting orders')
                            } else {
                                res.cookie('token', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV !== "development" });
                                res.status(200).json({
                                    accessToken: accessToken,
                                    fname: fname,
                                    lname: lname,
                                    email: email,
                                    admin: admin,
                                    addresses: resultsAddresses,
                                    orders: resultsOrders
                                })
                            }
                        }
                    )
                }
            }
        )
    }

    if (queryType === 'Select All Products') {
        connection.query('SELECT * FROM products', (error, results, fields) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        })
    } else if (queryType === 'Select Product by Id') {
        connection.query('SELECT * FROM products WHERE id = ?', req.params.id, (error, results, fields) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        })
    } else if (queryType === 'Select Categories Binder') {
        connection.query('SELECT * FROM categories_binder', (error, results, fields) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        })
    } else if (queryType === 'Select Reviews') {
        connection.query('SELECT * FROM reviews', (error, results, fields) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        })
    } else if (queryType === 'Login') {
        connection.query('SELECT id, first_name, last_name, email, password, is_admin, token FROM users WHERE email = ?',
            [req.body.email], (error, results1, fields) => {
                if (error) {
                    res.send(error)
                } else {
                    if (results1.length === 0) {
                        res.status(400).json({})
                    } else {
                        bcrypt.compare(req.body.password, results1[0].password, (err, result) => {
                            if (err) res.send(err)

                            if (result) {
                                serverUserInfo(
                                    results1[0].id,
                                    results1[0].first_name,
                                    results1[0].last_name,
                                    results1[0].email,
                                    results1[0].is_admin
                                )
                            } else {
                                res.status(401).json({})
                            }
                        })
                    }

                }
            })
    } else if (queryType === 'Register') {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.send(err)
            } else {
                req.body.password = hash
                let userId = crypto.randomBytes(16).toString('hex')
                connection.query('INSERT INTO users(id, first_name, last_name, email, password) VALUES(?, ?, ?, ?, ?)',
                    [userId, req.body.first_name, req.body.last_name, req.body.email, req.body.password], (error, results, fields) => {
                        if (error) {
                            if (error.errno === 1062) {
                                res.status(409).json({})
                            } else {
                                res.status(500).json({})
                            }
                        } else {
                            connection.query('SELECT id, first_name, last_name, email, is_admin FROM users WHERE id = ?', [userId],
                                (error, results1, fields) => {
                                    if (error) {
                                        res.send(error)
                                    } else {
                                        serverUserInfo(
                                            results1[0].id,
                                            results1[0].first_name,
                                            results1[0].last_name,
                                            results1[0].email,
                                            results1[0].is_admin
                                        )
                                    }
                                }
                            )
                        }
                    }
                )
            }
        })

    } else if (queryType === 'Get Access Token') {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.clearCookie('token')
                        res.json({})
                    } else {
                        req.sendStatus(500)
                    }
                } else {
                    connection.query('SELECT id, first_name, last_name, email, is_admin, token FROM users WHERE id = ?',
                        [decoded.id],
                        (error, results, fields) => {
                            if (error) {
                                res.send(error)
                            } else {
                                if (results[0].token === req.cookies.token) {
                                    serverUserInfo(
                                        results[0].id,
                                        results[0].first_name,
                                        results[0].last_name,
                                        results[0].email,
                                        results[0].is_admin
                                    )
                                }
                            }
                        }
                    )
                }
            })
        } else { res.json({}) }

    } else if (queryType === 'Logout') {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                connection.query('UPDATE users SET token = NULL WHERE id = ?', [decoded.id], (err, results, fields) => {
                    if (err) {
                        res.status(500).send()
                    } else {
                        res.clearCookie('token')
                        res.status(200).send()
                    }
                })
            })
        } else { res.json({}) }
    } else if (queryType === 'Update User') {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.clearCookie('token')
                        res.json({})
                    } else {
                        req.sendStatus(500)
                    }
                } else if (req.body.email) {
                    connection.query('UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?',
                        [req.body.fname, req.body.lname, req.body.email, decoded.id], (err, results, fields) => {
                            if (err) res.sendStatus(500)
                            if (results) res.sendStatus(200)
                        })
                } else if (req.body.password) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            send(err)
                        } else {
                            connection.query('UPDATE users SET password = ? WHERE id = ?',
                                [hash, decoded.id], (err, results, fields) => {
                                    if (err) res.sendStatus(500)
                                    if (results) res.sendStatus(200)
                                }
                            )
                        }
                    })

                }

            })
        } else { res.status(401).json({}) }
    } else if (queryType === 'Add Address') {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.clearCookie('token')
                        res.json({})
                    } else {
                        req.sendStatus(500)
                    }
                } else {
                    let addressId = crypto.randomBytes(16).toString('hex')
                    connection.query('INSERT INTO addresses(id, user_id, street, city, postalCode, country) VALUES(?, ?, ?, ?, ?, ?)',
                        [addressId, decoded.id, req.body.street, req.body.city, req.body.postalCode, req.body.country], (err, results, fields) => {
                            if (err) {
                                res.sendStatus(500)
                                console.log(err)
                            } else {
                                connection.query('SELECT * FROM addresses WHERE id = ? ',
                                    [addressId], (err, results, fields) => {
                                        if (err) {
                                            res.sendStatus(500)
                                        } else {
                                            res.status(200).json(results)
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            })
        } else { res.status(401).json({}) }
    } else if (queryType === 'Delete Address') {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.clearCookie('token')
                        res.json({})
                    } else {
                        req.sendStatus(500)
                    }
                } else {
                    connection.query('DELETE FROM addresses WHERE id = ?',
                        [req.body.id], (err, results, fields) => {
                            if (err) res.sendStatus(500)
                            if (results) res.sendStatus(200)
                        })
                }
            })
        } else { res.status(401).json({}) }
    } else if (queryType === 'Create Order') {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.clearCookie('token')
                        res.json({})
                    } else {
                        req.sendStatus(500)
                    }
                } else {
                    let orderId = crypto.randomBytes(16).toString('hex')
                    connection.query('INSERT INTO orders(id, user_id, items_json, street, city, postalCode, country, recipient_name, email, payment_method, total) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [orderId, decoded.id, req.body.items, req.body.street, req.body.city, req.body.postalCode, req.body.country, req.body.name, req.body.email, req.body.paymentMethod, req.body.total],
                        (err, results, fields) => {
                            if (err) res.status(500).send(err)
                            if (results) {
                                connection.query('SELECT * FROM orders WHERE id = ?', [orderId], (err, results, fields) => {
                                    if (err) res.status(500).send(err)
                                    if (results) {
                                        res.status(201).json(results)
                                    }
                                })
                            }
                        })
                }
            })
        } else { res.status(401).json({}) }
    } else if (queryType === 'Create Review') {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.clearCookie('token')
                        res.json({})
                    } else {
                        req.sendStatus(500)
                    }
                } else {
                    let reviewId = crypto.randomBytes(16).toString('hex')
                    connection.query('INSERT INTO reviews(id, user_id, product_id, review_text, user_name, rating) VALUES(?, ?, ?, ?, ?, ?)',
                        [reviewId, decoded.id, req.body.product_id, req.body.text, req.body.name, req.body.rating],
                        (err, results, fields) => {
                            if (err) res.status(500).send(err)
                            if (results) {
                                connection.query('SELECT * FROM reviews WHERE id = ? ',
                                    [reviewId], (err, results, fields) => {
                                        if (err) {
                                            res.status(500).send(err)
                                        } else {
                                            res.status(200).json(results)
                                        }
                                    }
                                )
                            }
                        })
                }
            })
        } else { res.status(401).json({}) }
    } else if (queryType === 'Delete Review') {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.clearCookie('token')
                        res.json({})
                    } else {
                        req.sendStatus(500)
                    }
                } else {
                    let reviewId = crypto.randomBytes(16).toString('hex')
                    connection.query('INSERT INTO reviews() VALUES()',
                        [reviewId, decoded.id],
                        (err, results, fields) => {
                            if (err) res.status(500).send(err)
                            if (results) {
                                req.sendStatus(201)
                            }
                        })
                }
            })
        } else { res.status(401).json({}) }
    } else if (queryType === 'Delete Account') {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.clearCookie('token')
                        res.json({})
                    } else {
                        req.sendStatus(500)
                    }
                } else {
                    res.clearCookie('token')
                    connection.query('DELETE FROM orders WHERE user_id = ?',
                        [decoded.id],
                        (err, results, fields) => {
                            if (err) res.status(500).send(err)
                            if (results) {
                                connection.query('DELETE FROM reviews WHERE user_id = ?',
                                    [decoded.id],
                                    (err, results, fields) => {
                                        if (err) res.status(500).send(err)
                                        if (results) {
                                            connection.query('DELETE FROM addresses WHERE user_id = ?',
                                                [decoded.id],
                                                (err, results, fields) => {
                                                    if (err) res.status(500).send(err)
                                                    if (results) {
                                                        connection.query('DELETE FROM users WHERE id = ?',
                                                            [decoded.id],
                                                            (err, results, fields) => {
                                                                if (err) res.status(500).send(err)
                                                                if (results) res.sendStatus(200)
                                                            })
                                                    }
                                                })
                                        }
                                    })
                            }
                        })
                }
            })
        } else { res.status(401).json({}) }
    }
}
