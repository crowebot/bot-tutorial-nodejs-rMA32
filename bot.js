var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var access_token =process.env.acc_ID;
var access_token2 =process.env.acc2_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),//momo user id 9469129
      botRegex = /7522678/gi; botRegexNB= /northbrook/gi;
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  if(request.user_id == '9469129' && Math.random()>0.75) {
   // if(request.user_id && botRegex.test(request.user_id)) {
    this.res.writeHead(200);
    postMessage("Good one Momo");
    this.res.end();
  }
  else if(request.text == '7') {
   // if(request.user_id && botRegex.test(request.user_id)) {
    this.res.writeHead(200);
    postMessage("Graduate");
    addEm(request.group_id);
    this.res.end();
  }
    else if(request.text == '6') {
   // if(request.user_id && botRegex.test(request.user_id)) {
    this.res.writeHead(200);
    postMessage("Graduate");
    kickEmOut(request.group_id);
    this.res.end();
  }
  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
function addEm(groupid) {
  var botResponse,options, body, botReq;

  botResponse = groupid

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/groups/'+botResponse+'/members/add?token='+access_token,
    method: 'POST'
  };

  body = {
    "members": [
    {
      "nickname": "Fake Jake",
      "user_id": "35743498",
    }
     ]
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
function kickEmOut(groupid) {
  var botResponse,options, body, botReq;

  botResponse = groupid

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/groups/'+botResponse+'/members/301523939/remove?token='+access_token,
    method: 'POST'
  };

  body = {
    "membership_id" : '301523939'
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

exports.respond = respond;
