//All routes under in this file 
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()  //used to create view 
//New Blog route
router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})
//Edit blog route
router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)  
  res.render('articles/edit', { article: article })        
})
//async is used because findById() is the asynchronous function
//await is used for wait for the article
router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      //we can catch the error by using this block also we can print error by using console.log(e)
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router
