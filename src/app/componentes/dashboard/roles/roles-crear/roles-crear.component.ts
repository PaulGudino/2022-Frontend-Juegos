import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { RolesConfirmarCrearComponent } from './../roles-confirmar-crear/roles-confirmar-crear.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/usuarios/api.service';

@Component({
  selector: 'app-roles-crear',
  templateUrl: './roles-crear.component.html',
  styleUrls: ['./roles-crear.component.css']
})
export class RolesCrearComponent implements OnInit {

  form: FormGroup
  constructor(
    private api: ApiService, 
    private router: Router, 
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private snackbar: SnackbarService,
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      is_active: ['', Validators.required],
  })
  }

  ngOnInit(): void {
  }
  regresarRoles(){
    this.router.navigate(['/dashboard/roles']);
  }
  crearRol(){
    if(this.form.valid){
      const dialogref = this.dialog.open(RolesConfirmarCrearComponent,{
        width:'50%',
        data: this.form
      });
      dialogref.afterClosed().subscribe(res =>{
        console.log(res)
      })
    }else{
      this.snackbar.mensaje('Llene el formulario correctamente');
    } 
  }

}
