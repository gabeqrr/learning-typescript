type CoresObj = typeof coresObj;
type CoresChaves = keyof CoresObj;

// type CoresObj = {
//   vermelho: string;
//   verde: string;
//   azul: string;
//   roxo: string;
// };

const coresObj = {
  vermelho: 'red',
  verde: 'green',
  azul: 'blue',
  roxo: 'purple',
};

// function traduzirCor(
//   cor: 'vermelho' | 'verde' | 'azul' | 'roxo',
//   cores: CoresObj,
// ) {
//   return cores[cor];
// }

function traduzirCor(cor: CoresChaves, cores: CoresObj) {
  return cores[cor];
}

console.log(traduzirCor('vermelho', coresObj));
console.log(traduzirCor('verde', coresObj));
console.log(traduzirCor('roxo', coresObj));
