const {validationResult} = require('express-validator');
const {Movie , Sequelize} = require('../database/models');
const {Op} = Sequelize;


const moviesController = {
    'list': (req, res) => {
       Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
       Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        Movie.findAll({
            where: {
                rating: {[Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd.ejs')
    },
    create: function (req, res) {

        let errors = validationResult(req);

        if (errors.isEmpty()) {
            Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
            })
            .then((movie => {
                return res.send(movie);
            }))
            .catch(error => console.log(error));
            
            res.redirect('/movies');
        } else {
            return res.render('moviesAdd.ejs', {
                errors: errors.mapped(),
                old: req.body
        });

        }
    },
    edit: function(req, res) {
        Movie.findByPk(req.params.id)
            .then(Movie => {
                res.render('moviesEdit.ejs', {Movie});
            });
    },
    update: function (req,res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
        Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            }, {
                where: {
                    id: req.params.id
                    }
                })
            } else {
                Movie.findByPk(req.params.id)
            .then(Movie => {
                res.render('moviesEdit.ejs', {Movie,
                    errors: errors.mapped(),
                    old: req.body});
            });
            }
    },
    delete: function (req, res) {
        Movie.findByPk(req.params.id)
            .then(Movie => {
                res.render('moviesDelete.ejs', {Movie});
            });
    },
    destroy: function (req, res) {
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/movies');
    }

}

module.exports = moviesController;