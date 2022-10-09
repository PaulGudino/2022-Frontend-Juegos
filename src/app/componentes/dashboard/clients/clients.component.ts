import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/**
 * Reference taken from https://material.angular.io/components/table/examples
 */

/**
 * Constans used to fill up out data base
 */

const NAMES : string[] = [
  'Paul',
  'Diego',
  'Nicolás'
]

const SURNAMES : string[] = [
  'Gudiño',
  'Rojas',
  'Plaza'
]

const EMAILS : string[] = [
  'pgudino@espol.edu.ec',
  'ddrojas@espol.edu.ec',
  'niplinig@espol.edu.ec'
]

export interface ClientData {
  id: number;
  name : string;
  surname : string;
  email : string;
}

/**
 * @Table of clients with sorting, pagination and filtering
 */

@Component({
  selector: 'app-clients',
  styleUrls: ['./clients.component.css'],
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements AfterViewInit{

  displayedColumns : string[] = [
    'id',
    'name',
    'surname',
    'email',
    'actions'
  ]
  dataSource : MatTableDataSource<ClientData>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor() {
    // Create 100 Clients
    const clients = Array.from( { length : 100 }, (_, k) => createNewClient(k + 1) );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(clients);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    
    if ( this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewClient(id : number) : ClientData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];

  return {
    id : id,
    name : NAMES[Math.round(Math.random() * (NAMES.length - 1))],
    surname : SURNAMES[Math.round(Math.random() * (SURNAMES.length - 1))],
    email : EMAILS[Math.round(Math.random() * (EMAILS.length - 1))],
  };
}
