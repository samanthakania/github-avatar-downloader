var request = require('request');
var secrets = require('./secrets.js')
console.log('Welcome to the GitHub Avatar Downloader!');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var info = JSON.parse(result);
  info.forEach(function(item){
    downloadImageByURL(item.avatar_url,`./avatars/${item.login}.jpg`);
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function(err){
    throw err;
  })
  .pipe(fs.createWriteStream(filePath))
}

