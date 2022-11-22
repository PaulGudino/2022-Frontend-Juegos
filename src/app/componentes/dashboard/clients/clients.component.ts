import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client/Client';
import { ClientService } from 'src/app/servicios/client/client.service';
import { lastValueFrom } from 'rxjs';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-clients',
  styleUrls: ['./clients.component.css'],
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit{

  Filters = [
    {id: '?state=Activo', name: 'Clientes Activos'},
    {id: '?state=Inactivo', name: 'Clientes Inactivos'},
    {id: '?ordering=-created', name: 'Ultimos Clientes Creados'},
    {id: '?ordering=created', name: 'Primeros Clientes Creados'},
  ]

  filter_default = '?ordering=-created'

  singularName : string = 'cliente';
  pluralName : string = 'clientes';
  actionName : string = 'eliminar';
  permissions : any = [];

  displayedColumns : string[] = [
    'cedula',
    'names',
    'surnames',
    'email',
    'state',
    'actions'
  ]
  dataSource !: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    // Atributes of the user component
    private router : Router,
    private clientAPI : ClientService,
    private permissionAPI : PermisosService,
    private confirmDialog : ConfirmDialogService,
    private snackBar : SnackbarService,
  ) {}

  ngOnInit() : void {
    this.loadAll(this.filter_default);
  }
  
  loadAll(filter:string) {
    this.clientAPI.getFilter(filter).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    
    if ( this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage();
    }
  }

  view(id : number) {
    this.router.navigate(['/dashboard/' + this.pluralName +  '/vizualizar/' + id]);
  }

  edit(id : number) {
    this.router.navigate(['/dashboard/' + this.pluralName + '/editar/' + id]);
  }

  async delete(id : number) {
    await this.canDelete();
    if (this.permissions.length > 0) {
      this.showDeleteDialog();
      this.confirmDialog.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.clientAPI.delete(id).subscribe(
            (data) => {
              this.snackBar.mensaje(this.singularName + ' eliminado exitosamente');
              this.loadAll(this.filter_default);
            }
          )
        }
      })
    }
    else {
      this.snackBar.mensaje("No tienes permiso para Eliminar " + this.singularName);
    }
  }

  showDeleteDialog() {
      const DIALOGINFO = {
        title : this.actionName.toUpperCase() + ' ' + this.singularName.toUpperCase(),
        message : '¿Está seguro de que quiere ' + this.actionName + ' el ' + this.singularName + '?',
        cancelText : 'CANCELAR',
        confirmText : this.actionName.toUpperCase()
      };

      this.confirmDialog.open(DIALOGINFO);

  }

  async canDelete() {
    let rolId = Number(localStorage.getItem('rol_id'));
    let permiso = await lastValueFrom(this.permissionAPI.getPermisosbyName('Eliminar Cliente'));
    let permissionId = Number(permiso[0].id);
    const promise = await lastValueFrom(this.permissionAPI.getPermisosbyRolandPermission(rolId, permissionId));
    this.permissions = promise;
  }

  toCreation() {
    this.router.navigate(['dashboard/' + this.pluralName + '/crear']);
  }

  toList() {
    this.router.navigate(['dashboard/' + this.pluralName]);
  }

  filter(filter: string){
    this.loadAll(filter);
  }

}
