import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ClientesService } from "./clientes.service";
import { ToastService } from "./toast.service";
import { Cliente } from "../models/cliente.model";

@Injectable({
    providedIn: 'root'
})

export class AlertService {
    alertService: any;
    slidingList: any;
    clientes: import("c:/OFICINA/src/app/models/cliente.model").Cliente[] | undefined;
    
    constructor(
        private clientesService: ClientesService,
        private toastService: ToastService,
        private alertCtrl: AlertController
    ) {}

    async presentConfirm(header: string, message: string, successFunction: () => void) {
        const alert = await this.alertCtrl.create({
            header,
            message,
            buttons: [{
                text: 'Cancel', role: 'calcel',
                handler: () => {
                    console.log('Remoção cancelada');
                }
            },{
                text: 'Manda brasa',
                handler: () => {
                    successFunction();
                }
                
            }]
        });
        await alert.present();
    }

    async presentAlert(header: string, subHeader: string, message: string, buttons: string[] ){
        const alert = await this.alertCtrl.create({
            header,
            subHeader,
            message,
            buttons
        });
        await alert.present();
    }

    
}