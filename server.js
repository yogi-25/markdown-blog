const express = require('express')
const mongoose = require('mongoose') //using this library we can actually connect to the database.
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
//connection method of database is used below
//blog is name of database
//useNewUrlParser,useUnifiedTopology and useCreateIndex these parameters are used depends on mongodb version.
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')   // written all views in ejs and View engine convert this ejs code into HTML.
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' }) //sorted these article depends on when they are created .
  res.render('articles/index', { articles: articles })  // Newer ones are at top beacuse of desc i.e desending order.
})

app.use('/articles', articleRouter)

app.listen(5000)   //listen port 5000 =>means we can type localhost:5000 on browser
