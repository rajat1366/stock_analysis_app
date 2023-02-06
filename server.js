const express = require('express');
var request = require('request');

const app = express();
const PORT = 8080;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/api/get', function(req, res){
    
    // console.log(req.query);
    request({
        method: 'GET',
        uri: 'https://query1.finance.yahoo.com/v8/finance/chart/'+req.query.stockName+'?region=US&lang=en-US&includePrePost=false&interval='+req.query.interval+'&range='+req.query.range+'&corsDomain=finance.yahoo.com&.tsrc=finance'
      }, function (error, response, body){
        if(!error && response.statusCode == 200){
          res.json(body);
        } else {
            res.sendStatus(404);
        }
     })
    // res.sendStatus(200); 
  });
  

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);