import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import {ProbabilityService} from './../../../../servicios/probability/probability/probability.service'
import {ControllerProbabilityService} from './../../../../servicios/probability/controllerProbability/controller-probability.service'
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import {AwardsService} from "../../../../servicios/awards/awards.service";


@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnInit {
  @Input() name: string='product name';
  @Input() stock: string='-';
  @Input() imgUrl: string='';
  @Input()
  award!: getAwardList;
  newAwardList:getAwardList[]=[];
  @Output() propagar = new EventEmitter<getAwardList[]>();

  constructor(
    private controller:ControllerProbabilityService,
  ) { }

  ngOnInit(): void {
  }

  addItem(){
    this.controller.addItemToCategory(this.award,this.award.category);
    this.newAwardList = this.controller.getNewAwards();
    this.propagar.emit(this.newAwardList);

  }


}
