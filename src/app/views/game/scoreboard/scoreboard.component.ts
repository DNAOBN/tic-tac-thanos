import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  @Input() score1: number;
  @Input() score2: number;

  constructor() {}

  ngOnInit(): void {}
}
