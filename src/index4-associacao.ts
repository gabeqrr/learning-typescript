export class Escritor {
  private _ferramenta: Ferramenta | null = null;

  // eslint-disable-next-line prettier/prettier
  constructor(private _nome: string) {}

  get nome() {
    return this._nome;
  }

  set ferramenta(ferramenta: Ferramenta | null) {
    this._ferramenta = ferramenta;
    // ferramenta.escrever();
  }

  get ferramenta() {
    return this._ferramenta;
  }

  escrever() {
    if (this.ferramenta === null) {
      console.log('Não posso escrever sem ferramenta...');
      return;
    }
    this.ferramenta.escrever();
  }
}

export abstract class Ferramenta {
  constructor(private _nome: string) {}

  get nome() {
    return this._nome;
  }

  abstract escrever(): void;
}

export class Caneta extends Ferramenta {
  escrever(): void {
    console.log(`${this.nome} está escrevendo...`);
  }
}

export class MaquinaEscrever extends Ferramenta {
  escrever(): void {
    console.log(`${this.nome} está escrevendo...`);
  }
}

const escritor = new Escritor('Gabriel');
const caneta = new Caneta('Bic');
const maquinaEscrever = new MaquinaEscrever('Máquina');

console.log(escritor.nome);
console.log(caneta.nome);
console.log(maquinaEscrever.nome);

// escritor.ferramenta = caneta;
escritor.ferramenta = maquinaEscrever;
// escritor.ferramenta = null;
escritor.escrever();
