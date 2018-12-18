var path = require('path');
var fs = require('fs');
var chosenExtension = process.argv[2];
var searchTerm = process.argv[3];

if (!chosenExtension || !searchTerm) {
    console.log("USAGE: node search.js [Extension] [Text] will commence a search");
} else {
	var results = [];
	searchFilesInDir(__dirname, '.' + chosenExtension, searchTerm);
	if (results.length) {
		console.log(`Total count of results: ${results.length}`);
		results.forEach(result => console.log(result))
	} else {
		console.log('No file was found');
	}
}

function searchFilesInDir(__dirname, extension, str) {    
    //console.log('Now searching in ' + __dirname + "\\");
    var files = fs.readdirSync(__dirname);
    var regex = new RegExp(str, "i"); 
    //string interpolation doesn't work in regex - that's why I instantiated a regular expression

    files.forEach(file => {
        var fileFullPath = path.join(__dirname, file);
        var stat = fs.lstatSync(fileFullPath); //file status
        if (stat.isDirectory()) {
            searchFilesInDir(fileFullPath, extension, str); //works recursively - goes into subdirectory
        } else {
	    var fileName = fileFullPath.split('\\').pop().split('.').shift(); //without entire path & extension
	    if (path.extname(fileFullPath) === extension && fileName.search(regex) != -1) {
	        results.push(fileFullPath);
	    }
        };
    });
};
