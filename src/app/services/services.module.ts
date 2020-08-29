import { MarvelService } from './marvel.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MarvelService],
  imports: [CommonModule],
  exports: [MarvelService],
})
export class ServicesModule {}
