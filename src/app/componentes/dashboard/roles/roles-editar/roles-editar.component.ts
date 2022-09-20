import { RolesConfirmarEditarComponent } from './../roles-confirmar-editar/roles-confirmar-editar.component';
import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { RolesService } from './../../../../servicios/roles/roles.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/interfaces/roles/roles';

@Component({
  selector: 'app-roles-editar',
  templateUrl: './roles-editar.component.html',
  styleUrls: ['./roles-editar.component.css']
})
export class RolesEditarComponent implements OnInit {

  form: FormGroup;
  editar_rol: Roles ={
    id: 0,
    name: '',
    description: '',
    is_active: true,
  }
  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private rol: RolesService,
    private activerouter: ActivatedRoute, 
    private snackbar: SnackbarService,
    public dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      is_active: ['', Validators.required],
  })
   }

  ngOnInit(): void {
    let editar_rol = this.activerouter.snapshot.paramMap.get('id');
    this.rol.getRolbyId(Number(editar_rol)).subscribe(res =>{
      this.editar_rol = res;
      this.form.controls['name'].setValue(this.editar_rol.name);  
      this.form.controls['description'].setValue(this.editar_rol.description);
      this.form.controls['is_active'].setValue(this.editar_rol.is_active.toString());
    })
  }
  regresarRoles(){
    this.router.navigate(['/dashboard/roles']);
  }
  editarRol(){
    let id_rol = this.activerouter.snapshot.paramMap.get('id');
    const rol: Roles = {
      id: Number(id_rol),
      name: this.form.value.name,
      description: this.form.value.description,
      is_active: this.form.value.is_active,
    }
    if(this.form.valid){
      const dialogref = this.dialog.open(RolesConfirmarEditarComponent,{
        width:'50%',
        data: rol
      });
      dialogref.afterClosed().subscribe(res =>{
        console.log(res)
      })
    }else{
      this.snackbar.mensaje('Llene el formulario correctamente');
    }
  }
}
