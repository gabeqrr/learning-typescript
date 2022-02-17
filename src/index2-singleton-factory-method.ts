// Singleton: quando tentar instanciar uma classe, ou você obtém
// uma instância já criada, ou cria uma. [única instância]

export class Database {
  private static database: Database;

  private constructor(
    private host: string,
    private user: string,
    private password: string,
  ) {}

  connect() {
    console.log(`Conectado: ${this.host}, ${this.user}, ${this.password}`);
  }

  // Factory method
  static getDatabase(host: string, user: string, password: string): Database {
    if (Database.database) {
      console.log('Retornando instância já criada...');
      return Database.database;
    }
    console.log('Criando nova instância...');
    Database.database = new Database(host, user, password);
    return Database.database;
  }
}

// const db1 = new Database('127.0.0.1', 'gabriel', '123456');
// db1.connect();

// const db2 = new Database('127.0.0.1', 'gabriel', '123456');
// db1.connect();

// cria a database
const db1 = Database.getDatabase('127.0.0.1', 'gabriel', '123456');
db1.connect();

// retorna a database ja criada
const db2 = Database.getDatabase('127.0.0.1', 'gabriel', '123456');
db2.connect();

const db3 = Database.getDatabase('127.0.0.1', 'gabriel', '123456');
db3.connect();

const db4 = Database.getDatabase('127.0.0.1', 'gabriel', '123456');
db4.connect();

const db5 = Database.getDatabase('127.0.0.1', 'gabriel', '123456');
db5.connect();

console.log(db1 === db2 && db2 === db3 && db3 === db4 && db4 === db5);
