import { Injectable } from "@angular/core";
import { OrdemDeServico, ordemDeServicoConverter } from "../models/ordemdeservico.model";
import { DatabaseService } from "./database.service";
import { databaseName } from "./database.statements";
import { Guid } from "guid-typescript";
import { Router } from "@angular/router";
import { ToastService } from "./toast.service";
import { AlertService } from "./alert.service";
import { collection, Firestore, getDoc, getDocs, orderBy, query } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class OrdensDeServicoService {
    modoDeEdicao: boolean | undefined;
    osForm: any;
    ordemDeServico: any;
    ordensDeServicoService: any;
    constructor(
        private databaseService: DatabaseService,
        private _fireStore: Firestore,
        private router: Router,
        private alertService: AlertService
    ) {}

    public async getAll(): Promise<OrdemDeServico[]> {
        const ordemDeServico: OrdemDeServico[] = [];
        const q = query(collection(this._fireStore, "ordensdeservico"), orderBy("dataehoraentrada", "desc")).withConverter(ordemDeServicoConverter);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            ordemDeServico.push(doc.data());
        });
        
        return ordemDeServico;
    }

    public async getById(id: string): Promise<any> {
        try {
            const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
            const sql = 'select * from ordensdeservico where ordemdeservicoid = ?';

            try {
                db.open();
                const data = await db.query(sql, [id]);
                db.close();
                if (data.values!.length > 0) {
                    const ordemdeservico: OrdemDeServico = data.values![0];
                    ordemdeservico.dataehoraentrada = new Date (ordemdeservico.dataehoraentrada);
                    return ordemdeservico;
                } else {
                    return null;
                }
            } catch (e) {
                return console.error(e);
            }


        } catch (e) {
            return console.error(e);
        }
    

    }

    async update(ordemDeServico: OrdemDeServico): Promise<void> {
        let sql: any;
        let params: any;
        if (Guid.parse(ordemDeServico.ordemdeservicoid).isEmpty()) {
            ordemDeServico.ordemdeservicoid = Guid.create().toString();
            sql = 'INSERT INTO ordensdeservico(ordemdeservicoid, clienteid, veiculo, dataehoraentrada)' +
            'values(?, ? ,? ,?)';
            params = [ordemDeServico.ordemdeservicoid, ordemDeServico.clienteid, ordemDeServico.veiculo, ordemDeServico.dataehoraentrada];

        } else {
            sql = 'UPDATE ordensdeservico SET clienteid = ?, veiculo = ?, dataehoraentrada = ? WHERE ordemdeservicoid = ?';
            params = [ordemDeServico.clienteid, ordemDeServico.veiculo, ordemDeServico.dataehoraentrada, ordemDeServico.ordemdeservicoid];
        }
        try {
            const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
            db.open();
            await db.run(sql, params);
            db.close();

        } catch (e) {
            console.error (e);
        }
    }

  /*  // Método a ser invocado quando o botão de alterar dados for selecionada
    iniciarEdicao() {
        this.modoDeEdicao = true;
        
    }

    // Método a ser invocado quando o botão de cancelar alteração for selecionado
    cancelarEdicao(){
        this.osForm.setValue(this.ordemDeServico);
        this.modoDeEdicao = false;
    }

   /* // Método a ser invocado quando o botão de gravar for selecionado
    async submit(){
        // validação dos dados informado no formulario. Já trabalhamos com isso .
        if (this.osForm.invalid || this.osForm.pending) {
            await this.alertService.presentAlert('falha', 'Gravação não foi executada', 'verifique os dados para o atendimento', ['ok']);
            return;
        }
        // Aqui extraimos a data e hora das informadas no formilario e convertemos para um date
        const dataString = new Date(this.osForm.controls['dataentrada'].value).toDateString();
        const horaString = new Date(this.osForm.controls['horaentrada'].value).toTimeString();
        const dataEHora = new Date(dataString + '' + horaString);
        // Invocamos o servico, enviando um objeto com os dadso recebido da visão
        await this.ordensDeServicoService.update({
            ordemdeservicoid: this.osForm.controls['ordemdeservicoid'].value,
            clienteid: this.osForm.controls['clienteid'].value,
            veiculo: this.osForm.controls['veiculo'].value,
            dataehoraentrada: dataEHora,
    });
        // Informamos o usuario do sucesso da operação e o redirecionamento para a lista
        this.toastService.presentToast("Gravação bem sucedida", 3000, 'top');
        this.router.navigateByUrl('ordemdeservico-listagem');
    }*/

    async removeById(id: string): Promise<boolean | void> {
        try {
            const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
            db.open();
            await db.run('DELETE FROM ordensdeservico WHERE ordemdeservicoid = ?', [id]);
            db.close();
            return true;
        } catch (e) {
            console.error(e);
        }
    }
    

}