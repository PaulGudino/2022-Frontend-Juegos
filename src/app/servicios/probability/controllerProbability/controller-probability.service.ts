import { Injectable } from '@angular/core';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import {getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { AwardsService } from '../../awards/awards.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerProbabilityService {

  private awards:getAwardList[]=[];

  constructor(
    private probability:ProbabilityService,
    private award:AwardsService

  ) { }

  fillAwardList(){
    this.probability.getAwardsListGame()
    .subscribe(data => {
      data.map(((_premio: any) => {
        this.award.getAwardbyId(_premio.premio_id).subscribe(award_instance =>{
        this.awards.push(award_instance);
        })
      }))
    })
  }

}
