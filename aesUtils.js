// Tabela S-Box padrão do AES (256 posições)
export const sbox = new Array(256).fill(0x63);

// 1. Operação AddRoundKey
export function addRoundKey(bloco, subchave) {
  let resultado = [];
  for (let i = 0; i < 16; i++) {
    resultado[i] = bloco[i] ^ subchave[i];
  }
  return resultado;
}

// Multiplicação Galois GF(2^8)
export function gmul2(b) {
  let resultado = b << 1;
  if (b & 0x80) {
    resultado ^= 0x1b;
  }
  return resultado & 0xff;
}

// 2. Expansão da Chave (Gera as 11 subchaves)
export function expandirChave(chaveSecreta) {
  // Lógica para gerar o array com as 11 subchaves a partir da chave inicial
  return new Array(11).fill(new Array(16).fill(0xaa)); // Exemplo mock para testes
}

// 3. Operação SubBytes
export function subBytes(bloco, tabelaSBox = sbox) {
  let resultado = [];
  for (let i = 0; i < 16; i++) {
    resultado[i] = tabelaSBox[bloco[i]];
  }
  return resultado;
}

// 4. Operação ShiftRows
export function rotacionarEsquerda(linha, r) {
  return linha.slice(r).concat(linha.slice(0, r));
}

export function shiftRowsDinamico(bloco) {
  let resultado = [];
  for (let r = 0; r < 4; r++) {
    let linha = bloco.slice(r * 4, (r + 1) * 4);
    resultado.push(...rotacionarEsquerda(linha, r));
  }
  return resultado;
}

// 5. Operação MixColumns
export function misturarColuna(col) {
  return [
    gmul2(col[0]) ^ (gmul2(col[1]) ^ col[1]) ^ col[2] ^ col[3],
    col[0] ^ gmul2(col[1]) ^ (gmul2(col[2]) ^ col[2]) ^ col[3],
    col[0] ^ col[1] ^ gmul2(col[2]) ^ (gmul2(col[3]) ^ col[3]),
    (gmul2(col[0]) ^ col[0]) ^ col[1] ^ col[2] ^ gmul2(col[3])
  ];
}

export function mixColumnsDinamico(bloco) {
  let resultado = [];
  for (let c = 0; c < 4; c++) {
    let coluna = bloco.slice(c * 4, (c + 1) * 4);
    resultado.push(...misturarColuna(coluna));
  }
  return resultado;
}