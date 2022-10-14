import { Roles } from 'src/app/interfaces/roles/roles';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/usuarios/api.service';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { lastValueFrom } from 'rxjs';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { RolesService } from 'src/app/servicios/roles/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  Titulo = 'Roles';
  displayedColumns: string[] = ['id', 'name', 'description', 'is_active', 'Acciones']
  dataSource !: MatTableDataSource<Roles>;
  permisos:any = [];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private api: ApiService, 
    private router: Router,
    public dialog: MatDialog,
    private permisos_api: PermisosService,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private rolSrv: RolesService

  ) { }

  ngOnInit(): void {
    this.cargarRoles();
  }
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cargarRoles(){
    this.api.getRoles().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  editarRol(id:number){
    this.router.navigate(['dashboard/roles/editar', id]);
  }
  agregarRol(){
    this.router.navigate(['dashboard/roles/crear']);
  }
  permisosRol(id:number){
    this.router.navigate(['dashboard/roles/permisos', id]);
  }
  async eliminarRol(id:number){
    await this.Permisoeliminar();
    if(this.permisos.length > 0){
      const options = {
        title: 'ELIMINAR ROL',
        message: 'ESTA SEGURO QUE QUIERE ELIMINAR EL ROL?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        this.rolSrv.deleteRol(id).subscribe(
          (data) => {
          this.snackbar.mensaje('Rol Eliminado Exitosamente');
          this.cargarRoles();
        }
        , (error) => {
          console.log(error);
        }
        );
      });
    }else{
      this.snackbar.mensaje('No tiene permisos para eliminar roles');
    }
  }
  async Permisoeliminar(){
    let rol_id = Number(localStorage.getItem('rol_id'));
    let permiso_id = 8;
    const promesa =  await lastValueFrom(this.permisos_api.getPermisosbyRolandPermission(rol_id, permiso_id));
    this.permisos = promesa;
  }
}
