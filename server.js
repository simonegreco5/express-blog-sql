const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require('./routers/posts');
// import function of middleware server error 500
const serverError = require('./middlewares/serverError');
// import function of middleware server error 404
const notFound = require('./middlewares/notFound');
// import function of middleware server checkAiKey
const checkApiKey = require('./middlewares/checkApiKey');

// middlware per servire i file statici della cartella pubblic
app.use(express.static('public'))

// middlware per parsare il body della richiesta in formato json
app.use(express.json())


// create first route (welcome route)
app.get('/', (req, res) => {
    res.send('Welcome on express-blog-api-server');
})

/////////// ROUTES POSTS ///////////
// middleware checkApiKey
app.use('/api/posts', checkApiKey, postsRouter)


//////////// END ROUTES POSTS ///////////

// middlware server error 500
// app.use((err, req, res, next) => {
//     console.log(error.stack)
//     res.status(500).json({ error: true, message: "500 internal server error"})
// }) 
app.use(serverError) // oppure cosi importando la funzione dalla cartella middlewares

// middleware not found 404
// app.use((req, res, next) => {
//     res.status(404).json({ error: true, message: "404 not found"})
// })
app.use(notFound) // oppure cosi importando la funzione dalla cartella middleware

// start the server .listen
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})