import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajesErrorComponent } from 'src/app/componentes/dashboard/mensajes-error/mensajes-error.component';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  form: FormGroup;
  mensaje_error_lista: string[]=[];
  ocultar = true;
  constructor(
    private fb: FormBuilder, 
    private snackBar: SnackbarService,
    private router: Router,
    private auth: AuthService,
    public dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      code : ['', Validators.required],
      password: ['', Validators.required],
    });
  
   }

  ngOnInit(): void {
  }

  resetear(){
    const email = this.form.value.email;
    const code = this.form.value.code;
    const password = this.form.value.password;
    this.auth.RecuperarContraseña({email, code, password}).subscribe(
      (res: any) => {
        this.snackBar.mensaje('Se ha cambiado la contraseña');
        this.router.navigate(['login']);
      }
      , err => {
        console.log(err.error)
        for(let message in err.error){
          this.mensaje_error_lista.push(err.error[message])
        }
        this.mensajes_errores(this.mensaje_error_lista)
        this.mensaje_error_lista=[]
        this.form.reset();
      }
    );

  }
  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }
}
