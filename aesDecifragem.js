import * as aesUtils from './aesUtils.js';

export class aesDecifragem {
  
  // Função Principal de Decifragem
  decifrarAES(bloco, chaveSecreta) {
    // 1. Gera as 11 subchaves internamente usando a chave secreta fornecida
    const chaves = aesUtils.expandirChave(chaveSecreta);

    // 2. Rodada Inicial (Rodada 0)
    let estado = aesUtils.addRoundKey(bloco, chaves[10]);

    // 3. Rodadas Intermediárias (1 até 9)
    for (let r = 9; r >= 1; r--) {
  estado = aesUtils.invShiftRowsDinamico(estado);
  estado = aesUtils.subBytes(estado, aesUtils.invSbox);
  estado = aesUtils.addRoundKey(estado, chaves[r]);
  estado = aesUtils.invMixColumns(estado);
}

    // 4. Rodada Final (Rodada 0 - Sem MixColumns)
    estado = aesUtils.invShiftRowsDinamico(estado);
    estado = aesUtils.subBytes(estado, aesUtils.invSbox);
    estado = aesUtils.addRoundKey(estado, chaves[0]);

    return estado;
  }
}