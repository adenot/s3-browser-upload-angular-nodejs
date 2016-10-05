# About

Code example on uploading files directly from the browser to S3 using AngularJS.

Using a server API call to generate a signed URL, which allows the browser to upload and expires after 60 seconds.

Copied originally from: [Demystifying S3 browser upload](http://leonid.shevtsov.me/en/demystifying-s3-browser-upload) article.

## How to run

You will need [Node.js](https://nodejs.org).

Get an AWS account, create an S3 bucket, generate a key pair (refer to the article for details), then run:

``` shell
env S3_ACCESS_KEY=XXX S3_SECRET_KEY=XXX S3_BUCKET=static.leezair.com S3_REGION=ap-southeast-2 node server.js
```

and finally open [http://localhost:5000](http://localhost:5000) in your browser.

The bucket must have a CORS configuration with the following:

```
<CORSRule>
    <AllowedOrigin>http://localhost:5000</AllowedOrigin>
    <AllowedMethod>PUT</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <ExposeHeader>x-amz-server-side-encryption</ExposeHeader>
    <ExposeHeader>x-amz-request-id</ExposeHeader>
    <ExposeHeader>x-amz-id-2</ExposeHeader>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
```
