import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { GameService } from 'src/app/servicios/game/game.service';
import { ClientService } from 'src/app/servicios/client/client.service';
import { Client } from 'src/app/interfaces/client/Client';
import { GamePutDate } from 'src/app/interfaces/game/GamePutDate';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateClientComponent implements OnInit {

  singularName : string = 'Ticket'
  pluralName : string = 'Tickets'
  actionName : string = 'Crear'
  formGroup : FormGroup;
  allClients : Client[];
  allGames : GamePutDate[];

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    // Dialog and snackBar services
    private snackBar : SnackbarService,
    private confirmDialog : ConfirmDialogService,
    private ticketAPI : TicketService,
    private ClientAPI : ClientService,
    private GameAPI : GameService,
  ) {
    // Building the form with the formBuilder

    // id refers to cedula

    this.formGroup = this.formBuilder.group({
      invoice_number : ['', Validators.required],
      state : ['', Validators.required],
      client : ['', Validators.required],
      game : ['', Validators.required],
    });

    this.allClients = this.ClientAPI.getClients();
    this.allGames = this.GameAPI.getGames();
  }

  toTicketList() {
    this.router.navigate(['dashboard/tickets']);
  }

  createTicket() {
    this.formGroup.valid ? this.showDialog() : 
    this.snackBar.mensaje('Llene el formulario correctamente');
  }

  showDialog() {
    const DIALOGINFO = {
      title: 'CREAR TICKET',
      message: '¿Está seguro de que quiere ' + this.actionName + ' el nuevo ' + this.singularName + '?',
      cancelText: 'CANCELAR',
      confirmText: 'CREAR'
    }
    this.confirmDialog.open(DIALOGINFO)
    this.sendForm()
  }

  sendForm () {
    this.confirmDialog.confirmed().subscribe(
      confirmed => {
        if (confirmed) {
          let formData = this.fillForm();
          this.ticketAPI.postTicket(formData).subscribe ({
            next : (res) => {
              this.snackBar.mensaje(this.singularName + ' Creado Exitosamente');
              this.toTicketList();
            },
            error : (res) => {
              this.confirmDialog.error(res.error);
            }
          })
        }
      }
    )
  }

  fillForm() {
    let user_register = localStorage.getItem('user_id');
    let formData : FormData = new FormData();
    formData.append('invoice_number', this.formGroup.get('invoice_number')?.value);
    formData.append('state', this.formGroup.get('state')?.value);
    formData.append('client', this.formGroup.get('client')?.value);
    formData.append('game', this.formGroup.get('game')?.value);
    formData.append('user_register', user_register!);
    formData.append('user_modifier', user_register!);
    return formData;
  }

  ngOnInit(): void {
  }

}

