import { Roles } from 'src/app/interfaces/roles/roles';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/user/user.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { RolesService } from 'src/app/servicios/roles/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  Titulo = 'Roles';
  displayedColumns: string[] = ['id', 'name', 'description','created', 'is_active', 'Acciones']
  dataSource !: MatTableDataSource<Roles>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private api: ApiService, 
    private router: Router,
    public dialog: MatDialog,
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
    if(localStorage.getItem('rol_id') == '1'){
      const options = {
        title: 'ELIMINAR ROL',
        message: 'ESTA SEGURO QUE QUIERE ELIMINAR EL ROL?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.rolSrv.deleteRol(id).subscribe(
            (data) => {
            this.snackbar.mensaje('Rol Eliminado Exitosamente');
            this.cargarRoles();
          }
          , (error) => {
            this.dialogService.error(error.error);
            this.cargarRoles();
          }
          );
        }
      });
    }else{
      this.snackbar.mensaje('No tienes permiso para Eliminar Roles');
    }
  }
}
