const async = require("async");
const request = require("request");
const archiver = require("archiver");

async function zipURLs(urls, csv) {
	return new Promise(function (resolve, reject) {
		let zip = archiver.create("zip");

		zip.on("error", function (err) {
			reject(err);
		});

		zip.append(csv, { name: "sensaisondownload_withpics.csv" });

		async.each(urls, function (url, done) {
			let stream = request.get(url);
			stream.on("error", function (err) {
				done(err);
			}).on("end", function () {
				done();
			});
			zip.append(stream, { name: url.replace(/^.*[\\\/]/, "") });

		}, function (err) {
			if (err) {
				reject(err);
			} else {
				zip.finalize();
				resolve(zip);
			}
		});
	});
}

module.exports = zipURLs;