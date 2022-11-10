import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/interfaces/ticket/Ticket';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
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
  selector: 'app-tickets',
  styleUrls: ['./tickets.component.css'],
  templateUrl: './tickets.component.html',
})
export class ClientsComponent implements OnInit{

  singularName : string = 'Ticket';
  pluralName : string = 'Tickets';
  permissions : any = [];

  displayedColumns : string[] = [
    'invoice_number',
    'qr_code',
    'state',
    'client',
    'game',
    'actions'
  ]
  dataSource !: MatTableDataSource<Ticket>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    // Atributes of the user component
    private router : Router,
    private api : TicketService,
    private permissionsApi : PermisosService,
    private confirmDialog : ConfirmDialogService,
    private snackBar : SnackbarService,
  ) {}

  ngOnInit() : void {
    this.loadTickets();
  }
  
  loadTickets() {
    this.api.getTickets().subscribe(
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

  viewTicket(id : number) {
    this.router.navigate(['/dashboard/tickets/vizualizar/' + id]);
  }

  editTicket(id : number) {
    this.router.navigate(['/dashboard/tickets/editar/' + id]);
  }

  async deleteTicket(id : number) {
    await this.canDelete();
    if (this.permissions.length > 0) {
      this.showDeleteDialog();
      this.confirmDialog.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.api.deleteTicket(id).subscribe(
            (data) => {
              this.snackBar.mensaje(this.singularName + ' eliminado exitosamente');
              this.loadTickets();
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
        title : 'ELIMINAR ' + this.singularName.toUpperCase(),
        message : '¿Está seguro de que quiere eliminar el cliente?',
        cancelText : 'Cancelar',
        confirmText : 'Eliminar'
      };

      this.confirmDialog.open(DIALOGINFO);

  }

  async canDelete() {
    let rolId = Number(localStorage.getItem('rol_id'));
    let permissionId = 4;
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
