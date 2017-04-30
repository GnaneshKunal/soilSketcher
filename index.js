const http = require('http'),
      express = require('express'),
      path = require('path'),
      open = require('open'),
      firebase = require('firebase-admin'),
      firebaseAccount = require('./firebase'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express(),
      cors = require('cors'),
      server = http.createServer(app),
      PORT = process.env.PORT || 8080;

firebase.initializeApp({
    credential: firebase.credential.cert(firebaseAccount),
    databaseURL: "https://soil-reactfire.firebaseio.com"
});

app.use(morgan('tiny'));
app.use(cors()); //if the data comes from a different domain, sub-domain or port
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//firebase databaes
let db = firebase.database();
let posts = db.ref('/soil/posts');

//routes
app.get('/', (req, res) => {
    return res.sendFile(path.join( __dirname, '/public/index.html'));
});

app.get('/soil', (req, res) => {
    let val = Number.parseInt(req.query.val);
    if (!val)
        return res.status(500).send("Bad Request");
    let date = Date.now();
    let updates = {};
    updates[date] = val;
    posts.update(updates);
    return res.status(200).send("Updated");
});

app.get('/values', (req, res, next) => {
    posts.once('value')
        .then(snapshot => {
            let values = snapshot.val();
            return res.status(200).send(values);
        }).catch(error => {
            return next(error);
        });
});

server.listen(PORT, () => {
    console.log('Server listening on PORT: ' + PORT);
    open(`http://localhost:${PORT}/`);
});