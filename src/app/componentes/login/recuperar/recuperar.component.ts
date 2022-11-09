import { SnackbarService } from './../../../servicios/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { MensajesErrorComponent } from '../../dashboard/mensajes-error/mensajes-error.component';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  form: FormGroup;
  mensaje_error_lista: string[]=[];

  constructor(
    private fb: FormBuilder, 
    private snackBar: SnackbarService,
    private router: Router,
    private auth: AuthService,
    public dialog: MatDialog,
  ) { 
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  
  }

  ngOnInit(): void {
  }
  recuperar(){
    const email = this.form.value.email;
    this.auth.OlvideContraseña({email}).subscribe(
      (res: any) => {
        this.snackBar.mensaje('Se ha enviado un correo a su cuenta de correo electrónico');
        this.router.navigate(['reset-contraseña']);
      }, err => {
        console.log(err.error);
        for(let message in err.error){
          this.mensaje_error_lista.push(err.error[message])
        }
        this.mensajes_errores(this.mensaje_error_lista)
        this.mensaje_error_lista=[]
        this.form.reset();
      });
  }
  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }
  cancel(){
    this.router.navigate(['login']);
  }
}
