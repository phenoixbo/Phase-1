const fs = require('fs');
const filePath = 'test.txt';


if (fs.existsSync(filePath)) {
  console.log('The file test.txt exists!');
} else {
  console.log('The file test.txt does not exist.');
}
