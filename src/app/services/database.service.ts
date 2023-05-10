import { Injectable } from "@angular/core";
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { SQLiteDBConnection } from '@capacitor-community/sqlite/dist/esm/definitions';
import { Capacitor } from "@capacitor/core";
import { createSchema } from "./database.statements";
import { promises } from "dns";
import { Guid } from "guid-typescript";

@Injectable({
    providedIn: 'root'
})

export class DatabaseService {
    sqliteConnection!: SQLiteConnection;
    platform!: string;
    native: boolean = false;
    sqlitePlugin: any;

    async initializePlugin(): Promise<boolean> {
        return new Promise(resolve => {
            this.platform = Capacitor.getPlatform();
            if (this.platform === 'ios' || this.platform === 'android') this.native = true;
            this.sqlitePlugin = Capacitor;
            this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);
            resolve(true);

        });
    }
    async createConnection(database: string, encrypted: boolean, mode:
        string, version: number): Promise<SQLiteDBConnection> {
            if (this.sqliteConnection != null) {
                try {
                    const db: SQLiteDBConnection = await
                    this.sqliteConnection.createConnection(database, encrypted, mode, version, false);
                    if (db != null) {
                        await this.createSchema(db);
                        return Promise.resolve(db);
                    }else {
                        return Promise.reject(new Error('Erro ao criar a conexão'));
                    }
                }
                catch (err: any){
                    return Promise.reject(new Error(err));
                }
            }else {
                return Promise.reject(new Error('Nenhuma conexão disponivel para ${database}'));
            }
        }

    private async createSchema(db: SQLiteDBConnection): Promise<void> {
        await db.open();
        let createSchemma: any = await db.execute(createSchema);
        await this.populateDatabase(db);
        await db.close();
        if (createSchemma.changes.changes < 0) {
            return Promise.reject(new Error("Erro na criação das tabelas"));
        }
    return Promise.resolve();    

    }

    private async populateDatabase (db: SQLiteDBConnection): Promise<void> {
        let returnQuery = await db.query("select COUNT(ordemdeservicoid) as qtdeOS from ordensdeservico;");
        if (returnQuery.values![0].qtdeOS === 0) {
            let sqlcmd: string = "INSERT INTO ordensdeservico (ordemdeservicoid, clienteid, veiculo, dataehoraentrada, dataehoratermino) VALUES (?,?,?,?,?)";
            let values: Array<any> = [Guid.create().toString(), Guid.create().toString(), 'ABC-1235', Date.now(), null];
            let returnInsert = await db.run(sqlcmd, values);
            if (returnInsert.changes ?? -1 < 0) {
                return Promise.reject(new Error("Erro na inserção da ordem de serviço"));
            }
        }
        return Promise.resolve();
    }
        

}