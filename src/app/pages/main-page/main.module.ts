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
import { PreviousSearchesComponent } from './components/previous-searches/previous-searches.component';
import { SearchPointComponent } from './components/search-point/search-point.component';
import { AlphabetSearchComponent } from './components/alphabet-search/alphabet-search.component';
import { LetterComponent } from './components/alphabet-search/letter/letter.component';

@NgModule({
  declarations: [
    UserInfoComponent,
    SelectionPageComponent,
    HeroCardComponent,
    SearchBarComponent,
    PreviousSearchesComponent,
    SearchPointComponent,
    AlphabetSearchComponent,
    LetterComponent,
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
