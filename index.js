const express = require('express');
const bodyparse = require('body-parser');
const http = require('http');
var mongoose = require('mongoose');

//connenct to database
var uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/shiptest';

var theport = process.env.PORT || 5000;

mongoose.connect(uristring);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo Connection Error:'));

//build schema - it actually has to be used in query!!

var Schema = mongoose.Schema;
var shipCost = new Schema ({
    _id: String,
    region: String,
    cost: {type:Number, min: 0}
});
var shipEst = mongoose.model('shipEst', shipCost);

/*var europeTest = new shipEst({
    region: 'Europe',
    cost: 100
});
europeTest.save(function(err) {if(err) console.log('Error on save')});

var asiaTest = new shipEst({
    region: 'Asia',
    cost: 250
});
asiaTest.save(function(err) {if(err) console.log('Error on save')});*/

const server = express();
server.use(bodyparse.urlencoded({ extended: true }));
server.use(bodyparse.json());

server.get('/shipTest', function(req, res){
    
    shipEst.find({}).exec(function(err, result) {
        if (!err) {
            console.log(result);
            var query = shipEst.findOne({'region':'Asia'});
            query.exec(function(err, result){
               if(!err){
                var place = result.region;
                var money = result.cost;
                console.log(result.region + money);}
                else {
                    console.log('bad query');
                }
            })
        } else {
            res.end('Error in using post');
        }
    });

});
server.listen(theport, function(){
    console.log('Server is up and running')
});
