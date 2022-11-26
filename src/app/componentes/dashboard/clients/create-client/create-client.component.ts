import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ClientService } from 'src/app/servicios/client/client.service';


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  singularName : string = 'cliente'
  pluralName : string = 'clientes'
  actionName : string = 'crear'
  formGroup : FormGroup;

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    // Dialog and snackBar services
    private snackBar : SnackbarService,
    private confirmDialog : ConfirmDialogService,
    private api : ClientService
  ) {
    // Building the form with the formBuilder

    // id refers to cedula

    this.formGroup = this.formBuilder.group({
      cedula : ['', Validators.required],
      names : ['', Validators.required],
      surnames : ['', Validators.required],
      email : new FormControl('', [Validators.required, Validators.email]),
      phone : ['', Validators.required],
      sex: ['', Validators.required],
      address : ['', Validators.required],
      state : ['', Validators.required]
    });
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
          this.api.post(formData).subscribe ({
            next : (res) => {
              this.snackBar.mensaje( this.singularName + ' creado exitosamente');
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
    let user_client_register = localStorage.getItem('user_id');
    let formData : FormData = new FormData();
    formData.append('cedula', this.formGroup.get('cedula')?.value);
    formData.append('names', this.formGroup.get('names')?.value);
    formData.append('surnames', this.formGroup.get('surnames')?.value);
    formData.append('email', this.formGroup.get('email')?.value);
    formData.append('phone', this.formGroup.get('phone')?.value);
    formData.append('address', this.formGroup.get('address')?.value);
    formData.append('sex', this.formGroup.get('sex')?.value);
    formData.append('state', this.formGroup.get('state')?.value);
    formData.append('user_client_register', user_client_register!);
    formData.append('user_client_modify', user_client_register!);
    return formData;
  }

  ngOnInit(): void {
  }

}

