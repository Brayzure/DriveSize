var fs = require("graceful-fs");

var root = process.argv[2];
console.log("Iterating through " + root + " and all subdirectories...");
var total = 0;

function iter(level,path){
	var contents = fs.readdirSync(path);
	var buffer = "";
	for(var j=0;j<level;j++){
		buffer += "  ";
	}
	for(var i=0;i<contents.length;i++){
		var file = path + "\\" + contents[i];
		stats = fs.statSync(file);
		if(stats.isDirectory()){
			//console.log(buffer + file);
			iter(level+1,file);
		}
		else{
			var size = stats["size"];
			total += size;
			//console.log(buffer + size);
		}
	}
	if(!level){
		console.log((total/1024/1024/1024).toFixed(2) + " GB");
	}
	
}

iter(0,root);

//blah = size["size"];