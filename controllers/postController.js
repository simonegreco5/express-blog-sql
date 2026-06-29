const posts = require('../data/posts');

const index = (req, res) => {
    // res.json({ message: "show all posts" })

    console.log(req.query) // example: { tag: salati }
    const tag = req.query.tag

    if (tag) {
        const filteredPost = posts.filter(post => post.tags.includes(tag))
        return res.json(filteredPost)
    }
    // for try: http://localhost:3000/api/posts?tag=salati (?chiave=valore)

    res.json(posts)
}

const show = (req, res) => {
    // res.json({ message: "read a single post" })

    const postId = parseInt(req.params.id)

    // find single post by comparing the id
    const thisPost = posts.find(post => post.id === postId)

    // if post id not exist, show error 404
    if (!thisPost) {
        return res.status(404).json({ error: true, message: "post not found" })
    }

    res.json(thisPost)
}

const store = (req, res) => {
    // res.json({ message: "create a new post" })

    console.log(req.body) // { titolo: "sfogliatella", contenuto: "La sfogliatella è un dolce tipico...", immagine: "http://localhost:3000/images/torta_paesana.jpeg", tags: ["cucina", "ricette", "dolci"] }

    // create a new id for the new post
    const newId = posts[posts.length - 1].id + 1 // prendiamo l'ultimo id già presente e lo incrementiamo di 1

    // create the new post object
    const newPost = {
        id: newId,
        ...req.body
        // in alternativa allo spred (...req.body)
        // titolo: req.body.titolo
        // contenuto: req.body.contenuto
        // immagine: req.body.immagine
        // tags: req.body.tags
    }

    console.log(newPost) // check in terminal the new post object

    // push newPost in the posts array
    posts.push(newPost)

    res.status(201).json({ message: "post added", newPost })
}

const update = (req, res) => {
    // res.json({ message: "update a post" })

    const postId = parseInt(req.params.id)
    const thisPost = posts.find(post => post.id === postId)

    // if id post not exist show error 404
    if (!thisPost) {
        req.status(404).json({ error: true, message: "post not found" })
    }

    // update the post properties with the request body data
    thisPost.titolo = req.body.titolo || thisPost.titolo
    thisPost.contenuto = req.body.contenuto || thisPost.contenuto
    thisPost.immagine = req.body.immagine || thisPost.immagine
    thisPost.tags = req.body.tags || thisPost.tags
    // ( || thisPost.chiave ) è facoltativo, serve a restituire il valore precedente 
    // ossia quello non modificato, qualora quello modificato non esiste

    console.log(thisPost) // chek update post in the terminal

    res.json(thisPost)
    
}

const modify = (req, res) => {
    res.json({ message: "modify a post" })
}

const destroy = (req, res) => {
    // res.json({ message: "delete a post" })

    const postId = parseInt(req.params.id)
    // find single post by comparing the id (same as show)
    const thisPost = posts.find(post => post.id === postId)

    // if post id not exist, show error 404
    if (!thisPost) {
        return res.status(404).json({ error: true, message: "post not found" })
    }


    // step for DELETE
    // find the post index from array
    const index = posts.indexOf(thisPost)

    // now, delete 1 element from 1 position
    posts.splice(index, 1) // index, in questo caso, sarebbe l'indice di riferimento del post (ovvero l'intero oggetto)

    // show updated list in the terminal
    console.log(posts)

    // update the status of server
    res.status(204).json({ message: "no content" })
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}