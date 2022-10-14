import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../servicios/usuarios/api.service';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/interfaces/roles/roles';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  roles: Roles[] = [];
  form: FormGroup;
  ocultar = true;
  constructor(
    private api: ApiService, 
    private router: Router, 
    private fb: FormBuilder, 
    private snackBar: SnackbarService,
    private dialogService: ConfirmDialogService
    ) { 
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      username: ['', Validators.required],
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      email : new FormControl('', [Validators.required, Validators.email]),
      password: ['', Validators.required],
      phone: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      rol: ['', Validators.required],
  })
  }

  ngOnInit(): void {
    this.cargarRoles();
  }

  crearUsuario():void{
    if(this.form.valid){
      const options = {
        title: 'CREAR USUARIO',
        message: 'ESTA SEGURO QUE QUIERE CREAR EL USUARIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        let formData: FormData = new FormData();
        formData.append('cedula', this.form.get('cedula')?.value);
        formData.append('username', this.form.get('username')?.value);
        formData.append('names', this.form.get('names')?.value);
        formData.append('surnames', this.form.get('surnames')?.value);
        formData.append('email', this.form.get('email')?.value);
        formData.append('password', this.form.get('password')?.value);
        formData.append('phone', this.form.get('phone')?.value);
        formData.append('sex', this.form.get('sex')?.value);
        formData.append('rol', this.form.get('rol')?.value);
        formData.append('address', this.form.get('address')?.value);
        this.api.postUsuarios(formData).subscribe({
          next: (res) => {
            this.snackBar.mensaje('Usuario Creado Exitosamente')
            this.regresarUsuarios();
          },
          error: (res)=>{
            this.dialogService.error(res.error);
          }
        })
      });
    }else{
      this.snackBar.mensaje('Llene el formulario correctamente')
    }
  }

  cargarRoles(){
    this.api.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }
  regresarUsuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }

}
