import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {loginPageRoutingModule } from './login-routing.module';

import { loginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    loginPageRoutingModule
  ],
  declarations: [loginPage]
})
export class loginPageModule {}
