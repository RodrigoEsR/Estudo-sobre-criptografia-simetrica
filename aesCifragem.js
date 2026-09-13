import * as aesUtils from './aesUtils.js';

export class aesCifragem {
  
  // Função Principal de Cifragem
  cifrarAES(bloco, chaveSecreta) {
    // 1. Gera as 11 subchaves internamente usando a chave secreta fornecida
    const chaves = aesUtils.expandirChave(chaveSecreta);

    // 2. Rodada Inicial (Rodada 0)
    let estado = aesUtils.addRoundKey(bloco, chaves[0]);

    // 3. Rodadas Intermediárias (1 até 9)
    for (let r = 1; r <= 9; r++) {
      estado = aesUtils.subBytes(estado, aesUtils.sbox);
      estado = aesUtils.shiftRowsDinamico(estado);
      estado = aesUtils.mixColumnsDinamico(estado);
      estado = aesUtils.addRoundKey(estado, chaves[r]);
    }

    // 4. Rodada Final (Rodada 10 - Sem MixColumns)
    estado = aesUtils.subBytes(estado, aesUtils.sbox);
    estado = aesUtils.shiftRowsDinamico(estado);
    estado = aesUtils.addRoundKey(estado, chaves[10]);

    return estado;
  }
}