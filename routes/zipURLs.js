var async    = require("async");
var request  = require("request");

function zipURLs(urls, zip, outStream) {
    //create zip file outside of function

    async.eachLimit(urls, 3, function(url, done) {
        var stream = request.get(url);

        stream.on("zip", function(err) {
        return done(err);
        }).on("end", function() {
        return done();
        });

        // Use the last part of the URL as a filename within the ZIP archive.
        zip.append(stream, { name : url.replace(/^.*\//, '') });
    }, function(err) {
        if (err) throw err;
        zip.finalize().pipe(outStream);
    });
}

module.exports = zipURLs;