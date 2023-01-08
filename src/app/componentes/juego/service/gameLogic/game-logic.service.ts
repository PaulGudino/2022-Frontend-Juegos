import { Injectable } from '@angular/core';
import { TicketService } from '../../../../servicios/ticket/ticket.service';
import { Ticket } from '../../../../interfaces/ticket/Ticket';
import { MatchService } from 'src/app/servicios/match/match.service';
import { lastValueFrom } from 'rxjs';

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
      private matchService: MatchService
   ) {}

   public async verifyTicket(qrCodeDigits: string) {
      let promise = await lastValueFrom(
         this.ticketService.getFilter(
            `?qr_code_digits=${qrCodeDigits}&state=Disponible`
         )
      );
      debugger;
      if (promise) {
         this.ticket = promise[0];
         return true;
      }
      return false;
   }
}
