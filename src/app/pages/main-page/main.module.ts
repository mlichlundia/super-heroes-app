import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/auth.guard';
import { MainRoutingModule } from './main-routing.module';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';

@NgModule({
  declarations: [UserInfoComponent, SelectionPageComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
})
export class MainModule {}
