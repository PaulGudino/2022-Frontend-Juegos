import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() category: string='';
  @Input() modalAwards:getAwardList[]=[];

  isOpenModal:boolean=true;
  @Output() propagar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }

  closeModalOutsideModal(e:Event){

    let target:any = e.target;
    if(target.classList.contains('row')){
      this.isOpenModal = false;
      this.propagar.emit(this.isOpenModal);
    }

  }
  closeModal(){
    this.isOpenModal=false;
    this.propagar.emit(this.isOpenModal);
  }


}
