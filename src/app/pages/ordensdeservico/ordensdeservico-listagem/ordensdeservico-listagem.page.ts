import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { OrdemDeServico } from 'src/app/models/ordemdeservico.model';
import { OrdensDeServicoService } from 'src/app/services/ordensdeservico.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-ordensdeservico-listagem',
  templateUrl: './ordensdeservico-listagem.page.html',
  styleUrls: ['./ordensdeservico-listagem.page.scss'],
})
export class OrdensdeservicoListagemPage implements OnInit {

  public ordensDeServico: OrdemDeServico[] = [];

  @ViewChild('slidingList') slidingList!: IonList;
  alertService: any;
  ordemdeservico: any;

  constructor(
    private ordensdeservicoService: OrdensDeServicoService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    
    this.ordensDeServico = await this.ordensdeservicoService.getAll();
  }

  async removerAtendimento(ordensdeservico: OrdemDeServico) {
    await this.ordensdeservicoService.removeById(this.ordemdeservico.ordemdeservicoid).then(async () => {
      this.ordensDeServico = await this.ordensdeservicoService.getAll();
      this.toastService.presentToast('Ordem de Servico removida', 3000, 'top');
      await this.slidingList.closeSlidingItems();
    })
    .catch(async (e) => await this.alertService.presentAlert('Falha', 'Remoção não foi executada', e, ['ok']));
  } 

}
