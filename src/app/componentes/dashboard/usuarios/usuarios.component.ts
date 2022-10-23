import { ApiService } from '../../../servicios/usuarios/api.service';
import { Usuarios } from '../../../interfaces/usuarios/usuarios';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';

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

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private api: ApiService, 
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService

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

  eliminarUsuario(id:number){
    if(localStorage.getItem('rol_id') == '1'){
      const options = {
        title: 'ELIMINAR USUARIO',
        message: 'ESTA SEGURO QUE QUIERE ELIMINAR EL USUARIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if(confirmed){
          this.api.deleteUsuario(id).subscribe(
            res => {
            this.snackbar.mensaje('Usuario Eliminado Exitosamente');
            this.cargarUsuarios();
          },
          err => {
            this.dialogService.error(err.error)
            this.cargarUsuarios();
          }
          );
        }
      });
    }else{
      this.snackbar.mensaje('No tienes permiso para Eliminar Usuarios');
    }
    
  }
  usuariosEliminados(){
    this.router.navigate(['dashboard/usuarios/eliminados']);
  }
}
