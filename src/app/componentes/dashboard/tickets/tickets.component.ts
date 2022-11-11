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

@Component({
  selector: 'app-tickets',
  styleUrls: ['./tickets.component.css'],
  templateUrl: './tickets.component.html',
})
export class TicketsComponent implements OnInit{

  singularName : string = 'ticket';
  pluralName : string = 'tickets';
  actionName : string = 'eliminar';
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
    private ticketAPI : TicketService,
    private permissionsAPI : PermisosService,
    private confirmDialog : ConfirmDialogService,
    private snackBar : SnackbarService,
  ) {}

  ngOnInit() : void {
    this.loadAll();
  }
  
  loadAll() {
    this.ticketAPI.getAll().subscribe(
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
          this.ticketAPI.delete(id).subscribe(
            (data) => {
              this.snackBar.mensaje(this.singularName + ' eliminado exitosamente');
              this.loadAll();
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
        title : this.actionName + ' ' + this.singularName,
        message : '¿Está seguro de que quiere eliminar el ' + this.singularName + ' ?',
        cancelText : 'Cancelar',
        confirmText : this.actionName
      };

      this.confirmDialog.open(DIALOGINFO);

  }

  async canDelete() {
    let rolId = Number(localStorage.getItem('rol_id'));
    let permissionId = 12;
    const promise = await lastValueFrom(this.permissionsAPI.getPermisosbyRolandPermission(rolId, permissionId));
    this.permissions = promise;
  }

  toCreation() {
    this.router.navigate(['dashboard/'+ this.pluralName +'/crear']);
  }

  toList() {
    this.router.navigate(['dashboard/' + this.pluralName]);
  }

}
