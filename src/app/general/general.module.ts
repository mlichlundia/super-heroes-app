import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class GenegalModule {}
