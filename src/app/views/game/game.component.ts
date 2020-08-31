import { Player } from 'src/app/shared/models/player';
import { MarvelService } from 'src/app/services/marvel.service';
import { switchMap, map, take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Subject, combineLatest } from 'rxjs';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TwoWayMap } from 'src/app/shared/custom-classes/two-way-map.class';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('gameOver') gameOverModal: ModalComponent;
  players: Map<number, Player>;
  playerSymbols = new TwoWayMap<number, string>();
  winner: Player;
  restart = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private marvel: MarvelService
  ) {}

  ngOnInit(): void {
    this.createPlayers();
    this.assignPlayerSymbols();
    this.loadThumbnails();
  }

  createPlayers(): void {
    this.players = new Map<number, Player>([
      [0, { score: 0 }],
      [1, { score: 0 }],
    ]);
  }

  assignPlayerSymbols(): void {
    const random = Math.round(Math.random());
    this.playerSymbols.setValueKey('X', random);
    this.playerSymbols.setValueKey('O', 1 - random);
  }

  loadThumbnails(): void {
    this.route.paramMap
      .pipe(
        map((params) => {
          return [params.get('player1'), params.get('player2')];
        }),
        switchMap((characterIds) => {
          return combineLatest([
            this.marvel.getCharacterById(+characterIds[0]),
            this.marvel.getCharacterById(+characterIds[1]),
          ]);
        }),
        take(1),
        map((characters) => {
          characters.forEach((character, index) => {
            this.players.get(index).characterName = character.name;
          });
          return [
            `${characters[0].thumbnail.path}/standard_large.${characters[0].thumbnail.extension}`,
            `${characters[1].thumbnail.path}/standard_large.${characters[1].thumbnail.extension}`,
          ];
        }),
        map((images) => {
          images.forEach((imageUrl, index) => {
            this.players.get(index).thumbnail = imageUrl;
          });
        })
      )
      .subscribe();
  }

  restartRound(): void {
    this.restart.next();
    this.assignPlayerSymbols();
    this.gameOverModal.hide();
    this.winner = {};
  }

  endGame(winner: string): void {
    console.log(winner);
    if (winner === 'V') {
      this.winner.characterName = 'Velha! Ninguém';
      this.winner.thumbnail =
        'https://vignette.wikia.nocookie.net/spiderman-films/images/a/a7/S2_Aunt_May.png/revision/latest?cb=20121114093535';
    } else {
      const playerId = this.playerSymbols.getKey(winner);
      this.players.get(playerId).score++;
      this.winner = { ...this.players.get(playerId) };
    }
    this.gameOverModal.show();
  }

  restartGame(): void {
    this.restart.next();
    this.resetScore();
    this.gameOverModal.hide();
    this.winner = {};
    this.router.navigate(['home']);
  }

  resetScore(): void {
    this.players.forEach((player) => (player.score = 0));
  }
}
