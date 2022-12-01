import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { GameService } from 'src/app/servicios/game/game.service';
import { ClientService } from 'src/app/servicios/client/client.service';
import { Client } from 'src/app/interfaces/client/Client';
import { Game } from 'src/app/interfaces/game/Game';
import { Ticket } from 'src/app/interfaces/ticket/Ticket';
import { ThemeService } from 'src/app/servicios/theme/theme.service';


@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {

  singularName : string = 'Ticket'
  pluralName : string = 'Tickets'
  actionName : string = 'Editar'
  formGroup : FormGroup;
  currentTicket : any;
  allClients : Client[] = [];
  allGames : Game[] = [];

  currentClient !: Client;
  currentGame !: Game;

  invoiceNumber : string = '';
  qr_code_url : string = '';
  qr_code_digits : string = '';
  clientID : string = '';
  gameID : string = '';

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    // Dialog and snackBar services
    private snackBar : SnackbarService,
    private confirmDialog : ConfirmDialogService,
    private ticketAPI : TicketService,
    private activatedRoute : ActivatedRoute,
    private ClientAPI : ClientService,
    private GameAPI : GameService,
  ) {
    // Building the form with the formBuilder

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
    this.router.navigate(['dashboard/tickets']);
  }

  edit() {
    this.formGroup.valid ? this.showDialog() :
    this.snackBar.mensaje('Llene el formulario correctamente');
  }

  showDialog() {
    const DIALOGINFO = {
      title: this.actionName.toUpperCase() + ' ' + this.singularName.toUpperCase(),
      message: '¿Está seguro de que quiere ' + this.actionName + ' el ' + this.singularName + ' ' + this.formGroup.get('names')?.value + ' ?',
      cancelText: 'CANCELAR',
      confirmText: this.actionName.toUpperCase()
    }
    this.confirmDialog.open(DIALOGINFO)
    this.sendForm()
  }

  sendForm () {
    let ticketId = this.activatedRoute.snapshot.paramMap.get('id');
    this.confirmDialog.confirmed().subscribe(
      confirmed => {
        if (confirmed) {
          this.generateQRCode();
          let formData = this.fillForm();
          this.ticketAPI.put(Number(ticketId), formData).subscribe ({
            next : (res) => {
              this.snackBar.mensaje(this.singularName + ' Actualizado Exitosamente')
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
    let user_modifier = localStorage.getItem('user_id');
    let formData : FormData = new FormData();
    formData.append('invoice_number', this.formGroup.get('invoice_number')?.value);
    formData.append('state', this.formGroup.get('state')?.value);
    formData.append('client', this.formGroup.get('client')?.value);
    formData.append('game', this.formGroup.get('game')?.value);
    formData.append('user_modifier', user_modifier!);
    formData.append('qr_code_digits', this.qr_code_digits);
    formData.append('qr_code_url', this.qr_code_url);
    return formData;
  }

  ngOnInit(): void {
    let ticketId = this.activatedRoute.snapshot.paramMap.get('id');
  
    this.ticketAPI.getById(Number(ticketId)).subscribe(
      (data : Ticket) => {
        this.currentTicket = data;
        this.getInfo();
      }
    )
  }

  getInfo() {

   this.formGroup.patchValue({
      qr_code_digits : this.currentTicket.qr_code_digits,
      qr_code_url : this.currentTicket.qr_code_url,
      invoice_number : this.currentTicket.invoice_number,
      state : this.currentTicket.state,
    })
  }

  generateQRCode() {
    this.invoiceNumber = this.formGroup.get('invoice_number')?.value;
    this.clientID = this.formGroup.get('client')?.value;
    this.qr_code_url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${this.invoiceNumber + '-' + this.clientID}`;
    this.qr_code_digits = (Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000).toString(10);
  }
}

