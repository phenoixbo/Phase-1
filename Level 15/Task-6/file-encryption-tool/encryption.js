const fs = require('fs');
const crypto = require('crypto');
const readlineSync = require('readline-sync');
function encryptFile(filePath, password, algorithm = 'aes-256-cbc') {
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(filePath + '.enc');

    input.pipe(cipher).pipe(output);

    output.on('finish', () => {
        console.log('File encrypted successfully.');
    });
}
function decryptFile(filePath, password, algorithm = 'aes-256-cbc') {
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = fs.readFileSync(filePath).slice(0, 16);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(filePath.slice(0, -4)); 

    input.pipe(decipher).pipe(output);

    output.on('finish', () => {
        console.log('File decrypted successfully.');
    });
}
const action = readlineSync.question('Do you want to encrypt or decrypt a file? (encrypt/decrypt): ').toLowerCase();
const filePath = readlineSync.question('Enter the file path: ');
const password = readlineSync.question('Enter a password: ', { hideEchoBack: true });

if (action === 'encrypt') {
    encryptFile(filePath, password);
} else if (action === 'decrypt') {
    decryptFile(filePath, password);
} else {
    console.log('Invalid action. Please choose either "encrypt" or "decrypt".');
}

const path = require('path');
function encryptDirectory(directoryPath, password) {
    fs.readdirSync(directoryPath).forEach(file => {
        const filePath = path.join(directoryPath, file);
        if (fs.lstatSync(filePath).isFile()) {
            encryptFile(filePath, password);
        }
    });
}

