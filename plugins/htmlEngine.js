const fs = require("fs");

module.exports = (path, options, fn) => {
	const cacheLocation = path + ":html";
	if (typeof module.exports.cache[cacheLocation] === "string") {
		return fn(null, module.exports.cache[cacheLocation]);
	}
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			return fn(err);
		}
		return fn(null, module.exports.cache[cacheLocation] = data);
	});
};

module.exports.cache = {};