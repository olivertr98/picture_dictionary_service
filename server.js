// dependencies
const express = require('express');
const url = require('url');
var cors = require('cors');

//create the server
const app = express();
const port = 3002;

app.use(cors())

let tableOfContent = [{id: 1, name: 'The supermarket'},
                      {id: 2, name: 'Outdoor'},
                       {id: 3, name: 'houses'}];
let toc = "HI?"
let images = [{id:23, name:'the-supermarket.png', themeId: 1},
              {id:24, name:'outdoor-clothes.png', themeId: 2},
              {id:25, name:'houses.png', themeId: 3}];

let words = [{id: 1, name: 'scale', X: 120, Y: 250,
                number: 7, themeId: 1, imageId: 23},
             {id: 2, name: 'aisle', X: 450, Y: 230,
                                number: 10, themeId: 1, imageId: 23}];

function stepOne() {
  var themes = document.getElementById("browsers");
    var option = document.createElement("option");
    option.text = toc;
    themes.appendChild(option);




}

// the methods
app.get('/', (request, response) => {
  response.send('This is picture dictionary service.');
  var themes = document.getElementById("browsers");
  for (var i in images) {
    var option = document.createElement("option");
    option.text = i.name;
    themes.add(option);
    };
});
app.use(express.static("../ista330.sp20.pictureDictionary"))
app.get('/words/:contentId/:imageId/:objectX/:objectY', (request, response) => {
  let themeId = Number(request.params.contentId);
  let imageId = Number(request.params.imageId);
  let objectX = Number(request.params.objectX);
  let objectY = Number(request.params.objectY);
   // TODO:
   let word = words.find(x => x.themeId === themeId &&
                   x.imageId === imageId &&
                   x.X === objectX &&
                   x.Y === objectY);
  if(word) {
    response.json({name: word.name, number: word.number});
  } else {
    response.status(404).send('No word was found.');
  }
});

app.get('/pages/:contentId/image/:imageId', (request, response) => {
  let themeId = Number(request.params.contentId);
  let imageId = Number(request.params.imageId);
  let image = images.find(x => x.themeId === themeId && x.id === imageId);
  if(image) {
     response.sendFile(__dirname + '/data/' + image.name);
  } else {
    response.status(404).send('No images were found.');
  }
});

app.get('/contents', (request, response) => {
  response.json(tableOfContent);
});

app.get('/pages/:contentId', (request, response) => {
   let themeId = Number(request.params.contentId);
   let ids = images.filter(x => x.themeId === themeId)
         .map(x => x.id);
    response.json(ids);
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));
