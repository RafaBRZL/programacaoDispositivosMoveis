import { Component, OnInit } from '@angular/core';
import { AlertController, IonList } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente.model';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-clientes-listagem',
  templateUrl: './clientes-listagem.page.html',
  styleUrls: ['./clientes-listagem.page.scss'],
})
export class ClientesListagemPage implements OnInit {
  public clientes: Cliente[] | undefined;

  @ViwChild('slidingList') slidingList!: IonList;
  
  constructor(
    private clientesService: ClientesService,
      private toastService: ToastService,
      private alertService: AlertService,
      private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    this.clientes = await this.clientesService.getAll();
  }

  async removerCliente(cliente: Cliente) {
    try {
        const successFunction = async () => {
            this.clientesService.removeById(cliente.clienteid);
            this.toastService.presentToast('Cliente removido com sucesso', 3000, 'top');
            this.slidingList.closeSlidingItems();
            this.clientes = await this.clientesService.getAll();
        };
        await this.alertService.presentConfirm('Remover Cliente', 'Confirma remoção?', successFunction);

    } catch (e: any){
        await this.alertService.presentAlert('Falha', 'Remoção não foi executada', e, ['OK']);
    }
}

}
function ViwChild(arg0: string): (target: ClientesListagemPage, propertyKey: "slidingList") => void {
  throw new Error('Function not implemented.');
}

