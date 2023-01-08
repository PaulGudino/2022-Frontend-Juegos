import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { Injectable } from '@angular/core';
import { TicketService } from '../../../../servicios/ticket/ticket.service';
import { Ticket } from '../../../../interfaces/ticket/Ticket';
import { MatchService } from 'src/app/servicios/match/match.service';
import { lastValueFrom } from 'rxjs';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';
import { GameService } from 'src/app/servicios/game/game.service';

@Injectable({
   providedIn: 'root',
})
export class GameLogicService {
   ticket: Ticket = {
      id: '',
      invoice_number: '',
      date_created: '',
      date_ticket_played: '',
      qr_code_digits: '',
      state: '',
      client: '',
      game_id: '',
      game_name: '',
      user_register: '',
      client_cedula: '',
      client_id: '',
      game_start :'',
      game_end : ''
   };

   constructor(
      private ticketService: TicketService,
      private matchService: MatchService,
      private gameDataSrv: GameDateService,
      private awardConditionSrv: AwardsConditionService,
      private awardSrv: AwardsService,
      private game: GameService,
       
      // Added for getPrize()
      private probabilityService: ProbabilityService,
   ) {}

   public async verifyTicket(qrCodeDigits: string) {
      const promise = await lastValueFrom(
         this.ticketService.getFilter(
            '?&state=Disponible&qr_code_digits='+qrCodeDigits
         )
      );
      if (promise.length > 0) {
         this.ticket = promise[0];
         let ticket_created
         let start_game
         let end_game

         const res:any = await lastValueFrom(this.game.getById(1))

         ticket_created = new Date(this.ticket.date_created);
         start_game = new Date(res.start_date);
         end_game = new Date(res.end_date)

         if(start_game<=ticket_created && end_game>=ticket_created){
            return true;
         }else{
            return false;
         }
      }else{
         return false;
      }
   }

   async getAwardConditionToday(){
      let today = new Date();
      let current_day = this.gameDataSrv.DateFormat(today)
      let filter_today = '?is_approved=false&start_date__lte='+current_day+'&end_date__gte='+current_day
      await lastValueFrom(this.awardConditionSrv.getAwardConditionFilter(filter_today))
   }
   async wonAward(id:number){
      let formData: FormData = new FormData();
      formData.append('won_award', 'true'); 
      await lastValueFrom(this.awardSrv.winAward(id, formData))
   }

   async wonAwardCondition(id_award:number,id_condition:number){
      let formData: FormData = new FormData();
      formData.append('won_award', 'true'); 
      await lastValueFrom(this.awardSrv.winAwardCondition(id_award, formData))
      let formData2: FormData = new FormData();
      formData2.append('state', 'true'); 
      await lastValueFrom(this.awardConditionSrv.changeState(id_condition, formData2))
   }

   async changeStateTicket(id:number){
      let formData: FormData = new FormData();
      formData.append('state', 'true'); 
      await lastValueFrom(this.ticketService.changeStateTicket(id, formData))   
   }

async getPrize() : Promise<string> {

      let min : number = 0 ;
      let max : number = 100;
      let rd_number = Math.floor(Math.random() * (max - min + 1)) + min;
      let win_prob : number;
      let result : string = "None";

      this.probabilityService.getProbabilites().subscribe(data => {
         
         win_prob = data;

         if (rd_number <= win_prob) {
            
            // Winner
            rd_number = Math.floor(Math.random() * (max - min + 1)) + min;
            
            if (rd_number <= 60) {
               //console.log("Common prize");
               result = "Common prize";
               return result;
            }
            else if (rd_number <= 85) {
               //console.log("Rare prize");
               result = "Rare prize";
               return result;
            }
            else if (rd_number <= 95) {
               //console.log("Epic prize");
               result = "Epic prize";
               return result;
            }
            else if (rd_number <= 100) {
               //console.log("Lengendary prize");
               result = "Lengendary prize";
               return result;
            }

         }
         
         // Loser
      });
     
      return result;
   }

}
