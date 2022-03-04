const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) =>{
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    })
        .then(postList => {
            const posts = postList.map(post => post.get({ plain: true }));
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;