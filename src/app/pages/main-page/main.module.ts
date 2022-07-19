import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/auth.guard';
import { MainRoutingModule } from './main-routing.module';
import { UserInfoComponent } from './pages/user-info/user-info.component';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule, MainRoutingModule],
  providers: [AuthGuard],
})
export class MainModule {}
