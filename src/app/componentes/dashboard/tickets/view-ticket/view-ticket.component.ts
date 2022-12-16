import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { Ticket } from 'src/app/interfaces/ticket/Ticket';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';


@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  singularName : string = 'ticket';
  pluralName : string = 'tickets';
  actionName : string = 'visualizar';
  samedate = false;
  QRdata : string = '';
  ticket : Ticket = {
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
    private router : Router,
    private activedRoute : ActivatedRoute,
    private ticketAPI : TicketService,
    private staticData: PuenteDatosService,
  ) {}

  toList(): void {
    this.router.navigate(['dashboard/' + this.pluralName]);
  }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    let ticketId = this.activedRoute.snapshot.paramMap.get('id');
    this.ticketAPI.getById(Number(ticketId)).subscribe((data) => {
      this.ticket = data;
      this.QRdata = data.game_id+'|'+data.invoice_number+'|'+data.client_id+'|'+data.qr_code_digits
      if (this.ticket.date_created == this.ticket.date_ticket_played){
        this.samedate = true;
      }
    })
    
  }
}

