const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

fs.readFile('./index.html',
    function(error, html) {
        if (error) throw error;
        https.createServer(options, function (req, res) {
            res.writeHead(200);
            res.write(html);
            res.end();
    }).listen(8000)
})