const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{association:'authors'}]
    })
      .then((books) => {
        res.render('home', { books:books });
      })
      .catch((error) => res.send(error));
  },
  bookDetail: (req, res) => {
    db.Book.findByPk(req.params.id,{
      include:'authors'
    })
            .then(books =>{
              res.render('bookDetail',{books})
            })
  },
  bookSearch: (req, res) => {
    res.render('search', { books: [],notFound: false});
  },
  bookSearchResult: (req, res) => {
    let title = req.body.title;
        db.Book.findOne({
            where: {
                title: {[Op.like]: `%${title}%`}
            }
        }).then(books => {
            if (books){
                res.redirect(`/books/detail/${books.id}`)
            }else{
              res.render('search',{notFound: true})
            }
        })
  },
  deleteBook: (req, res) => {
    db.Book.destroy({where: {id:req.params.id},force:true})
    .then(()=>{
      return res.redirect('/')})
    .catch(error=> res.send(error))
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', {authors});
      })
      .catch((error) => res.send(error));
  },
  authorBooks: (req, res) => {
    db.Author.findByPk(req.params.id,
      {include:'books'})
      .then(authors=>{
        console.log(authors)
        res.render('authorBooks',{authors})
      })
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => res.send(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: (req, res) => {
    db.Book.findByPk(req.params.id,{include:'authors'})
    .then(books=>{
      res.render('editBook', {books})
    })
  },
  processEdit: (req, res) => {
    db.Book.update({
      title: req.body.title,
      cover: req.body.cover,
      description: req.body.description
    },
    {
      where: {id: req.params.id}
    })
    .then(()=>{
     return res.redirect('/')
    })
    .catch(error=>res.send(error))
  }
};

module.exports = mainController;
