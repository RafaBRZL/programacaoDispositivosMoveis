import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cliente-add-edit',
  templateUrl: './cliente-add-edit.page.html',
  styleUrls: ['./cliente-add-edit.page.scss'],
})
export class ClienteAddEditPage implements OnInit {
 
  cliente = {nascimento: null, renda: null, tel: null, email: null, nome: null};
   //@ViewChild('inputNome', {read:ElementRef}) nome!:ElementRef;
  clienteForm! : FormGroup;

  hasErrors = false;
  errorMessage: string[]|undefined;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private toastCtrl: ToastController) { }


    async presentAlert(header: string, subHeader: string, message: string, buttons: string[]){
      const alert = await this.alertController.create({
        header,
        subHeader,
        message,
        buttons
      })
      await alert.present();
    }
      
    async presentToast(message: string, duration: number, position: 'top' | 'bottom'){
      const toast = await this.toastCtrl.create({
          message,
          duration,
          position
        });
        toast.present();
      }
    

  validationMessages ={
    nome: [
      {type: 'required', message: 'Nome é obrigatório'},
      {type: 'minlength', message: 'Nome deve ter ao menos 3 caracteres'},
      {type: 'maxlength', message: 'Nome não deve ter ao mais 50 caracteres'}
    ],
    email: [
      {type: 'required', message: 'E-mail é obrigatório'},
      {type: 'email', message: 'O e-mail deve ter um formato válido'}
    ],
    tel: [
      {type: 'required', message: 'Telefone é obrigatório'}
    ],
    renda: [
      {type: 'required', message: 'Renda é obrigatório'},
      {type: 'min', message: 'Renda deve ser maior que zero'}
    ], 
    nascimento: [
      {type: 'required', message: 'Nascimento é obrigatório'}
    ]
  }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      tel: ['',Validators.required],
      renda: ['',Validators.compose([Validators.required, Validators.min(0)])],
      nascimento: ['',Validators.required]
    });
  }

  //submit(inputNome: any, inputEmail: any,inputTelefone: any,inputRenda: any, inputNascimento: any,){
    // console.log(inputNome.value + '/' + inputEmail.value + '/' +inputTelefone.value + '/' +inputRenda.value + '/' + inputNascimento.value);
  //}
  public nome: string | undefined;

  async submit() {
    this.errorMessage = [];
    if(this.clienteForm.get('nome')!.hasError('required') ||
      this.clienteForm.get('nome')!.hasError('minLength')){
      this.errorMessage.push('Nome é obrigatório');
    }
    if(this.clienteForm.get('email')!.hasError('required') || 
    this.clienteForm.get('email')!.hasError('minLength')){
      this.errorMessage.push('Email é obrigatório');
    }
    if(this.clienteForm.get('tel')!.hasError('required') || 
    this.clienteForm.get('tel')!.hasError('minLength')){
      this.errorMessage.push('Telefone é obrigatório');
    }
    if(this.clienteForm.get('renda')!.hasError('required') || 
    this.clienteForm.get('renda')!.hasError('minLength')){
      this.errorMessage.push('Renda é obrigatório');
    }
    if(this.clienteForm.get('nascimento')!.hasError('required') || 
    this.clienteForm.get('nascimento')!.hasError('minLength')){
      this.errorMessage.push('Nascimento é obrigatório');
    }
    this.hasErrors = this.errorMessage.length > 0;

    if (!this.hasErrors){
      await this.presentToast('Gravação bem sucedida', 3000, 'top');
    }
  }
}
