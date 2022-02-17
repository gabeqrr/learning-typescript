// DECORATOR: uma declaração especial para adicionar funcionalidades extras
// a uma declaração de classe, método, acessador, propriedade ou parâmetro

import { stringify } from 'querystring';

// CLASS DECORATOR

// EXEMPLO 0
// Decorator Factory, uma função que retorna a expressão que será executada.
// Como é possível analisar, agora ao invés de recebermos o alvo como parâmetro,
// recebemos o parâmetro que informamos e temos que retornar uma função, que será executada.

function log(prefix: any) {
  return (target: any) => {
    console.log(`${prefix} - ${target}`);
    console.log(prefix);
    console.log(target);
  };
}

@log('Awesome')
class Foo {}

// EXEMPLO 1
// O decorator recebe um único parâmetro que é o construtor da classe alvo:
function setApiVersionOne(constructor: any) {
  constructor.api = '0.0.1';
}

@setApiVersionOne
class WizardOne {}

console.log(WizardOne);

// EXEMPLO 2
// Caso o decorator retorne um valor, ele substituirá a declaração de classe
// pelo valor fornecido, que deve ser um construtor. Dessa maneira, diferente
// do exemplo acima, podemos aplicar mudanças diretas à classe, ao invés de
// apenas no protótipo da classe:
type Constructor = new (...args: any[]) => any;

function setApiVersionTwo<T extends Constructor>(constructor: T) {
  return class extends constructor {
    nome: string;
    sobrenome: string;

    constructor(...args: any[]) {
      super(...args);
      this.nome = this.inverter(args[0]);
      this.sobrenome = this.inverter(args[1]);
    }

    inverter(value: string) {
      return value.split('').reverse().join('');
    }
  };
}

@setApiVersionTwo
class WizardTwo {
  constructor(public nome: string, public sobrenome: string) {}
}

console.log(new WizardTwo('Gabriel', 'Silva')); // class_1 { version: '0.0.1' }

// METHOD DECORATOR, PARAMETER DECORATOR e PROPERTY DECORATOR

function enumerable(newValue: boolean) {
  return (
    classPrototype: any,
    methodName: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    propertyDescriptor.enumerable = newValue;

    console.log(classPrototype);
    console.log(methodName);
    console.log(propertyDescriptor);
  };
}

function decoratorParameter(
  classPrototype: {},
  methodName: string,
  index: number,
) {
  console.log(classPrototype);
  console.log(methodName);
  console.log(index);
};

function decoratorProperty(
  classPrototype: {},
  propertyName: string
) {
  console.log(classPrototype);
  console.log(propertyName);
}

class User {
  @decoratorProperty
  name: string = 'Marcos';

  @enumerable(false)
  changePassword(@decoratorParameter newPassword: string) {}
}

const user = new User();

for (const key in user) {
  console.log(key);
}
