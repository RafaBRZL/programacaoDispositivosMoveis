import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormBuilder } from '@angular/forms';
//Junto aos demais imports de app.module.ts
import { IonicStorageModule } from '@ionic/storage-angular';
import { DatabaseService } from './services/database.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [FormBuilder,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatabaseService, DatePicker],
  bootstrap: [AppComponent]
})
export class AppModule {}
