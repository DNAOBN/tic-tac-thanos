import { Observable, of, from, BehaviorSubject, Observer } from 'rxjs';
import { MarvelService } from './../../services/marvel.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { switchMap, filter, tap, take, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss'],
})
export class CharacterSelectionComponent implements OnInit, AfterViewInit {
  @ViewChild('selectionModal') selectionModal: ModalComponent;

  playerImageUrl = new Map<number, string>();

  player1$: BehaviorSubject<string>;
  player2$: BehaviorSubject<string>;

  results1$;
  results2$;

  constructor(private marvel: MarvelService) {}

  ngOnInit(): void {
    this.player1$ = new BehaviorSubject('');
    this.player2$ = new BehaviorSubject('');

    this.results1$ = this.syncResultsPlayer(this.player1$);
    this.results2$ = this.syncResultsPlayer(this.player2$);
  }

  ngAfterViewInit(): void {
    this.selectionModal.show();
  }

  syncResultsPlayer(player: BehaviorSubject<string>): Observable<any> {
    return player.pipe(
      filter((name) => !!name),
      debounceTime(500),
      take(1),
      switchMap((name) => this.marvel.getCharactersByName(name)),
      tap((results) => {
        if (!results.length) {
          // TODO: Error
        }
      })
    );
  }

  get player1(): string {
    return this.player1$.value;
  }

  set player1(value: string) {
    if (value !== this.player1$.value) {
      this.player1$.next(value);
    }
  }

  get player2(): string {
    return this.player2$.value;
  }

  set player2(value: string) {
    if (value !== this.player2$.value) {
      this.player2$.next(value);
    }
  }

  selectCharacter(player: number, character): void {
    console.log(character);
    console.log(
      `${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`
    );
    this.playerImageUrl.set(
      player,
      `${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`
    );
  }
}
