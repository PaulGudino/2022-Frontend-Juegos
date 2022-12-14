import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { GameService } from 'src/app/servicios/game/game.service';
import { ClientService } from 'src/app/servicios/client/client.service';
import { Client } from 'src/app/interfaces/client/Client';
import { Game } from 'src/app/interfaces/game/Game';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { map, Observable, startWith } from 'rxjs';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}
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
  filteredOptions!: Observable<Client[]>;
  allClients : Client[] = [];
  allGames : Game[] = [];

  invoiceNumber : string = '';
  qr_code_digits : string = '';
  clientId : string = '';
  gameTragamonendas: string = '1';

  Ticket_data: string = ''
  CanPrint = false

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    // Dialog and snackBar services
    private snackBar : SnackbarService,
    private confirmDialog : ConfirmDialogService,
    private ticketAPI : TicketService,
    private ClientAPI : ClientService,
    private GameAPI : GameService,
    private staticData : PuenteDatosService
  ) {
    // Building the form with the formBuilder

    // id refers to cedula

    this.formGroup = this.formBuilder.group({
      qr_code_digits : [''],
      invoice_number : ['', Validators.required],
      client : new FormControl('', [Validators.required, autocompleteObjectValidator()]),
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
        this.filteredOptions = this.formGroup.controls['client'].valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.name;
            return name ? this._filter(name as string) : this.allClients.slice();
          }),
        );
      }
    );
  }
  private _filter(name: string): Client[] {
    if (name === '') {
      return this.allClients.slice();
    }
    const filterValue = name.toLowerCase();
    return this.allClients.filter(option => option.client.toLowerCase().includes(filterValue));
  }

  displayFn(client: Client): string | undefined {
    // Muetsra el valor que se asigne en el input
    const valueshow = client.client
    return client && client.client ? valueshow : undefined;
  }

  public validation_msgs = {
    'contactAutocompleteControl': [
      { type: 'invalidAutocompleteObject', message: 'Seleccione una opción del listado !!!' },
    ]
  }

  toList() {
    this.router.navigate(['dashboard/tickets']);
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
    console.log(this.formGroup.value)
    this.confirmDialog.confirmed().subscribe(
      confirmed => {
        if (confirmed) {
          this.generateQRCode();
          let formData = this.fillForm();
          this.ticketAPI.post(formData).subscribe ({
            next : (res) => {
              this.formGroup.get('client')?.disable()
              this.formGroup.get('invoice_number')?.disable()
              this.formGroup.get('game')?.disable()
              this.snackBar.mensaje(this.singularName + ' Creado Exitosamente');
              this.CanPrint = true;
              // this.toList();
            },
            error : (res) => {
              this.confirmDialog.error(res.error);
              this.Ticket_data = 'Ticket de Prueba';
              this.qr_code_digits = ''
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
    formData.append('client', this.formGroup.get('client')?.value.id);
    formData.append('game', this.formGroup.get('game')?.value);
    formData.append('user_register', user_register!);
    formData.append('qr_code_digits', this.qr_code_digits);
    console.log(formData)
    return formData;
  }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
  }

  generateQRCode() {

    let check_qr_code_digits = this.qr_code_digits == ''

    if (!check_qr_code_digits) {
      return;
    }
    
    this.invoiceNumber = this.formGroup.get('invoice_number')?.value;
    this.clientId = this.formGroup.get('client')?.value.id;

    
    let exist_code : any[] = [];

    do{
      this.qr_code_digits = (Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000).toString(10);
      let search_code = '?state=Disponible&qr_code_digits='+this.qr_code_digits
      this.ticketAPI.getFilter(search_code).subscribe({
        next : (res) => {
          exist_code = res
        },
      });
    }
    while(exist_code.length > 0);
    
    this.Ticket_data = this.gameTragamonendas+'|'+this.invoiceNumber+'|'+this.clientId+'|'+this.qr_code_digits
  }

  newForm(){
    window.location.reload();
  }
  print(){
    alert('imprimiendo')
  }

}
