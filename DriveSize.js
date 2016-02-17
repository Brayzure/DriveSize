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
		if(!isForbidden(file) || file.slice(3) == "System Volume Information"){
			try{
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
			catch (e){
				if(!(e.code == 'ENOENT' || e.code == 'EPERM' || e.code == 'EBUSY')){
					throw e;
				}
			}
		}
	}
	if(!level){
		console.log((total/1024/1024/1024).toFixed(2) + " GB");
	}
	
}

function isForbidden(filePath){
	var test = filePath.slice(3);
	if(test == "System Volume Information"){
		return 1;
	}
	return 0;
}

iter(0,root);

//blah = size["size"];