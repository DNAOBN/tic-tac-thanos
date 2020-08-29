import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import { SharedModule } from './../shared/shared.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CharacterSelectionComponent],
  imports: [CommonModule, SharedModule, TypeaheadModule, FormsModule],
  exports: [],
})
export class ViewsModule {}
