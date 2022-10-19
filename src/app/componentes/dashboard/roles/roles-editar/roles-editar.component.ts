import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { RolesService } from './../../../../servicios/roles/roles.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/interfaces/roles/roles';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';

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
    private dialogService: ConfirmDialogService
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
    if(this.form.valid){
      const options = {
        title: 'EDITAR ROLES',
        message: 'ESTA SEGURO QUE QUIERE EDITAR EL ROL?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          let formData: FormData = new FormData();
          formData.append('name', this.form.get('name')?.value);
          formData.append('description', this.form.get('description')?.value);
          formData.append('is_active', this.form.get('is_active')?.value);
          this.rol.putRol(Number(id_rol), formData).subscribe(
            res => {
              this.snackbar.mensaje('Rol Actualizado Exitosamente');
              this.router.navigate(['/dashboard/roles']);
            },
            err => {
              this.dialogService.error(err.error);
            }
          )
        }
      });
    }
  }
}
