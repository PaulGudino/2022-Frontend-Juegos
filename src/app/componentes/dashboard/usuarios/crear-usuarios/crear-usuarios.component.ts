import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../servicios/usuarios/api.service';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/interfaces/roles/roles';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { UsuariosCrear } from 'src/app/interfaces/usuarios/usuariocrear';
import { MensajesErrorComponent } from '../../mensajes-error/mensajes-error.component';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  roles: Roles[] = [];
  mensaje_error_lista: string[]=[];
  form: FormGroup;
  ocultar = true;
  constructor(
    private api: ApiService, 
    private router: Router, 
    private fb: FormBuilder, 
    public dialog: MatDialog,
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
        const usuario: UsuariosCrear = {
          cedula: this.form.value.cedula,
          username: this.form.value.username,
          names: this.form.value.names,
          surnames: this.form.value.surnames,
          email: this.form.value.email,
          password: this.form.value.password,
          phone: this.form.value.phone,
          sex: this.form.value.sex,
          address: this.form.value.address,
          rol: this.form.value.rol,
        }
        this.api.postUsuarios(usuario).subscribe({
          next: (res) => {
            this.snackBar.mensaje('Usuario Creado Exitosamente')
            this.regresarUsuarios();
          },
          error: (res)=>{
            for(let message in res.error){
              this.mensaje_error_lista.push(res.error[message][0])
            }
            this.mensajes_errores(this.mensaje_error_lista)
            this.mensaje_error_lista=[]
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


  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }
}
