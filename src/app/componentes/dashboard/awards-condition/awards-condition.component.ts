import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-awards-condition',
  templateUrl: './awards-condition.component.html',
  styleUrls: ['./awards-condition.component.css']
})
export class AwardsConditionComponent implements OnInit {

  Filters = [
    {id: '?is_active=true', name: 'Premios Condicionados Activos'},
    {id: '?is_active=false', name: 'Premios Condicionados Inactivos'},
    {id: '?ordering=start_date', name: 'Primeros Premios En Iniciar'},
    {id: '?ordering=end_date', name: 'Primeros Premios En Terminar'},
  ]

  filter_default = '?is_active=true'

  Titulo = "Premios Condicionados";
  displayedColumns: string[] = ['id', 'award', 'game','amount','start_date','end_date', 'is_active', 'Acciones']
  dataSource !: MatTableDataSource<any>;
  permisos:any = [];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private premiosSrv: AwardsService,
    private dialogService: ConfirmDialogService,
    private permisos_api: PermisosService,
    private premiosCondicionSrv: AwardsConditionService
  ) { }

  ngOnInit(): void {
    this.cargarPremios(this.filter_default);
  }
  cargarPremios(filter:string){
    this.premiosCondicionSrv.getAwardConditionFilter(filter).subscribe((data:any) => {
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
  filter(filter: string){
    this.cargarPremios(filter);
  }
  agregarPremios(){
    this.router.navigate(['dashboard/premios/condicion/crear']);
  }
  verPremios(id: number){
    alert("Ver Premios");
  }
  editarPremios(id: number){
    alert("Editar Premios");
  }
  eliminarPremios(id: number){
    alert("Eliminar Premios");
  }
}
