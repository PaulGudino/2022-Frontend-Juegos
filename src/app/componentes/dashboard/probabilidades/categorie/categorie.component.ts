import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  isModalOpen:boolean = false;
  @Output() propagar = new EventEmitter<any>();

  @Input() awards:getAwardList[]=[];
  @Input() title:string = ''
  @Input() color:string=''


  constructor(

  ) { }

  ngOnInit(): void {

  }
  openModal(){
    this.isModalOpen=true;
    this.propagar.emit({
      isModalOpen: this.isModalOpen,
      category:this.title,
      awards:this.awards
    });
  }

}
