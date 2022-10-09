import { ConfirmacionEliminarComponent } from './confirmacion-eliminar/confirmacion-eliminar.component';
import { ApiService } from '../../../servicios/usuarios/api.service';
import { Usuarios } from '../../../interfaces/usuarios/usuarios';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  Titulo = 'Usuarios';
  displayedColumns: string[] = ['cedula', 'names', 'surnames', 'email', 'phone', 'sex', 'rol', 'Acciones']
  dataSource !: MatTableDataSource<Usuarios>;
  user_id = Number(localStorage.getItem('user_id'));
  permisos:any = [];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private api: ApiService, 
    private router: Router,
    public dialog: MatDialog,
    private permisos_api: PermisosService,
    private snackbar: SnackbarService

    ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.api.getUsuarios().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  editarUsuario(id:number){
    this.router.navigate(['dashboard/usuarios/editar', id]);
  }

  agregarUsuario(){
    this.router.navigate(['dashboard/usuarios/crear']);
  }

  visualizarUsuario(id:number){
    this.router.navigate(['dashboard/usuarios/visualizar', id]);
  }

  async eliminarUsuario(id:number){
    await this.Permisoeliminar();
    if(this.permisos.length > 0){
      const dialogref = this.dialog.open(ConfirmacionEliminarComponent,{
        width:'50%',
        data: id
      });
      dialogref.afterClosed().subscribe(res =>{
        console.log(res)
        this.cargarUsuarios();
      })
    }else{
      this.snackbar.mensaje('No tiene permisos para eliminar usuarios');
    }
  }
  async Permisoeliminar(){
    let rol_id = Number(localStorage.getItem('rol_id'));
    let permiso_id = 4;
    const promesa =  await lastValueFrom(this.permisos_api.getPermisosbyRolandPermission(rol_id, permiso_id));
    this.permisos = promesa;
  }
  usuariosEliminados(){
    this.router.navigate(['dashboard/usuarios/eliminados']);
  }
}
