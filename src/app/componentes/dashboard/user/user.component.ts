import { PuenteDatosService } from './../../../servicios/comunicacio_componentes/puente-datos.service';
import { ApiService } from '../../../servicios/user/user.service';
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
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UsuariosComponent implements OnInit {

  Filters = [
    {id: '?rol=&is_active=true', name: 'Usuarios Activos'},
    {id: '?rol=&is_active=false', name: 'Usuarios Inactivos'},
    {id: '?ordering=-created', name: 'Ultimos Usuarios Creados'},
    {id: '?ordering=created', name: 'Primeros Usuarios Creados'},
  ]

  filter_default = '?ordering=-created';

  Titulo = 'Usuarios';
  displayedColumns: string[] = ['cedula', 'names', 'surnames', 'email', 'phone', 'sex', 'rol', 'Acciones']
  dataSource !: MatTableDataSource<Usuarios>;
  user_id = Number(sessionStorage.getItem('user_id'));

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private api: ApiService, 
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private staticData: PuenteDatosService

    ) { }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    this.cargarUsuarios(this.filter_default);
  }

  cargarUsuarios(filter: string){
    this.api.getUsuarios(filter).subscribe((data) => {
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
    if(sessionStorage.getItem('rol_id') == '1'){
      const options = {
        title: 'ELIMINAR USUARIO',
        message: 'ESTA SEGURO QUE DESEA ELIMINAR EL USUARIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if(confirmed){
          this.api.deleteUsuario(id).subscribe(
            res => {
            this.snackbar.mensaje('Usuario Eliminado Exitosamente');
            this.cargarUsuarios(this.filter_default);
          },
          err => {
            this.dialogService.error(err.error)
            this.cargarUsuarios(this.filter_default);
          }
          );
        }
      });
    }else{
      this.snackbar.mensaje('No tienes permiso para Eliminar Usuarios');
    }
    
  }
  filter(filter: string){
    this.cargarUsuarios(filter);
  }
}
