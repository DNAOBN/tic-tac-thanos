import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('template') modal: TemplateRef<any>;
  @Input() title: string;
  // Define se o modal é fechável ou não
  @Input() closeable = true;
  // Tamanho do modal, pode ser modal-xl(extra grande), 'modal-lg' (grande), 'modal-sm' (pequeno) ou vazio (medio)
  @Input() size: string;

  modalRef: BsModalRef;
  config: ModalOptions;

  constructor(private readonly modalService: BsModalService) {}

  ngOnInit(): void {
    this.config = {
      ignoreBackdropClick: !this.closeable,
      class: this.size,
      keyboard: this.closeable,
    };
  }

  show(): void {
    this.modalRef = this.modalService.show(this.modal, this.config);
  }

  hide(): void {
    this.modalRef.hide();
  }
}
