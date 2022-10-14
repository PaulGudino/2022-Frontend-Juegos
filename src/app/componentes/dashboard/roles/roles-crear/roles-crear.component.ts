import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { RolesService } from 'src/app/servicios/roles/roles.service';

@Component({
  selector: 'app-roles-crear',
  templateUrl: './roles-crear.component.html',
  styleUrls: ['./roles-crear.component.css']
})
export class RolesCrearComponent implements OnInit {

  form: FormGroup

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
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
            this.dialogService.error(err.error);
          }
        )
      });
    }else{
      this.snackbar.mensaje('Llene el formulario correctamente');
    }
  }

}
