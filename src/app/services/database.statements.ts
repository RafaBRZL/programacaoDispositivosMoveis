export const databaseName: string = 'oficina';
export const createClientesTable: string = `
CREATE TABLE IF NOT EXISTS clientes (
    clienteid TEXT primary key NOT NULL,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    renda REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS clientes _index_clientesid ON clientes (clienteid);
PRAGMA user_version - 1
`;
export const createOrdensDeServicoTable: string = `

CREATE TABLE IF NOT EXISTS ordensdeservico (
    ordensdeservicoid TEXT primary key NOT NULL,
    clienteid TEXT NOT NULL,
    veiculo TEXT NOT NULL,
    dataehoraentrada DATETIME NOT NULL,
    dataehoratermino DATETIME,
    dataehoraentrada DATATIME,
    FOREIGN KEY (clientesid) REFERENCES clientes (clienteid) ON DELETE CASCADE ON UPDATE NO ACTION);
    

CREATE INDEX IF NOT EXISTS ordensdeservicos_index_ordemdeservicoid
ON ordensdeservico (ordemdeservico);
PRAGMA user_version = 1;
`;