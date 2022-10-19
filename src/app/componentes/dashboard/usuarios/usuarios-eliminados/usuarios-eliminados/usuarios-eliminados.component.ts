import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Usuarios } from 'src/app/interfaces/usuarios/usuarios';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ApiService } from 'src/app/servicios/usuarios/api.service';

@Component({
  selector: 'app-usuarios-eliminados',
  templateUrl: './usuarios-eliminados.component.html',
  styleUrls: ['./usuarios-eliminados.component.css']
})
export class UsuariosEliminadosComponent implements OnInit {

  displayedColumns: string[] = ['cedula', 'names', 'surnames', 'email', 'phone', 'sex', 'rol', 'Acciones']
  dataSource !: MatTableDataSource<Usuarios>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  permisos:any = [];

  constructor(
    private api: ApiService, 
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private permisos_api: PermisosService,
  ) {
   }

  ngOnInit(): void {
    this.cargarUsuarios()
  }
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cargarUsuarios(){
    this.api.getUsuariosEliminados().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  async restaurarUsuario(id:number){
    await this.Permisoeliminar();
    if(this.permisos.length > 0){
      const options = {
        title: 'ACTIVAR USUARIO',
        message: 'ESTA SEGURO QUE QUIERE ACTIVAR EL USUARIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.api.postCambiarisActivate(id).subscribe((data) => {
            this.snackbar.mensaje("Usuario activado correctamente");
            this.cargarUsuarios();
          });
        }
      });
    }else{
      this.snackbar.mensaje('No tienes permisos suficientes para realizar esta acción');
    }
    
  }
  regresar(){
    this.router.navigate(['/dashboard/usuarios']);
  }
  async Permisoeliminar(){
    let rol_id = Number(localStorage.getItem('rol_id'));
    let permiso_id = 9;
    const promesa =  await lastValueFrom(this.permisos_api.getPermisosbyRolandPermission(rol_id, permiso_id));
    this.permisos = promesa;
  }
}
