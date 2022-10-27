import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { Publicity } from 'src/app/interfaces/publicity/publicity';
import {AwardsService} from '../../../../servicios/awards/awards.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() category: string='';
  @Input() publicity: Publicity[]=[]

  modalAwards:getAwardList[]=[];

  isOpenModal:boolean=true;
  @Output() propagar = new EventEmitter<boolean>();

  constructor(
    private awards:AwardsService,
  ) { }

  ngOnInit(): void {
    this.awards.getAward()
    .subscribe(data => {
      data.map(award =>{
        if(this.category == award.category){
          this.modalAwards.push(award);
        }
      })
    })

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
