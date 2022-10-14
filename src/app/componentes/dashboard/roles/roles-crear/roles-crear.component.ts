import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/usuarios/api.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { RolesService } from 'src/app/servicios/roles/roles.service';
import { MensajesErrorComponent } from '../../mensajes-error/mensajes-error.component';

@Component({
  selector: 'app-roles-crear',
  templateUrl: './roles-crear.component.html',
  styleUrls: ['./roles-crear.component.css']
})
export class RolesCrearComponent implements OnInit {

  form: FormGroup
  mensaje_error_lista: string[] = [];

  constructor(
    private api: ApiService, 
    private router: Router, 
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private rolSrv: RolesService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      is_active: ['', Validators.required],
  })
  }

  ngOnInit(): void {
  }
  regresarRoles(){
    this.router.navigate(['/dashboard/roles']);
  }
  
  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }

  crearRol(){
    if(this.form.valid){
      const options = {
        title: 'CREAR ROLES',
        message: 'ESTA SEGURO QUE QUIERE ELIMINA EL USUARIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        let formData: FormData = new FormData();
        formData.append('name', this.form.get('name')?.value);
        formData.append('description', this.form.get('description')?.value);
        formData.append('is_active', this.form.get('is_active')?.value);
        this.rolSrv.postRoles(formData).subscribe(
          (res) => {
            this.snackbar.mensaje('Rol Creado Exitosamente');
            this.regresarRoles();
          },
          (err) => {
            for(let message in err.error){
              this.mensaje_error_lista.push(err.error[message][0])
            }
            this.mensajes_errores(this.mensaje_error_lista)
            this.mensaje_error_lista=[]
          }
        )
      });
    }else{
      this.snackbar.mensaje('Llene el formulario correctamente');
    }
  }

}
