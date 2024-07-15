import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.render('index.ejs');
// });




let posts = [];

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts });
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/new', (req, res) => {
    const post = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('edit', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

// Update post route
app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/view', (req, res) => {
    res.render('view.ejs', { posts: posts });
});

app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    res.redirect('/');
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});