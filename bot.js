var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

 





function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /yeah/gi; botRegexNB= /northbrook/gi;
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    
    postMessage("Posting");
    var btcoptions = {
    hostname: 'https://api.coindesk.com/v1',
    path: '/bpi/currentprice/USD.json',
    method: 'GET'
};
    getJSON(btcoptions, function(err, result){
  if(err){
    return console.log('Error while trying to get ', err);
  }
  console.log(result);
  var btcprice=result.bpi.USD.rate;
})
    postMessage(btcprice);
   
    this.res.end();
  }
  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getJSON(options, cb) {

  HTTPS.request(options, function(res){
    var body = '';

    res.on('data', function(chunk){

      body+= chunk;
    });

    res.on('end', function(){
      var result = JSON.parse(body);
      cb(null, result);
    });

    res.on('error',cb);
  })
  .on('error',cb)
  .end();
}


exports.respond = respond;
