import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../servicios/usuarios/api.service';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/interfaces/roles/roles';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionCrearComponent } from '../confirmacion-crear/confirmacion-crear.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) { 
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      username: ['', Validators.required],
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
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
      const dialogref = this.dialog.open(ConfirmacionCrearComponent,{
        width:'50%',
        data: this.form
      });
      dialogref.afterClosed().subscribe(res =>{
        console.log(res)
      })
    }else{
      this.error();
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

  error(){
    this.snackBar.open('Llene el formulario correctamente', '', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }
}
