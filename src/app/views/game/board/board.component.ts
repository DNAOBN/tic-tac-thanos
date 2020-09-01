import { Subject, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  @Input() size = 3;
  @Input() reset: Subject<void>;
  @Output() win = new EventEmitter<string>();
  @Output() next = new EventEmitter<string>();
  sizeArray: number[];
  state = new Map<string, string>();

  xIsNext = true;
  nextPlayer = new Map([
    [true, 'X'],
    [false, 'O'],
  ]);

  reset$: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.sizeArray = [...Array(this.size).keys()];
    this.resetBoard();
    this.reset$ = this.reset.subscribe(() => this.resetBoard());
  }

  ngOnDestroy(): void {
    this.reset$.unsubscribe();
  }

  resetBoard(): void {
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        this.state.set(`${row}, ${column}`, '');
      }
    }
    this.xIsNext = true;
    this.next.emit('X');
  }

  checkSquare(coords: string): void {
    this.state.set(coords, this.nextPlayer.get(this.xIsNext));
    this.checkForWin(coords);
    this.xIsNext = !this.xIsNext;
    this.next.emit(this.nextPlayer.get(this.xIsNext));
  }

  checkForWin(coords: string): void {
    const symbol = this.state.get(coords);
    if (this.checkRows() || this.checkColumns() || this.checkCross()) {
      this.win.emit(symbol);
    } else {
      if (!Array.from(this.state.values()).includes('')) {
        this.win.emit('V');
      }
    }
  }

  checkRows(): boolean {
    for (let row = 0; row < this.size; row++) {
      if (
        !!this.state.get(`${row}, 1`) &&
        this.state.get(`${row}, 0`) === this.state.get(`${row}, 1`) &&
        this.state.get(`${row}, 1`) === this.state.get(`${row}, 2`)
      ) {
        return true;
      }
    }
    return false;
  }

  checkColumns(): boolean {
    for (let column = 0; column < this.size; column++) {
      if (
        !!this.state.get(`1, ${column}`) &&
        this.state.get(`0, ${column}`) === this.state.get(`1, ${column}`) &&
        this.state.get(`1, ${column}`) === this.state.get(`2, ${column}`)
      ) {
        return true;
      }
    }
    return false;
  }

  checkCross(): boolean {
    if (
      !!this.state.get(`1, 1`) &&
      this.state.get(`0, 0`) === this.state.get(`1, 1`) &&
      this.state.get(`1, 1`) === this.state.get(`2, 2`)
    ) {
      return true;
    }
    if (
      !!this.state.get(`1, 1`) &&
      this.state.get(`0, 2`) === this.state.get(`1, 1`) &&
      this.state.get(`1, 1`) === this.state.get(`2, 0`)
    ) {
      return true;
    }
    return false;
  }

  getSquareClass(coords: string): string {
    const coordsArray = coords.split(', ').map((coord) => +coord);
    let squareClass = '';
    if (coordsArray[1] === 0) {
      squareClass += 'left ';
    }
    if (coordsArray[1] === this.size - 1) {
      squareClass += 'right ';
    }
    if (coordsArray[0] === 0) {
      squareClass += 'top ';
    }
    if (coordsArray[0] === this.size - 1) {
      squareClass += 'bottom ';
    }
    return squareClass;
  }
}
