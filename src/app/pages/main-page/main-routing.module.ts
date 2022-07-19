import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { MainPageComponent } from './main-page.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: '/home/heroes-list', pathMatch: 'full' },
      {
        path: 'user-info',
        component: UserInfoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'heroes-list',
        component: SelectionPageComponent,
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
