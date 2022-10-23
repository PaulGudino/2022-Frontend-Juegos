import { getAwardList } from './../../../interfaces/awards/getAwardList';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { lastValueFrom } from 'rxjs';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  Titulo = "Premios";
  displayedColumns: string[] = ['id', 'name', 'description','initial_stock','current_stock','created','juego', 'is_active', 'Acciones']
  dataSource !: MatTableDataSource<getAwardList>;
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
    this.router.navigate(['/dashboard/premios/editar/'+id]);
  }
  async eliminarPremios(id: number){
    await this.Permisoeliminar();
    if (this.permisos.length > 0) {
      const options = {
        title: 'ELIMINAR PREMIO',
        message: 'ESTA SEGURO QUE QUIERE ELIMINAR EL PREMIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.premiosSrv.deleteAward(id).subscribe((data) => {
            this.snackbar.mensaje("Premio Eliminado Existosamente");
            this.cargarPremios();
          });
        }
      });
    } else {
      this.snackbar.mensaje('No tienes permisos para Eliminar Premios');
    }
  }

  async Permisoeliminar(){
    let rol_id = Number(localStorage.getItem('rol_id'));
    let permiso_id = 8;
    const promesa =  await lastValueFrom(this.permisos_api.getPermisosbyRolandPermission(rol_id, permiso_id));
    this.permisos = promesa;
  }
}
