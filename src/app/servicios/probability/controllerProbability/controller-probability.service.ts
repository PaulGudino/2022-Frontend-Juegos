import { Injectable } from '@angular/core';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import {getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { AwardsService } from '../../awards/awards.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerProbabilityService {

  private id_game = '1';
  private gameName = 'Tragamonedas';
  private newAwards:getAwardList[] =[];
  private awardsGame:getAwardList[] =[];
  private legendary_box:Number[] = [1];
  private epic_box:Number[] = [1,2];
  private common_box:Number[] = [1,2,4];
 // private publicity_box:Number[] = [1,2];

  constructor(
    private probability:ProbabilityService,
    private awards:AwardsService

  ) {

  }


  addItemToCategory(award:getAwardList,category:string){

    let body = {
      game_id:this.id_game,
      premio_id:String(award.id)
    }

    this.probability.postItemToCategory(body)
    .subscribe((res) =>{

      this.awards.getAward()
      .subscribe(data => {
        data.map(award =>{
          this.probability.getAwardsListGame().subscribe(
            awardGameData =>{
              awardGameData.forEach((awardGame:any) =>{
                if(award.category==category && awardGame.premio_id == award.id){
                  this.newAwards.push(award);

                }
            })

          })

        })

      })

    })

  }

  setAwardsGame(awards:getAwardList[]):void{
   this.awardsGame = awards
  }
  getAwardsGame(){
   return this.awardsGame
  }
  getIdGame(){
   return this.id_game;
  }
  getGameName(){
   return this.gameName;
  }

  addProbabilityConfig(form:FormData){
    return;
  }
  getNewAwards(){
    return this.newAwards;
  }

  getLegendaryBoxes(){
    return this.legendary_box;
  }

  getEpicBoxes(){
    return this.epic_box;
  }

  getCommonBoxes(){
    return this.common_box;
  }
  // getPublicityBoxes(){
  //   return this.publicity_box;
  // }

}
