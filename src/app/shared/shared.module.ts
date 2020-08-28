import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

@NgModule({
  declarations: [ModalComponent, ThumbnailComponent],
  imports: [CommonModule],
  exports: [ModalComponent, ThumbnailComponent],
})
export class SharedModule {}
