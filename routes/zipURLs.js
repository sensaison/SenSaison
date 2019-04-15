const async = require("async");
const request = require("request");
const archiver = require("archiver");

function zipURLs(urls, csv, outStream) {
    let zip = archiver.create("zip");

    // this isn't working
    zip.file(csv, {name: "sensaisondownload_withpics.csv"});

    async.eachLimit(urls, 5, function(url, done) {
        let stream = request.get(url);

        stream.on("zip", function(err) {
            return done(err);
        }).on("end", function() {
            return done();
        });

        // Use the last part of the URL as a filename within the ZIP archive.
        zip.append(stream, { name : url.replace(/^.*\//, '') });
    }, function(err) {
        if (err) throw err;
        zip.finalize();
        zip.pipe(outStream);
    });
}

module.exports = zipURLs;