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
  selector: 'app-game-selection',
  styleUrls: ['./game-selection.component.css'],
  templateUrl: './game-selection.component.html',
})
export class GameSelectionComponent implements OnInit{

  singularName : string = 'Juego';
  pluralName : string = 'Juegos';
  actionName : string = 'Seleccionar';
  permissions : any = [];

  constructor(

  ) {}

  ngOnInit() : void {
    // this.loadGames();
  }

}
