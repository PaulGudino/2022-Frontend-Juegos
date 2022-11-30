import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { GameService } from 'src/app/servicios/game/game.service';
import { ClientService } from 'src/app/servicios/client/client.service';
import { Client } from 'src/app/interfaces/client/Client';
import { Game } from 'src/app/interfaces/game/Game';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  singularName : string = 'Ticket'
  pluralName : string = 'Tickets'
  actionName : string = 'Crear'
  formGroup : FormGroup;
  allClients : Client[] = [];
  allGames : Game[] = [];
  invoiceNumber : string = '';
  qr_code_url : string = '';
  qr_code_digits : string = '';
  clientId : string = '';

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
      qr_code_url : [''],
      qr_code_digits : [''],
      invoice_number : ['', Validators.required],
      state : ['', Validators.required],
      client : ['', Validators.required],
      game : ['', Validators.required],
    });

    this.ClientAPI.getAll().subscribe(
      (data) => {
        this.allClients = data;
      }
    );
    this.GameAPI.getAll().subscribe(
      (data) => {
        this.allGames = data;
      }
    );
  }

  toList() {
    this.router.navigate(['dashboard/' + this.pluralName]);
  }

  create() {
    this.formGroup.valid ? this.showDialog() : 
    this.snackBar.mensaje('Llene el formulario correctamente');
  }

  showDialog() {
    const DIALOGINFO = {
      title: this.actionName.toUpperCase() + ' ' + this.singularName.toUpperCase(),
      message: '¿Está seguro de que quiere ' + this.actionName + ' el nuevo ' + this.singularName + '?',
      cancelText: 'CANCELAR',
      confirmText: this.actionName.toUpperCase()
    }
    this.confirmDialog.open(DIALOGINFO)
    this.sendForm()
  }

  sendForm () {
    this.confirmDialog.confirmed().subscribe(
      confirmed => {
        if (confirmed) {
          let formData = this.fillForm();
          this.ticketAPI.post(formData).subscribe ({
            next : (res) => {
              this.snackBar.mensaje(this.singularName + ' Creado Exitosamente');
              this.toList();
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
    formData.append('qr_code_digits', this.qr_code_digits);
    formData.append('qr_code_url', this.qr_code_url);
    return formData;
  }

  ngOnInit(): void {
  }

  generateQRCode() {
    this.invoiceNumber = this.formGroup.get('invoice_number')?.value;
    this.clientId = this.formGroup.get('client')?.value;
    this.qr_code_url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${this.invoiceNumber + '-' + this.clientId}`;
    this.qr_code_digits = (Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000).toString(10);
  }

}

