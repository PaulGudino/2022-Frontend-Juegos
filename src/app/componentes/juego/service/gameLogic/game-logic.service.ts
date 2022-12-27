import { Injectable } from '@angular/core';
import { TicketService } from '../../../../servicios/ticket/ticket.service';
import { Ticket } from '../../../../interfaces/ticket/Ticket';
import { MatchService } from 'src/app/servicios/match/match.service';

@Injectable({
   providedIn: 'root',
})
export class GameLogicService {
   ticket: Ticket = {
      id : '',
    invoice_number : '',
    date_created : '',
    date_ticket_played : '',
    qr_code_digits : '',
    state : '',
    client : '',
    game_id : '',
    game_name : '',
    user_register : '',
    client_cedula : '',
    client_id : '',
   };

   constructor(
      private ticketService: TicketService,
      private matchService: MatchService
   ) {}

   verifyTicketInvoice(
      idCliente: String,
      qr_code_digits: number,
      idTicket: string
   ): Boolean {
      this.ticketService.getById(Number(idTicket)).subscribe((data) => {
         if (data) {
            this.ticket = data;
         }
      });

      return true;
   }
}
