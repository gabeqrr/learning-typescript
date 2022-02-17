export class Pessoa {
  static cpf = '123.456.789.10';

  constructor(
    public nome: string,
    public sobrenome: string,
    protected cpf: string,
  ) {}

  static criaPessoa(nome: string, sobrenome: string): Pessoa {
    return new Pessoa(nome, sobrenome, Pessoa.cpf);
  }
}

export class Aluno extends Pessoa {
  getNome() {
    return `Nome do aluno: ${this.nome} ${this.sobrenome}`;
  }
}

export class Cliente extends Pessoa {
  getNome() {
    // this.cpf = '237.950.358-14'; // acessivel em subclasse
    return `Nome do cliente: ${this.nome} ${this.sobrenome}`;
  }
}

const alguem = Pessoa.criaPessoa('gabriel', 'silva');
console.log(alguem);

const outroAlguem = new Pessoa('gabriel', 'silva', Pessoa.cpf);
console.log(outroAlguem);

// outroAlguem.nome;
// outroAlguem.sobrenome;
// outroAlguem.cpf; // is protected

const aluno = new Aluno('gabriel', 'silva', Pessoa.cpf);
console.log(aluno);

const cliente = new Cliente('gabriel', 'silva', Pessoa.cpf);
console.log(cliente);
