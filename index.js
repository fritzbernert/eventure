const express = require('express');
const Datastore = require('nedb');
const path = require('path');

const app = express();
//app.listen(3000, () => console.log('listening at 3000'));
app.listen(process.env.PORT || 3000);
app.use(express.static('public'));
app.use(express.json({ limit: '100mb' }));

const itemDB = new Datastore('itemDB.db');
itemDB.loadDatabase();
const categoryDB = new Datastore('catergoryDB.db');
categoryDB.loadDatabase();


//db get
app.get('/api/item', (request, response) => {
  itemDB.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});
app.get('/api/category', (request, response) => {
  categoryDB.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.get('/api/categoryItems/:id', (request, response) => {
  categoryDB.find({name: request.params.id}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data[0].items);
  });
});
app.get('/api/item/:id', (request, response) => {
  itemDB.find({name: request.params.id}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.get('/api/password', (request, response) => {
  response.json({pwd: '1806'});
});


//db post
app.post('/api/item', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;

  itemDB.update({ name: data.name }, { $set: data }, { upsert: true }, function (err) {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });

  console.log(data);
});
app.post('/api/category', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    categoryDB.update({ name: data.name }, { $set: data }, { upsert: true }, function (err) {
      if (err) {
        response.end();
        return;
      }
      response.json(data);
    });

    console.log(data);
});
app.post('/api/category/addItem', (request, response) => {
  const data = request.body;

  categoryDB.update({ name: data.item }, { $push: { items: data.name } }, {}, function (err) {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });

  console.log(data);
});



//ROUTES

//static pages
//home
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

//all items
app.get('/item', function(req, res){
    res.sendFile(path.join(__dirname+'/public/page/item.html'));
});

//all categorys
app.get('/category', function(req, res){
    res.sendFile(path.join(__dirname+'/public/page/category.html'));
});

//create items/categorys
app.get('/create/D2jZnBKWxv8ig4Ti', function(req, res){
  res.sendFile(path.join(__dirname+'/public/page/create.html'));
});

//affiliate items
app.get('/redir/:id', function(req, res){
  const id = req.params.id;
  res.redirect("https://www.digistore24.com/redir/" + id + "/FritzBernert/")
});


//dynamic pages
//specific page
app.get('/item/:id', function(req, res){
    var id = req.params.id;
    var resData;
    itemDB.find({name: id}, (err, data) => {
        if (err) {
            console.error(err);
          return;
        }
        if(data[0] == undefined){
            console.log("no data at: " + id);
            return;
        }
        resData = data[0];

        if(!resData.link.includes("/redir/")){
          resData.link = path.join('https://'+resData.link);
        }

        res.render("itemPage", 
          { name: resData.name.replaceAll('_', ' '), 
            description: resData.desc, 
            imgName: resData.imgName, 
            link: resData.link
          });
    });
});



//specific category
app.get('/category/:id', function(req, res){
    var id = req.params.id;
    var resData;
    var itemData = [];
    categoryDB.find({name: id}, (err, data) => {
        if (err) {
            console.error(err);
          return;
        }
        if(data[0] == undefined){
            console.log("no data at: " + id);
            return;
        }
        resData = data[0];

        res.render("categoryPage", 
          { title: resData.name, 
            name: resData.name.replaceAll('_',' '), 
            imgName: resData.imgName, 
            description:resData.desc 
          });

    });
    
});


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/page"));
