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

router.get('/post/:id', (req, res) =>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['content'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.json(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });
            res.render('single-post', { post } );
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