const path = require('path');
const fs = require('fs')

var uniqid = require('uniqid');


module.exports = (app) => {

  
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

 
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);

    let userNotes = {
      title: req.body.title,
      text: req.body.text,

      id: uniqid(),
    };

    db.push(userNotes);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

  });


 
  app.delete('/api/notes/:id', (req, res) => {
    
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
    
  })
};

// GET /api/notes should read the db.json file and return all saved notes as JSON.
// POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client.
// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.