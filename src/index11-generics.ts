// type FilterCallback = (value: unknown, index?: number, array?: unknown[]) => boolean;

type FilterCallback<U> = (value: U, index?: number, array?: U[]) => boolean;

// export function myFilter(array: unknown, callbackfn: FilterCallback): unknown[] {

// <> infere o tipo de acordo com a chamada da função
export function myFilter<T>(array: T[], callbackfn: FilterCallback<T>): T[] {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    if (callbackfn(array[i])) {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const arrayFiltradoOriginal = array.filter((value) => value < 5);
console.log(arrayFiltradoOriginal);

const arrayFiltrado = myFilter<number>(array, (value) => value < 5);
// if (typeof value === 'number') return value < 5;
// return false;
// });
console.log(arrayFiltrado);

// GENERICS DO TS ==========================

const arrayNumbers: Array<number> = [1, 2, 3, 4, 5];
console.log(arrayNumbers);

async function promiseAsync() {
  return 1;
}

function minhaPromise(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

promiseAsync().then((result) => console.log(result + 1));
minhaPromise().then((result) => console.log(result + 1));

// GENERICS COM INTERFACES E TYPE ALIAS ==========================

interface PessoaProtocolo<T, U> {
  nome: T;
  sobrenome: T;
  idade: U;
}

const aluno1: PessoaProtocolo<string, number> = {
  nome: 'Gabriel',
  sobrenome: 'Silva',
  idade: 17,
};

const aluno2: PessoaProtocolo<number, number> = {
  nome: 123,
  sobrenome: 456,
  idade: 17,
};

console.log(aluno1, aluno2);

// RESTRIÇÕES EM GENERICS (CONSTRAINTS) ==========================

// K é no máximo uma chave de O
type ObterChavefn = <O, K extends keyof O>(objeto: O, chave: K) => O[K];

const obterChave: ObterChavefn = (objeto, chave) => objeto[chave];

const animal = {
  cor: 'Amarelo',
  vacinas: ['Vacina 1', 'Vacina 2'],
  idade: 10,
};

const vacinas = obterChave(animal, 'vacinas');
const cor = obterChave(animal, 'cor');

console.log(vacinas, cor, obterChave(animal, 'idade'));

// GENERICS COM CLASSES (STACK) ==========================

export class Pessoa<T, U> {
  constructor(public nome: T, public idade: U) {}
}

export class Stack<T> {
  private contador = 0;
  private elementos: { [k: number]: T } = {};

  push(elemento: T): void {
    // number = T
    this.elementos[this.contador] = elemento;
    this.contador++;
  }

  pop(): T | void {
    if (this.isEmpty()) return undefined;

    this.contador--;
    const elemento = this.elementos[this.contador];
    delete this.elementos[this.contador];
    return elemento;
  }

  isEmpty(): boolean {
    return this.contador === 0;
  }

  tamanho(): number {
    return this.contador;
  }

  mostrarPilha(): void {
    for (const chave in this.elementos) {
      console.log(this.elementos[chave]);
    }
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.mostrarPilha();

while (!stack.isEmpty()) {
  console.log(stack.pop());
}

// GENERICS COM INTERSECTION ==========================

export function unirObjetos<T, U>(obj1: T, obj2: U): T & U {
  // return { ...obj1, ...obj2 };
  return Object.assign({}, obj1, obj2);
}

const obj1 = { chave1: 'valor1' };
const obj2 = { chave2: 'valor2' };
const uniao = unirObjetos(obj1, obj2);
console.log(uniao);

// GENERICS TYPE PREDICATE ==========================

// export function isNumber(value: unknown): boolean {
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function soma<T>(...args: T[]): number {
  const retorno = args.reduce((s, v) => {
    if (isNumber(s) && isNumber(v)) {
      return s + v;
    }
    return s;
  }, 0);

  return retorno;
}

console.log(soma(1, 2, 3));
console.log(soma('a', 'b', 'c'));
// console.log(soma(1, 2, '3'));
console.log(soma(...[1, 2, 3, 'a', 'b', 'c', 1]));

// GENERICS PADRÃO DO TS ==========================

// Record define o tipo da chave e o tipo do valor
const objeto1: Record<string, string | number> = {
  nome: 'Gabriel',
  sobrenome: 'Silva',
  idade: 17,
};
console.log(objeto1);

type PessoaProtocol = {
  nome?: string;
  sobrenome?: string;
  idade?: number;
};

// Required torna as propriedades requeridas
type PessoaRequired = Required<PessoaProtocol>;

// Partial torna as propriedades opcionais
type PessoaPartial = Partial<PessoaRequired>;

// Readonly torna as propriedades não modificaveis
type PessoaReadonly = Readonly<PessoaRequired>;

// Pick permite escolher quais propriedades serão usadas
type PessoaPick = Pick<PessoaRequired, 'nome' | 'sobrenome'>;

const objeto2: PessoaRequired = {
  nome: 'Gabriel',
  sobrenome: 'Silva',
  idade: 17,
};
console.log(objeto2);

// Extract e Exclude
type ABC = 'A' | 'B' | 'C';
type CDE = 'C' | 'D' | 'E';
type TipoExclude = Exclude<ABC, CDE>; // exclui os repetidos
type TipoExtract = Extract<ABC, CDE>; // extrai os repetidos

// ------ //

type AccountMongo = typeof accountMongo;

// type AccountApi = {
//   id: string;
//   nome: string;
//   idade: number;
// };

type AccountApi = Pick<AccountMongo, Exclude<keyof AccountMongo, '_id'>> & {
  id: string;
};

const accountMongo = {
  _id: 'as7y9w7fajnfafkmd',
  nome: 'Gabriel',
  idade: 17,
};

function mapAccount(accountMongo: AccountMongo): AccountApi {
  const { _id, ...accountData } = accountMongo;
  return { ...accountData, id: _id };
}

const accountApi = mapAccount(accountMongo);
console.log(accountApi);

export default 1;
