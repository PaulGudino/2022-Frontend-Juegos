import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ClientService } from 'src/app/servicios/client/client.service';
import { Client } from 'src/app/interfaces/client/Client';


@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  singularName : string = 'cliente';
  pluralName : string = 'clientes';
  actionName : string = 'visualizar';
  client : Client = {
    id : '',
    cedula : '',
    names : '',
    surnames : '',
    email : '',
    phone : '',
    sex : '',
    address : '',
    state : '',
    user_client_register : '',
    user_client_modify : '',
    created : '',
    modified : '',
  };

  constructor(
    private router : Router,
    private activedRoute : ActivatedRoute,
    private clientAPI : ClientService,
  ) {}

  toList() {
    this.router.navigate(['dashboard/' + this.pluralName]);
  }

  ngOnInit(): void {
    let clientId = this.activedRoute.snapshot.paramMap.get('id');
    this.clientAPI.getById(Number(clientId)).subscribe((data) => {
      this.client = data;
    })
  }
}

