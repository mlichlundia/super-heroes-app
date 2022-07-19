import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { MainPageComponent } from './main-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: '/home/user-info', pathMatch: 'full' },
      {
        path: 'user-info',
        component: UserInfoComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [MainPageComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
