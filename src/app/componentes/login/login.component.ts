
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptores/auth.interceptor';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { MensajesErrorComponent } from '../dashboard/mensajes-error/mensajes-error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ocultar = true;
  loading = false;
  
  form: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService,
    private puente: PuenteDatosService,
    public dialog: MatDialog,
    ){ 

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  ingresar(){
    const username = this.form.value.username;
    const password = this.form.value.password;
    this.auth.Login({username, password}).subscribe(
      (res: any) => {
        AuthInterceptor.accessToken = res.token;     
        // this.puente.setuser_id(res.user.id);
        localStorage.setItem('user_id', res.user.id);
        localStorage.setItem('rol_id', res.rol);
        localStorage.setItem('token', res.token);
        // this.puente.setuser_permisos(res.permisos);
        this.fakeloadin();
      }, res => {
        console.log(res);
        this.error();
        this.form.reset();
      }
    );
  }

  error(){
    this.snackBar.open('Usuario o contraseña ingresados son incorrectos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeloadin(){
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 500);
  }
  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }
}

