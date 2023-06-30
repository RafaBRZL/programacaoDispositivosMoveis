import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DatabaseService } from './services/database.service';
import { databaseName } from './services/database.statements';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedIndex: number | undefined;

  pages = [
   { 
    title: 'Tipos de servicos',
    url: '/tipodeservico',
    icon: '/assets/imgs/icon_tiposservicos.png'
   },
   {
    title: 'Pecas',
    url: '/pecas',
    icon: 'assets/imgs/tab_pecas.png'
   },
   {
    title: 'Atendimentos',
    url: '/ordensdeservicos-listagem',
    icon: 'assets/imgs/icon_atendimentos.png'
   },
   {
    title: 'Clientes',
    url: '/clientes-listagem',
    icon: 'assets/imgs/icon_clientes.png'
   }
  ];
  private initPlugin!: boolean;
  constructor(
    private Storage: Storage,
    private platform: Platform,
    private databaseService: DatabaseService, 
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.databaseService.initializePlugin().then(async (ret) => {
        try {
          const db = await this.databaseService.createConnection(databaseName, false, "no-encrypted", 1);
          this.initPlugin = ret;
        }catch (err) {
          console.log(`Error: ${err}`);
          this.initPlugin = false;
        }
        console.log('Status da inicialização do plugin: ' + this.initPlugin);
      });
    });
  }
  async ngOnInit() {
    await this.Storage.create();
  }
}
