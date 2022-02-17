type Documento = {
  titulo: string;
  texto: string;
  data?: Date;
};

const documento: Documento = {
  titulo: 'title',
  texto: 'text',
  // data: new Date(),
};

console.log(documento.data?.toDateString() ?? 'not exist');
