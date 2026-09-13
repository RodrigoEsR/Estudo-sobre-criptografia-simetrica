// Estudo utilizando um biblioteca

const crypto = require('crypto');

// 1. Geramos uma chave de 16 bytes (128 bits) e um Vetor de Inicialização (IV)
const chave = crypto.randomBytes(16);
const iv = crypto.randomBytes(16);

const mensagem = "Texto para cifrar";

// 2. Cifragem (AES-128 em modo CBC)
const cifrador = crypto.createCipheriv('aes-128-cbc', chave, iv);
let textoCifrado = cifrador.update(mensagem, 'utf8', 'hex');
textoCifrado += cifrador.final('hex');

console.log("Cifrado (Hex):", textoCifrado);

// 3. Decifragem
const decifrador = crypto.createDecipheriv('aes-128-cbc', chave, iv);
let textoDecifrado = decifrador.update(textoCifrado, 'hex', 'utf8');
textoDecifrado += decifrador.final('utf8');

console.log("Decifrado:", textoDecifrado);