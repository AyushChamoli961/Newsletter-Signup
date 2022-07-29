var express = require('express')
var path = require('path')
var fs = require("fs")
var MongoClient = require('mongodb'). MongoClient
var bodyParser = require('body-parser') 
var app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(path. join(__dirname,"signup.html"))
})

app.get('/get-profile', function (reg, res) {
   var response = res;
   MongoClient.connect('mongodb://mongoadmin:pass@localhost:27017', function (err, client) {
         if (err) throw err 
         var db = client.db('user-account')
         var query = { userid: 1 }
         db. collection(' users'). findOne(query, function (err, result) {
            if (err) throw err 
            client.close()
            response.send(result)
         })
        })
    })

    app.post('/', function (req, res) {
        var userObj = req.body
        var response = res
        console. log( 'connecting to the db...');
        MongoClient.connect('mongodb://mongoadmin:pass@localhost:27017',function (err, client) {
          if (err) throw err
          var db = client.db( 'user-account')
          userObj ['userid'] = 1
          var query = { userid: 1 }
          var newValues = { $set: userObj }

          console. log( 'successfully connected to the user-account db')
          db.collection( 'users' ).updateOne (query, newValues, {upsert: true}, function (err, res) {
             if (err) throw err
             console. log ('successfully updated or inserted');
             client.close()
             res.send(userObj)
             if(res.statusCode == 200){
              res.sendFile(__dirname + "/failure.html")
          }
          else
          {
              res.sendFile(__dirname + "/failure.html")
          }
          })
        })
    })


app.listen(3000, function(req,res){
    console.log("Server is running at port 3000")
})

        
