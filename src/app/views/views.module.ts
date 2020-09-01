import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import { SharedModule } from './../shared/shared.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';
import { SquareComponent } from './game/square/square.component';
import { ScoreboardComponent } from './game/scoreboard/scoreboard.component';

@NgModule({
  declarations: [CharacterSelectionComponent, GameComponent, BoardComponent, SquareComponent, ScoreboardComponent],
  imports: [CommonModule, SharedModule, TypeaheadModule, FormsModule],
  exports: [],
})
export class ViewsModule {}
