const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require('./routes/api')(app);
require('./routes/html')(app);


app.listen(PORT, () => {
  console.log(`Server available at localhost${PORT}`);
});

//create instance of express
//express create route for files in public folder
//express data parser/middle wear handler lines 8-9
//created routes to the js files 
//app listener to start the server 
//vip dont forget this in future
