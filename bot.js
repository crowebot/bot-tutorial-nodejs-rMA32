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
  else if(request.text == 'Add Jake') {
   // if(request.user_id && botRegex.test(request.user_id)) {
    this.res.writeHead(200);
    addEm(request.group_id,'35743498');
    this.res.end();
  }
  else if(request.text == 'Add Fake Jake') {
   // if(request.user_id && botRegex.test(request.user_id)) {
    this.res.writeHead(200);
    addEm(request.group_id,'20881812');
    this.res.end();
  }
    else if(request.text == 'Kill Fake Jake') {
   // if(request.user_id && botRegex.test(request.user_id)) {
    this.res.writeHead(200);
    kickEmOut(request.group_id);
    this.res.end();
  }
  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
function addEm(groupid,userid,name) {
  var botResponse,options, body, botReq, beep, name;

  botResponse = groupid
  beep =userid
  beep2 = name

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/groups/'+botResponse+'/members/add?token='+access_token,
    method: 'POST'
  };

  body = {
    "members": [
    {
      "nickname": beep2,
      "user_id": beep,
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
    path: '/v3/groups/'+botResponse+'/members/301423267/remove?token='+access_token,
    method: 'POST'
  };

  body = {
    "membership_id" : '301423267'
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
