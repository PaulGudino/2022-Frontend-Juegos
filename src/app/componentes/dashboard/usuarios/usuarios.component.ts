import { ConfirmacionEliminarComponent } from './confirmacion-eliminar/confirmacion-eliminar.component';
import { ApiService } from './../../../servicios/api.service';
import { Usuarios } from './../../../interfaces/usuarios';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  Titulo = 'Usuarios';
  displayedColumns: string[] = ['ID', 'Nombres', 'Apellidos', 'Correo', 'Teléfono', 'Sexo', 'Rol', 'Estado', 'Acciones']
  dataSource !: MatTableDataSource<Usuarios>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private api: ApiService, 
    private router: Router,
    public dialog: MatDialog
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

  eliminarUsuario(id:number):void{
    const dialogref = this.dialog.open(ConfirmacionEliminarComponent,{
      width:'50%',
      data: id
    });
    dialogref.afterClosed().subscribe(res =>{
      console.log(res)
      this.cargarUsuarios();
    })
  }
}
