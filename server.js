const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

//mongo url is different and delete password for that demo cluster 

const url="mongodb+srv://savage:123@cluster0.gfz1v.mongodb.net/demo?retryWrites=true&w=majority"
const dbName = "list"; //"list"

app.listen(3030, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('collectiontasks').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {tasksArray: result})
  })
})


 // create a task and when completed it marked

app.post('/taskList', (req, res) => {
// you could se db.collection('').insertOne method instead of save 
// insert 
  db.collection('collectiontasks').save({
    task: req.body.task,
    completed: '' // tp put task 
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


//// updates when task is completed when clicking 
/// on the button 
app.put('/update', (req, res) => {
  db.collection('collectiontasks')
  //findOneAndUpdate is within mongoDB 
  // basically Monogo is find that and update 
  .findOneAndUpdate({task: req.body.task}, {
    $set: {
      task:'Completed the task',
      completed: '[Delete this item ]'

    }
  }, {
    //if it doesn't find anything please 
    // create it then 
    sort: {_id: -1},  //
    upsert: true  // insert a fake one and will make it 
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

///to delete  a task etc.
// basically find one and delete one 
app.delete('/remove', (req, res) => {
  db.collection('collectiontasks').findOneAndDelete({task: req.body.task}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})






