import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {
  @Input() content: string;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
