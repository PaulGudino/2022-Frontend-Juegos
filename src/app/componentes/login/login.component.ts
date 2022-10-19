import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptores/auth.interceptor';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { MensajesErrorComponent } from '../dashboard/mensajes-error/mensajes-error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ocultar = true;
  
  form: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService,
    public dialog: MatDialog,
    ){ 

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    localStorage.clear();
  }

  ingresar(){
    console.log(this.ocultar);
    const username = this.form.value.username;
    const password = this.form.value.password;
    this.auth.Login({username, password}).subscribe(
      (res: any) => {
        console.log(res);
        AuthInterceptor.accessToken = res.token;     
        localStorage.setItem('user_id', res.user.id);
        localStorage.setItem('rol_id', res.rol);
        localStorage.setItem('token', res.token);
        localStorage.setItem('refresh', res.refresh);
        this.router.navigate(['/dashboard']);
      }, err => {
        console.log(err);
        this.error();
        this.form.reset();
        this.ocultar = true;
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

  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }
  RegisterKeyPress(input: string){
    const enter = document.getElementById(input);
    enter?.addEventListener('keyup', (event) => {
      if(event.key === 'Enter'){
        alert('Enter');
        this.ingresar();
      }
    });
  }
  enter(event: any){
    if(event.key === 'Enter'){
      this.ingresar();
    }
  }
}

