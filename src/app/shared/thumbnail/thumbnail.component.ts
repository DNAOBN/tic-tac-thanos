import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent implements OnInit {
  @Input() url: string;
  // sm, md, lg
  @Input() size: string;

  sizeMap = new Map([]);

  constructor() {}

  ngOnInit(): void {}
}
