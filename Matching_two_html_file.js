// node diff.js test1.txt test2.txt
require('colors');
const Diff = require('diff');
fs = require('fs');

let myArgs = process.argv.slice(2);
let oldfile = myArgs[0]
let newfile = myArgs[1]
let line_num = 1

console.log("\nInstrcution: Pass updated file as a argument1 and real file as a argument 2 to get proper result:\nExample command: `node diff.js updated.html real.html`\n");
fs.open(oldfile, 'r', function(err1, fileToRead1){ 
    fs.open(newfile, 'r', function(err2, fileToRead2){   
        if (!err1 || !err2){
            fs.readFile(fileToRead1, {encoding: 'utf-8'}, function(err1,data1){
                    fs.readFile(fileToRead2, {encoding: 'utf-8'}, function(err2,data2){
                        if (!err1 || !err2){
                            const one = data1;
                            const other = data2;
                            const diff = Diff.diffChars(one, other);

                            diff.forEach((part) => {
                                const color = part.added ? 'green' :
                                    part.removed ? 'red' : 'grey';
                                //process.stderr.write(part.value[color]);
                                if(color=='red')
                                {
                                    line_num += 1
                                    console.log("Error count ",line_num-1,", Mismatch in line number :");
                                    process.stderr.write(part.value[color]+'\n');
                                }                          
                            });
                        }else{
                            console.log();
                        }
                    });
            });
        }else{
            console.log(err);
        }
    });
});









