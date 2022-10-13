import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../servicios/usuarios/api.service';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/interfaces/roles/roles';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
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
