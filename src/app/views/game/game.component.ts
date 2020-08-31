import { MarvelService } from './../../services/marvel.service';
import { switchMap, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TwoWayMap } from 'src/app/shared/custom-classes/two-way-map.class';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('gameOver') gameOverModal: ModalComponent;
  playerScores = new Map([
    [1, 0],
    [2, 0],
  ]);
  playerSymbols = new TwoWayMap<number, string>();
  playerImageUrl: Map<number, string>;

  constructor() {}

  ngOnInit(): void {
    this.assignPlayerSymbols();
  }

  assignPlayerSymbols(): void {
    const random = Math.random() + 1;
    this.playerSymbols.setValueKey('X', Math.ceil(random));
    this.playerSymbols.setValueKey('O', Math.floor(random));
  }

  endGame(winner: string): void {
    const player = this.playerSymbols.getKey(winner);
    const previousScore = this.playerScores.get(player);
    this.playerScores.set(player, previousScore + 1);
    this.gameOverModal.show();
  }

  resetScore(): void {
    this.playerScores.set(1, 0);
    this.playerScores.set(2, 0);
  }
}
