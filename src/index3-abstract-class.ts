export abstract class Personagem {
  constructor(
    private nome: string,
    private poder: string,
    private forca: number,
  ) {}

  abstract mostraStatus(): void;
}

export class Dragao extends Personagem {
  mostraStatus() {
    console.log(`teste`);
  }
  statusDragao(nome: string, poder: string, forca: string) {
    return nome + poder + forca;
  }
}

// Cannot create an instance of an abstract class:
// const dragao = new Personagem('heroku', 'ficar invisível', 1000);

const dragao = new Dragao('Heroku', 'Invisibilidade', 1000);
console.log(dragao);
