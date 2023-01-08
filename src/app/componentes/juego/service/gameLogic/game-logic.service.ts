import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { Injectable } from '@angular/core';
import { TicketService } from '../../../../servicios/ticket/ticket.service';
import { Ticket } from '../../../../interfaces/ticket/Ticket';
import { MatchService } from 'src/app/servicios/match/match.service';
import { lastValueFrom } from 'rxjs';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';

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
      private awardSrv: AwardsService
   ) {}

   public async verifyTicket(qrCodeDigits: string) {
      let promise = await lastValueFrom(
         this.ticketService.getFilter(
            '?&state=Disponible&qr_code_digits='+qrCodeDigits
            // `?qr_code_digits=${qrCodeDigits}&state=Disponible`
         )
      );
      // debugger;
      if (promise) {
         this.ticket = promise[0];
         console.log(this.ticket)
         return true;
      }
      return false;
   }

   getAwardConditionToday(){
      let today = new Date();
      let current_day = this.gameDataSrv.DateFormat(today)
      // let current_day = '2023-01-08T11:00:00'
      console.log(current_day)
      let filter_today = '?is_approved=false&start_date__lte='+current_day+'&end_date__gte='+current_day
      this.awardConditionSrv.getAwardConditionFilter(filter_today).subscribe(
         (res:any) => {
            console.log(res)
         }
      )
   }
   wonAward(id:number){
      let formData: FormData = new FormData();
      formData.append('won_award', 'true'); 
      this.awardSrv.winAward(id, formData).subscribe(
         data =>{
            console.log(data)
         }
      )
   }

   wonAwardCondition(id_award:number,id_condition:number){
      let formData: FormData = new FormData();
      formData.append('won_award', 'true'); 
      this.awardSrv.winAwardCondition(id_award, formData).subscribe(
         data =>{
            console.log(data)
         }
      )
      let formData2: FormData = new FormData();
      formData2.append('state', 'true'); 
      this.awardConditionSrv.changeState(id_condition, formData2).subscribe(
         data =>{
            console.log(data)
         }
      )
   }

}
