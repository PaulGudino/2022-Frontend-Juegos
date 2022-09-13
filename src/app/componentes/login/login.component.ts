import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router
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
    if(username == 'admin' && password == 'admin'){
      this.fakeloadin();
    } else {
      this.error();
      this.form.reset();
    }
  }

  error(){
    this.snackBar.open('Usuario o contraseña ingresado son incorrectos', '', {
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
  
}

