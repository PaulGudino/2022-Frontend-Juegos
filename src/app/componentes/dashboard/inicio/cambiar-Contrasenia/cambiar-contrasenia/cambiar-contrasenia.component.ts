import { ConfirmarCambiarContraseniaComponent } from './../../confirmar-cambiar-Contrasenia/confirmar-cambiar-contrasenia/confirmar-cambiar-contrasenia.component';
import { SnackbarService } from './../../../../../servicios/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/usuarios/api.service';
import { CambiarContraseña } from 'src/app/interfaces/usuarios/cambiarContraseña';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent implements OnInit {

  ocultar = true;
  ocultar2 = true;
  ocultar3 = true;

  form: FormGroup;
  cambiar_contraseña : CambiarContraseña = {
    old_password: '',
    new_password: '',
    confirm_password: ''
  }

  constructor(
    private api: ApiService, 
    private router: Router, 
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private snackBar: SnackbarService ,
  ) { 
    this.form = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  regresarInicio(){
    this.router.navigate(['/dashboard']);
  }
  cambiarContrasenia(){
    if(this.form.valid){
      this.cambiar_contraseña.old_password = this.form.get('old_password')?.value;
      this.cambiar_contraseña.new_password = this.form.get('new_password')?.value;
      this.cambiar_contraseña.confirm_password = this.form.get('confirm_password')?.value;

      const dialogref = this.dialog.open(ConfirmarCambiarContraseniaComponent,{
        width:'50%',
        data: this.cambiar_contraseña
      });
      dialogref.afterClosed().subscribe(res =>{
        console.log(res)
      })
    }else{
      this.snackBar.mensaje('Por favor, complete todos los campos');
    }
  }
}
