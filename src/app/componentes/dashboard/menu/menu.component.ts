import { Menu } from './../../../interfaces/menu';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  Titulo = 'Menu';
  Titulo2 = 'App Juegos'
  menu: Menu[] = [];
  constructor(private api: ApiService) {
  }


  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu(){
    this.api.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }
}