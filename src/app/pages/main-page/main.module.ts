import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/auth.guard';
import { MainRoutingModule } from './main-routing.module';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PreviousSearchesComponent } from './components/search-bar/previous-searches/previous-searches.component';
import { SearchPointComponent } from './components/search-bar/previous-searches/search-point/search-point.component';
import { HeroesListComponent } from './pages/user-info/tabs/heroes-list/heroes-list.component';
import { HistoryComponent } from './pages/user-info/tabs/history/history.component';
import { PowerUpsComponent } from './pages/user-info/tabs/power-ups/power-ups.component';

@NgModule({
  declarations: [
    UserInfoComponent,
    SelectionPageComponent,
    HeroCardComponent,
    SearchBarComponent,
    PreviousSearchesComponent,
    SearchPointComponent,
    HeroesListComponent,
    HistoryComponent,
    PowerUpsComponent,
  ],
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
