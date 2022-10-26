import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';



@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  isModalOpen:boolean = false;
  @Output() propagar = new EventEmitter<any>();

  @Input() awardsList:getAwardList[]=[];
  awards:getAwardList[]=[]
  @Input() title:string = ''
  @Input() color:string=''


  constructor(
    private probability:ProbabilityService,


  ) { }

  ngOnInit(): void {
    this.probability.getAwardsListGame()
    .subscribe(data => {
      data.map(((premio: any) => {
        this.awardsList.map(_premio =>{
          debugger;
          if(_premio.id == premio.premio_id){
            this.awards.push(_premio)
          }
        })
      }))
    })

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
