var express = require('express');
var crypto = require('crypto');
var path = require('path');
var bodyParser = require('body-parser');

var s3Config = {
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  bucket: process.env.S3_BUCKET,
  region: process.env.S3_REGION
};

var AWS = require('aws-sdk');

AWS.config.region = s3Config.region;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.post('/s3_credentials', function(request, response) {
  if (request.body.filename) {
    var filename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(request.body.filename);

    var params = {
      Bucket: s3Config.bucket,
      Key: filename,
      ContentType: request.body.type,
      ACL: 'public-read'
    };

    var s3 = new AWS.S3({computeChecksums: true});

    var signedRequest = s3.getSignedUrl('putObject', params);
    response.json({ signedRequest: signedRequest, url: "https://"+s3Config.bucket+".s3.amazonaws.com/"+filename });

  } else {
    response.status(400).send('filename is required');
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
