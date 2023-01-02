import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { RolesService } from './../../../../servicios/roles/roles.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permisos } from 'src/app/interfaces/permisos/permisos';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-permisos-roles',
  templateUrl: './permisos-roles.component.html',
  styleUrls: ['./permisos-roles.component.css']
})
export class PermisosRolesComponent implements OnInit {

  Lista_permisos: Permisos [] = [];
  Permisos_eliminar : string[] = []
  

  form : FormGroup;
  rol : string = '';
  constructor(
    private fb: FormBuilder,
    private permisoSrv: PermisosService,
    private activerouter: ActivatedRoute, 
    private router: Router,
    private roles_service: RolesService,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private statickData: PuenteDatosService
    ) {
      this.form = this.fb.group({
        ckeckArray: this.fb.array([])
      });
    }

  async ngOnInit(): Promise<void> {
    this.statickData.setMenuGeneral();
    let rolid = Number(this.activerouter.snapshot.paramMap.get('id'));
    this.roles_service.getRolbyId(rolid).subscribe(
      (data) => {
        this.rol = data.name;
    });
    this.cargarPermisos();
    await this.obtenerPermisosbyrol(rolid);
  }


  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('ckeckArray') as FormArray;
    if(e.target.checked){
      checkArray.push(new FormControl(e.target.value));
    }else{
      var i = 0;
      checkArray.controls.forEach((item: any) => {
        if(item.value == e.target.value){
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  cargarPermisos(){
    this.permisoSrv.getPermisos().subscribe((data) => {
      this.Lista_permisos = data;
    });
  }

  async obtenerPermisosbyrol(id:number){
    this.permisoSrv.getPermisosbyRol(id).subscribe(
      (data) => {
        const checkArray: FormArray = this.form.get('ckeckArray') as FormArray;
        for (let i = 0; i < data.length; i++) {
          this.cambiarcheckbox(data[i].permission.toString());
          checkArray.push(new FormControl(data[i].id_permission.toString()));
          this.Permisos_eliminar.push(data[i].id.toString());
        }
    },
    (error) => {
        console.log('No se pudo obtener los permisos');
    });
  }

  cambiarcheckbox(id:string){
    const checkbox = document.getElementById(
      id,
    ) as HTMLInputElement | null;
    if (checkbox != null) {
      checkbox.checked = true;
    }
  }
  regresarRoles(){
    this.router.navigate(['/dashboard/roles']);
  }
  guardarPermisos(){
    const options = {
      title: 'GUARDAR PERMISOS',
      message: 'ESTA SEGURO QUE QUIERE CAMBIAR LOS PERMISOS DEL ROL?',
      cancelText: 'CANCELAR',
      confirmText: 'CONFIRMAR'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.guardarPermisosNuevos();
      }
    });
  }

  eliminarPermisosViejos(){
    let permisoseliminar = this.Permisos_eliminar;
    if(permisoseliminar.length > 0){
      for( let i = 0; i < permisoseliminar.length; i++){
        this.permisoSrv.deletePermissionRol(Number(permisoseliminar[i])).subscribe(
          (data) => {

          });
      }
    }
  }

  guardarPermisosNuevos(){
    this.eliminarPermisosViejos();
    let permisosnuevos = this.form.value.ckeckArray;
    let rol_id = Number(this.activerouter.snapshot.paramMap.get('id'));
    if(permisosnuevos.length > 0){
      for( let i = 0; i < permisosnuevos.length; i++){   
        let p = Number(permisosnuevos[i]);
        this.permisoSrv.postPermisosbyRol({rol: rol_id, permission: p}).subscribe(
          (data) => {
          });
      }
      this.snackbar.mensaje('Permisos actualizados correctamente');
      this.router.navigate(['/dashboard/roles']);
    }else{
      this.snackbar.mensaje('Este rol no tiene permisos');
      this.router.navigate(['/dashboard/roles']);
    }
  }


}
