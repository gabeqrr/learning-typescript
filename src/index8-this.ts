export class Calculadora {
  constructor(public numero: number) {}

  add(n: number): this {
    this.numero += n;
    console.log(this);
    // retorna a própria instância
    return this;
  }

  sub(n: number): this {
    this.numero -= n;
    console.log(this);
    return this;
  }

  mul(n: number): this {
    this.numero *= n;
    console.log(this);
    return this;
  }

  div(n: number): this {
    this.numero /= n;
    console.log(this);
    return this;
  }
}

export class SubCalculadora extends Calculadora {
  pot(n: number): this {
    this.numero **= n;
    return this;
  }
}

const numero = new SubCalculadora(5);
numero.add(5).mul(2).div(4).pot(2);
console.log(numero);

// Builder - Gof
export class RequestBuilder {
  private method: 'get' | 'post' | null = null;
  private url: string | null = null;

  // Isso não é permitido pois o tipo está sendo extendido:
  // setMethod(method: 'get' | 'post' | 'put'): this {

  setMethod(method: 'get' | 'post'): this {
    this.method = method;
    return this;
  }

  // Isso é permitido pois o tipo está sendo reduzido de string:
  // setUrl(url: 'get' | 'post'): this {

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  send(): void {
    console.log(`Enviando dados via ${this.method} para ${this.url}`);
  }
}

const request = new RequestBuilder(); //Builder
request.setUrl('http://www.google.com').setMethod('post').send();
