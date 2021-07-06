const express = require('express');
const Datastore = require('nedb');
const path = require('path');

const app = express();
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
});
app.post('/api/email/send', (request, response) => {
  var eData = [];
  for (let i = 0; i < request.body.items.length; i++) {
    itemDB.find({name: request.body.items[i]}, (err, data) => {
      if (err) {
        response.end();
        return;
      }
      eData.push(data[0]);   
        
      if(i == request.body.items.length-1){
        sendEmail(eData);
      }
    });    
  }
});
app.post('/api/email/subscribe', (request, response) => {
  const fs = require('fs');

  var mailList;

  fs.readFile('mailList.txt', 'utf8', function(err, mailData){
    mailData = mailData.replaceAll("\r","");
    mailData = mailData.split("\n");

    if(!mailData.includes(request.body.email)){
      fs.appendFile('mailList.txt', request.body.email+"\n", function (err) {
        if (err) throw err;
      });
    }else{
      console.log("email exists");
    }
  });

});
app.post('/api/email/unsubscribe', (request, response) => {
  const fs = require('fs');

  var mailList;

  fs.readFile('mailList.txt', 'utf8', function(err, mailData){
    mailData = mailData.replaceAll("\r","");
    mailData = mailData.split("\n");

    if(mailData.includes(request.body.email)){
      mailData.splice(mailData.indexOf(request.body.email), 1);
      for (const item of mailData) {
        fs.writeFile('mailList.txt', item + '\n', function(err) {
          if(err) {
            console.log(err);
            response.end();
          }
          
        });
      }
    }else{
      console.log("email doesnt exists");
      response.end();
    }
  });
  response.json("Unsubscribed");
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

//sitemap
app.get('/sitemap', function(req, res){
  res.sendFile(path.join(__dirname+'/sitemap.xml'));
});

//maillist
app.get('/mailList.txt', function(req, res){
  res.sendFile(path.join(__dirname+'/mailList.txt'));
});

//create items/categorys
app.get('/unsubscribe', function(req, res){
  res.sendFile(path.join(__dirname+'/public/page/unsubscribe.html'));
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
          resData.link = 'https://'+resData.link;
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


//newsletter
const nodemailer = require('nodemailer');
const csv = require('csvtojson/v1');
const schedule = require('node-schedule');
const template = require(path.join(__dirname,'public/js/newsletter.js'));

const account = {
  user: 'eventure.mail@gmx.net',
  pass: 'FB-gmx18'
}

let transporter = nodemailer.createTransport({
  host: "smtp.gmx.net",
  port: 587,
  secure: false, 
  auth: {
    user: account.user,
    pass: account.pass,
  },
});

var sendlist = []; 
var message_increment = 0; 

function sendEmail(data){
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      get_list(data);
    }
  });
}

function trigger_sending(address, data){ 
  console.log(data);
  transporter.sendMail({
    from: 'Eventure <eventure.mail@gmx.net>',
    to: address,
    subject: 'Newsletter',
    text: template.generatePlainText(data).toString(),
    html: template.generate(data).toString(),
  }, (error, info) => {
    if (error) {
      return console.log(error);
    }
    //console.log('Message sent: %s', info.messageId);
  });
}

function set_message_delays(data){
  var message_job = schedule.scheduleJob('*/10 * * * * *', function(){
    trigger_sending(sendlist[message_increment], data);
    if(message_increment < sendlist.length){
      message_increment++;
    }
    if(message_increment >= sendlist.length){
      message_job.cancel();
    }
  });
}

function get_list(data){
  const fs = require('fs');
  
  fs.readFile('mailList.txt', 'utf8', function(err, mailData){
    mailData = mailData.replaceAll("\r","");
    mailData = mailData.split("\n");

    sendlist = mailData;
    set_message_delays(data);
  });
}

