import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenegalModule } from 'src/app/general/general.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginPageComponent } from './login-page.component';

const routes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
  declarations: [LoginPageComponent, SignInComponent, SignUpComponent],
  imports: [CommonModule, RouterModule.forChild(routes), GenegalModule],
  exports: [],
})
export class LoginModule {}
