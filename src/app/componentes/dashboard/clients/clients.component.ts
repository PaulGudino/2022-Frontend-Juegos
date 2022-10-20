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

/**
 * Reference taken from https://material.angular.io/components/table/examples
 */

/**
 * @Table of clients with sorting, pagination and filtering
 */

@Component({
  selector: 'app-clients',
  styleUrls: ['./clients.component.css'],
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit{

  singularName : string = 'Cliente';
  pluralName : string = 'Clientes';
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
    private api : ClientService,
    private permissionsApi : PermisosService,
    private confirmDialog : ConfirmDialogService,
    private snackBar : SnackbarService,
  ) {}

  ngOnInit() : void {
    this.loadClients();
  }
  
  loadClients() {
    this.api.getClients().subscribe(
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

  viewClient(id : number) {
    this.router.navigate(['/dashboard/clientes/vizualizar/' + id]);
  }

  editClient(id : number) {
    this.router.navigate(['/dashboard/clientes/editar/' + id]);
  }

  async deleteClient(id : number) {
    await this.canDelete();
    if (this.permissions.length > 0) {
      this.showDeleteDialog();
      this.confirmDialog.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.api.deleteClient(id).subscribe(
            (data) => {
              this.snackBar.mensaje(this.singularName + ' eliminado exitosamente');
              this.toClientCreation();
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
        title : 'Delete ' + this.singularName,
        message : '¿Está seguro de que quiere eliminar el cliente?',
        cancelText : 'Cancelar',
        confirmText : 'Eliminar'
      };

      this.confirmDialog.open(DIALOGINFO);

  }

  async canDelete() {
    let rolId = Number(localStorage.getItem('rol_id'));
    let permissionId = 13;
    const promise = await lastValueFrom(this.permissionsApi.getPermisosbyRolandPermission(rolId, permissionId));
    this.permissions = promise;
  }

  toClientCreation() {
    this.router.navigate(['dashboard/clientes/crear']);
  }

  toClientList() {
    this.router.navigate(['dashboard/clientes']);
  }

}
