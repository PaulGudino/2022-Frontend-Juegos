import { ApiService } from 'src/app/servicios/usuarios/api.service';
import { getAwardList } from './../../../interfaces/awards/getAwardList';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AwardsService } from 'src/app/servicios/awards/awards.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  Titulo = "Premios";
  displayedColumns: string[] = ['id', 'name', 'description','initial_stock','current_stock','prizes_awarded','juego', 'is_active', 'Acciones']
  dataSource !: MatTableDataSource<getAwardList>;
  permisos:any = [];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private premiosSrv: AwardsService,
  ) { }

  ngOnInit(): void {
    this.cargarPremios();
  }
  agregarPremios(){
    this.router.navigate(['/dashboard/premios/crear']);
  }
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cargarPremios(){
    this.premiosSrv.getAward().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  verPremios(id: number){
    this.router.navigate(['/dashboard/premios/visualizar/'+id]);
  }
  editarPremios(id: number){
    alert("Editar Premios");
  }
  eliminarPremios(id: number){
    alert("Eliminar Premios");
  }
}
