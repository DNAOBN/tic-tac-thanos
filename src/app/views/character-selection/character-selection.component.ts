import { MarvelService } from './../../services/marvel.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss'],
})
export class CharacterSelectionComponent implements OnInit, AfterViewInit {
  @ViewChild('selectionModal') selectionModal: ModalComponent;

  player1ImageUrl;
  player2ImageUrl;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.selectionModal.show();
  }
}
