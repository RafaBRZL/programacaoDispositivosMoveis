export const databaseName: string = 'oficina';
export const createSchema: string = `
CREATE TABLE IF NOT EXISTS ordensdeservico (
    ordensdeservicoid TEXT primary key NOT NULL,
    clienteid TEXT NOT NULL,
    veiculo TEXT NOT NULL,
    dataehoraentrada DATETIME NOT NULL,
    dataehoratermino DATETIME,
    dataehoraentrada DATATIME
);

CREATE INDEX IF NOT EXISTS ordensdeservicos_index_ordemdeservicoid
ON ordensdeservico (ordemdeservico);
PRAGMA user_version = 1;
`;