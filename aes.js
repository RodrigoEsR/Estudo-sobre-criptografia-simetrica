import { aesCifragem } from './aesCifragem.js';
import { aesDecifragem } from './aesDecifragem.js';

// 1. ⚙️ Cria a instância da classe de cifragem
const cifrador = new aesCifragem();
const decifrador = new aesDecifragem();

// 2. 📦 Define os dados de teste (ambos com 16 bytes)
const blocoOriginal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const chaveSecreta = [
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 
  0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f
];

// 3. 🔐 Executa a cifragem
const blocoCifrado = cifrador.cifrarAES(blocoOriginal, chaveSecreta);
const blocoDecifrado = decifrador.decifrarAES(blocoCifrado, chaveSecreta);

// 4. 📊 Exibe o resultado no console
console.log("Bloco Original: ", blocoOriginal);
console.log("Bloco Cifrado: ", blocoCifrado);
console.log("Bloco decifrado: ", blocoDecifrado);