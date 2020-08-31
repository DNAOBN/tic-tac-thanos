import { Character } from './../../shared/models/marvel/character';
import { Player } from 'src/app/shared/models/player';
import { Observable, BehaviorSubject } from 'rxjs';
import { MarvelService } from 'src/app/services/marvel.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { switchMap, filter, tap, take, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss'],
})
export class CharacterSelectionComponent implements OnInit, AfterViewInit {
  @ViewChild('selectionModal') selectionModal: ModalComponent;

  // Map para guardar as informações de cada jogador
  players = new Map<number, Player>();
  // Map para verificar se o jogador já selecionou o personagem
  characterSelected = new Map<number, boolean>();

  inputName$ = new Map<number, BehaviorSubject<string>>();
  searchResults$ = new Map<number, Observable<Character[]>>();

  constructor(private marvel: MarvelService, private router: Router) {}

  ngOnInit(): void {
    this.createPlayers();
    this.syncTypeaheadResults();
  }

  ngAfterViewInit(): void {
    this.selectionModal.show();
  }

  // Verifica se ambos os jogadores selecionaram seus personagens
  get charactersSelected(): boolean {
    return this.characterSelected.get(0) && this.characterSelected.get(1);
  }

  createPlayers(): void {
    this.players.set(0, {});
    this.players.set(1, {});
  }

  // Linka o campo de input do nome do personagem com a busca
  // à API da marvel por meio de BehaviorSubjects
  syncTypeaheadResults(): void {
    this.inputName$.set(0, new BehaviorSubject(''));
    this.inputName$.set(1, new BehaviorSubject(''));

    this.searchResults$.set(
      0,
      this.syncPlayerSearchResults(this.inputName$.get(0))
    );
    this.searchResults$.set(
      1,
      this.syncPlayerSearchResults(this.inputName$.get(1))
    );
  }

  syncPlayerSearchResults(player: BehaviorSubject<string>): Observable<any> {
    return player.pipe(
      filter((name) => !!name),
      debounceTime(500),
      take(1),
      switchMap((name) => this.marvel.getCharactersByName(name)),
      tap((results) => {
        console.log(results);
        if (!results.length) {
          // TODO: Error
        }
      })
    );
  }

  setPlayerName(player: number, characterName: string): void {
    if (characterName !== this.inputName$.get(player).value) {
      this.inputName$.get(player).next(characterName);
    }
  }

  // Atualiza o personagem selecionado pelo jogador
  selectCharacter(player: number, character: Character): void {
    this.players.get(
      player
    ).thumbnail = `${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`;
    this.players.get(player).characterId = character.id;
    this.characterSelected.set(player, true);
  }

  startGame(): void {
    this.selectionModal.hide();
    this.router.navigate([
      'game',
      this.players.get(0).characterId,
      this.players.get(1).characterId,
    ]);
  }

  // Seta o personagem como "não selecionado" caso uma tecla que não seja
  // Enter o Tab seja pressionada (para manter a consistência da thumbnail
  // com o texto no campo de input)
  unsetSelected(player: number, keyPress: KeyboardEvent): void {
    if (keyPress.key !== 'Tab' && keyPress.key !== 'Enter') {
      this.characterSelected.set(player, false);
    }
  }
}
