var split = require('split')();

var pairs = [];

process.stdin.pipe(split).on('data', function (line) {
    if (line) {
        pairs.push(line.split('='));
    }

}).on('end', function () {
    
    console.log(JSON.stringify(pairs,  null, " "));
})


