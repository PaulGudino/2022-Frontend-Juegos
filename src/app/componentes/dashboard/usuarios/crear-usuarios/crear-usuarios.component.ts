import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../servicios/api.service';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/interfaces/roles';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionCrearComponent } from '../confirmacion-crear/confirmacion-crear.component';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  roles: Roles[] = [];
  form: FormGroup
  constructor(private api: ApiService, private router: Router, private fb: FormBuilder, public dialog: MatDialog) { 
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
      is_active: ['', Validators.required],
  })
  }

  ngOnInit(): void {
    this.cargarRoles();
  }

  crearUsuario():void{
    if(this.form.valid){
      const dialogref = this.dialog.open(ConfirmacionCrearComponent,{
        width:'350px',
        data: this.form
      });
      dialogref.afterClosed().subscribe(res =>{
        console.log(res)
      })
    }else{
      alert('Formulario invalido');
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
