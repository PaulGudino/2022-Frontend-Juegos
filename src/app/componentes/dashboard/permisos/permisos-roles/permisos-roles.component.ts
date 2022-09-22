import { RolesService } from './../../../../servicios/roles/roles.service';
import { PermisosConfirmarComponent } from './../permisos-confirmar/permisos-confirmar.component';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Permisos } from 'src/app/interfaces/permisos/permisos';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';

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
    private permisos_api: PermisosService,
    private activerouter: ActivatedRoute, 
    private router: Router,
    public dialog: MatDialog,
    private roles_service: RolesService
    ) {
      this.form = this.fb.group({
        ckeckArray: this.fb.array([])
      });
    }

  ngOnInit(): void {
    let rolid = Number(this.activerouter.snapshot.paramMap.get('id'));
    this.roles_service.getRolbyId(rolid).subscribe(
      (data) => {
        this.rol = data.name;
    });
    this.cargarPermisos();
    this.obtenerPermisosbyrol(rolid);
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
    this.permisos_api.getPermisos().subscribe((data) => {
      this.Lista_permisos = data;
    });
  }

  obtenerPermisosbyrol(id:number){
    this.permisos_api.getPermisosbyRol(id).subscribe(
      (data) => {
        const checkArray: FormArray = this.form.get('ckeckArray') as FormArray;
        for (let i = 0; i < data.length; i++) {
          this.cambiarcheckbox(data[i].permission.toString());
          console.log('Permisos-roles',data[i].permission.toString())
          checkArray.push(new FormControl(data[i].permission.toString()));
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
    let rolid = Number(this.activerouter.snapshot.paramMap.get('id'));
    let permisos_nuevos = this.form.value.ckeckArray;
    let permisos_viejos = this.Permisos_eliminar;

    const dialogref = this.dialog.open(PermisosConfirmarComponent,{
      width:'50%',
      data: { rol: rolid, permission_viejos: permisos_viejos, permission_nuevos: permisos_nuevos }
    });
    dialogref.afterClosed().subscribe(res =>{
      console.log(res)
    })
  }
}
