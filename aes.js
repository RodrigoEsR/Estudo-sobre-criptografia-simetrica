// 1. Multiplicação no Campo de Galois GF(2^8)
function gmul2(b) {
  let resultado = b << 1;
  if (b & 0x80) {
    resultado ^= 0x1b;
  }
  return resultado & 0xff;
}

// 2. Operação AddRoundKey
function addRoundKey(bloco, chaveRound) {
  let resultado = [];
  for (let i = 0; i < 16; i++) {
    resultado[i] = bloco[i] ^ chaveRound[i];
  }
  return resultado;
}

// 3. Operação SubBytes
function subBytes(bloco, sbox) {
  let resultado = [];
  for (let i = 0; i < 16; i++) {
    resultado[i] = sbox[bloco[i]];
  }
  return resultado;
}

// 4. Operação ShiftRows (Dinamica)
function rotacionarEsquerda(linha, r) {
  return linha.slice(r).concat(linha.slice(0, r));
}

function shiftRowsDinamico(bloco) {
  let resultado = [];
  for (let r = 0; r < 4; r++) {
    let linha = bloco.slice(r * 4, (r + 1) * 4);
    resultado.push(...rotacionarEsquerda(linha, r));
  }
  return resultado;
}

// 5. Operação MixColumns (Dinamica)
function misturarColuna(col) {
  return [
    gmul2(col[0]) ^ (gmul2(col[1]) ^ col[1]) ^ col[2] ^ col[3],
    col[0] ^ gmul2(col[1]) ^ (gmul2(col[2]) ^ col[2]) ^ col[3],
    col[0] ^ col[1] ^ gmul2(col[2]) ^ (gmul2(col[3]) ^ col[3]),
    (gmul2(col[0]) ^ col[0]) ^ col[1] ^ col[2] ^ gmul2(col[3])
  ];
}

function mixColumnsDinamico(bloco) {
  let resultado = [];
  for (let c = 0; c < 4; c++) {
    let coluna = bloco.slice(c * 4, (c + 1) * 4);
    resultado.push(...misturarColuna(coluna));
  }
  return resultado;
}

// --- TESTE DE EXECUÇÃO ---

// Tabela S-Box simplificada para teste (256 posições zeradas com alguns valores)
const sbox = new Array(256).fill(0x63); 

// Bloco de entrada com 16 bytes
const blocoOriginal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// Matriz de 11 chaves de rodada simples para teste
const chavesRodada = new Array(11).fill(new Array(16).fill(0xaa));

// Função Principal de Cifragem
function cifrarAES(bloco, chaves, sbox) {
  let estado = addRoundKey(bloco, chaves[0]);

  for (let r = 1; r <= 9; r++) {
    estado = subBytes(estado, sbox);
    estado = shiftRowsDinamico(estado);
    estado = mixColumnsDinamico(estado);
    estado = addRoundKey(estado, chaves[r]);
  }

  // Rodada 10 (Sem MixColumns)
  estado = subBytes(estado, sbox);
  estado = shiftRowsDinamico(estado);
  estado = addRoundKey(estado, chaves[10]);

  return estado;
}

// Execução
const blocoCifrado = cifrarAES(blocoOriginal, chavesRodada, sbox);
console.log("Bloco Cifrado:", blocoCifrado);