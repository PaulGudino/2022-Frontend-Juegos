import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { Ticket } from 'src/app/interfaces/ticket/Ticket';


@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  singularName : string = 'ticket';
  pluralName : string = 'tickets';
  actionName : string = 'visualizar';
  ticket : Ticket = {
    id : '',
    invoice_number : '',
    qr_code_digits:0,
    qr_code : '',
    state : '',
    client : '',
    game : '',
    user_register : '',
    user_modifier : '',
    date_created : '',
    date_modified : '',
  };

  constructor(
    private router : Router,
    private activedRoute : ActivatedRoute,
    private ticketAPI : TicketService,
  ) {}

  toList() {
    this.router.navigate(['dashboard/' + this.pluralName]);
  }

  ngOnInit(): void {
    let ticketId = this.activedRoute.snapshot.paramMap.get('id');
    this.ticketAPI.getById(Number(ticketId)).subscribe((data) => {
      this.ticket = data;
    })
  }
}

