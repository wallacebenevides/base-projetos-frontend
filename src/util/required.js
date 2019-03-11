export function required(parametro) {
    throw new Error(`${parametro} é um parâmetro obrigatório`);
}
