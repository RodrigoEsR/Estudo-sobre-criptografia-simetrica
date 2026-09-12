# Relatório Técnico: Implementação Algorítmica do AES-128 em JavaScript

## 1. Introdução e Objetivos

Este trabalho apresenta a implementação didática do algoritmo de criptografia simétrica *Advanced Encryption Standard* (AES) com chave de 128 bits na linguagem JavaScript (Node.js), sem dependência de bibliotecas externas. 

O objetivo do projeto é analisar a estrutura interna do algoritmo, com ênfase em:
* Manipulação de dados no nível de bit e de byte (*bitwise operators*).
* Implementação das transformações lineares e não-lineares em matrizes de estado $4 \times 4$.
* Automação de laços de repetição para otimização do fluxo do algoritmo.

---

## 2. As Quatro Etapas Fundamentais do AES

O processamento de cada bloco de dados de 16 bytes baseia-se em quatro operações encadeadas:

| Etapa | Tipo de Transformação | Operador / Método | Função Criptográfica |
| :--- | :--- | :--- | :--- |
| **AddRoundKey** | Combinação com a Chave | Operador Bitwise `XOR` (`^`) | Aplica a chave da rodada ao estado atual. |
| **SubBytes** | Substituição Não-Linear | Consulta à Tabela S-Box | Confusão: Elimina correlações estatísticas diretas. |
| **ShiftRows** | Permutação Linear | Mapeamento por laço e `slice()` | Difusão horizontal: Desloca ciclicamente as linhas da matriz. |
| **MixColumns** | Mistura de Dados | Multiplicação em $\text{GF}(2^8)$ | Difusão vertical: Garante que um bit alterado afete a coluna inteira. |

---

## 3. Fundamentos Matemáticos e Operações de Bit

1. **Adição em Corpo Finito**: A adição e a subtração no campo Galois $\text{GF}(2^8)$ correspondem à operação lógica `XOR` (`^`).
2. **Multiplicação Por Dois (`gmul2`)**: Realizada através do deslocamento de bit à esquerda (`<< 1`). Caso o bit mais significativo (verificado via `& 0x80`) seja igual a 1, aplica-se a redução polinomial com a constante `0x1B`.
3. **Máscara de Truncamento (`& 0xFF`)**: Garante que o valor retornado mantenha a precisão estrita de 1 byte (8 bits), descartando eventuais estouros de memória.

---

## 4. Estrutura de Execução das Rodadas (AES-128)

O ciclo completo do AES-128 compõe-se de 10 rodadas e é organizado no seguinte fluxo:

1. **Rodada Inicial (Rodada 0)**:
   $$\text{Estado Inicial} \oplus \text{Chave}_0$$

2. **Rodadas Principais (Rodadas 1 a 9)**:
   $$\text{SubBytes} \longrightarrow \text{ShiftRows} \longrightarrow \text{MixColumns} \longrightarrow \text{AddRoundKey}_r$$

3. **Rodada Final (Rodada 10)**:
   $$\text{SubBytes} \longrightarrow \text{ShiftRows} \longrightarrow \text{AddRoundKey}_{10}$$

---

## 5. Instruções de Execução

Para rodar o código do projeto via Node.js:

1. Salve as funções em um arquivo nomeado `aes.js`.
2. Abra o terminal e execute o comando:
```bash
node aes.js