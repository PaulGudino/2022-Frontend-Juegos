import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/interfaces/usuarios/usuarios';
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

  constructor(
    private api: ApiService, 
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService
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
  restaurarUsuario(id:number){
    this.api.postCambiarisActivate(id).subscribe((data) => {
      this.snackbar.mensaje("Usuario activado correctamente");
      window.location.reload();
    });
  }
  regresar(){
    this.router.navigate(['/dashboard/usuarios']);
  }
}
