const async = require("async"),
	request = require("request"),
	archiver = require("archiver");

module.exports = async (urls, csv) => {
	return new Promise((resolve, reject) => {
		let zip = archiver.create("zip");

		zip.on("error", err => {
			reject(err);
		});

		zip.append(csv, { name: "sensaisondownload_withpics.csv" });

		async.each(urls, (url, done) => {
			let stream = request.get(url);
			stream.on("error", err => {
				done(err);
			}).on("end", () => {
				done();
			});
			zip.append(stream, { name: url.replace(/^.*[\\\/]/, "") });

		}, err => {
			if (err) {
				reject(err);
			} else {
				zip.finalize();
				resolve(zip);
			}
		});
	});
};