const fs = require('fs'); 

const content = 'Hello!! Node.js';
fs.writeFile('output.txt', content, (err) => {
  if (err) {
    console.error('Error writing to file:', err); 
  } else {
    console.log('File has been written successfully!'); 
}});
