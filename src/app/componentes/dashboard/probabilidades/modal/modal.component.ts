import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isOpenModal:boolean=true;
  @Output() propagar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.isOpenModal = false;
    this.propagar.emit(this.isOpenModal);

  }

}
