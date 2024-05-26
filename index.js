var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if (filename == "./") filename += "index.html";

    fs.readFile(filename, function (err, data) {
      if (err) {
        // Handle the error case by reading the 404.html file
        fs.readFile("./404.html", function (err404, data404) {
          if (err404) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data404);
          return res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
