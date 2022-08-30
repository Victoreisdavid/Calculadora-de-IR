const aliquotas = [0, 0.075, 0.15, 0.225, 0.275]
const bases = [1903.98, 2826.65, 3751.05, 4664.68]
//const taxas = [142.80, 354.80, 636.13, 869.36]

const dependentes_desconto = 189.59

/**
 * Acha o número mais próximo em uma array
 * @param {Array} array Array a ser pesquisada 
 * @param {Number} number Número a ser pesquisado 
 * @returns {Object} Número e posição do resultado.
 */
function findClosestNumber(array, number) {
    const value = array.reduce((prev, curr, i) => {
        return (Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev)
    })
    let index = array.indexOf(value)
    index = number > value && array[index] ? array.indexOf(value) + 1 : array.indexOf(value)
    return { value, index }
}

/**
 * Calcula a aliquota do valor
 * @param {Number} valor Valor a ser calculado 
 * @returns {Object} Aliquota e a index na tabela.
 */
function calcAliquota(valor) {
    const closestResult = findClosestNumber(bases, valor) 
    const aliquota = aliquotas[closestResult.index]

    return { aliquota, index: closestResult.index }
}

/**
 * Calcula a taxa para um valor
 * @param {Number} valor Valor a ser calculado a taxa 
 * @returns {Number} Taxa para o valor
 */
function calcTaxa(valor) {
    if (valor > 1903.98 && valor < 2826.65) {
        return 142.80
    } else if (valor > 2826.65 && valor < 3751.05) {
        return 353.80
    } else if (valor > 3751.05 && valor < 4664.68) {
        return 636.13
    } else if (valor > 4664.68) {
        return 869.36
    } else if (valor < 1903.98) {
        return 0
    }
}

/**
 * Calcula o imposto sobre um valor
 * @param {Number} valor Valor dos rendimentos 
 * @returns {Number} Imposto a ser pago
 */
function calcIR(valor, dependentes = 0) {
    const value = calcAliquota(valor)

    const aliquota = value.aliquota
    const taxa = calcTaxa(valor)
    const desconto = dependentes_desconto * dependentes // Desconto dos dependentes

    const imposto = valor - taxa

    return imposto * aliquota - desconto
}

export default { calcIR, calcAliquota, calcTaxa, findClosestNumber }