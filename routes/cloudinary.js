const cloudinary = require("../config/cloudinary");
const archiver = require("archiver");
const zipURLs = require("./zipURLs");

app.post("/cloudinary", function(req, res) {

    console.log("REQ: " + req);
    console.log("REQ.body: " + req.body);

    cloudinary.v2.uploader.upload(
        req.body.file,
        {
            type: "private",
            folder: req.body.tagUserIdVal,
            tags: [req.body.tagCategoryVal, req.body.tagDateObsVal, req.body.tagUserIdVal] 
        },
        function(err, res) {
            console.log("RES.PUBLIC_ID: " + res.public_id);
        }
    )
});