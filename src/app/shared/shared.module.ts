import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

@NgModule({
  declarations: [ModalComponent, CardComponent, ThumbnailComponent],
  imports: [CommonModule],
  exports: [ModalComponent, CardComponent, ThumbnailComponent],
})
export class SharedModule {}
